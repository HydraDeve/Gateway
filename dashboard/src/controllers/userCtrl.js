const argon = require('argon2')
const jwt = require('jsonwebtoken')
const path = require('path')
const fetch = require('node-fetch')
const fs = require('fs')
const axios = require('axios')
const moment = require('moment')
const crypto = require('crypto')
const { Client, Intents } = require('discord.js')
// Image manipulation
const sharp = require('sharp')

sharp.cache(false)

// Needed for 2FA authentication
const speakeasy = require('speakeasy')
const QRCode = require('qrcode')
const updateBotPermissions = require('../utils/updateBotPermissions')

// Database models
const Users = require('../models/userModel')
const Dashboard = require('../models/dashboardModel')
const Licenses = require('../models/licenseModel')
const Products = require('../models/productsModel')
const Requests = require('../models/requestsModel')
const Logs = require('../models/logsModel')
const Blacklist = require('../models/blacklistModel')

// Basic validation
const {
    loginSchema,
    passwordValidate,
    createlicenseValidate,
    emailValidate,
} = require('../utils/userValidations')
const { decrypt, encrypt } = require('../utils/crypto')
const { upload } = require('../utils/fileStorage')
const { generateProductKey } = require('../utils/generateLicense')
const { LastNDays, LastNDates } = require('../utils/last7days')
const { logger } = require('../utils/logger')

const userCtrl = {
    /// ////////////////////////////////////
    //*
    //*   Login/logout
    //*
    /// ////////////////////////////////////

    login: async (req, res) => {
        try {
            // Get password, email and twofactor code from body
            const { email, password, twofactor } = req.body

            // Validate password & email
            const result = loginSchema.validate({ email, password })
            if (result.error) {
                console.log(result.error)
                return res
                    .status(422)
                    .json({ msg: result.error.details[0].message })
            }

            // Find user from database by email
            const user = await Users.findOne({
                email,
            })

            // Checks if user exist or not
            if (!user)
                return res
                    .status(400)
                    .json({ msg: 'Email or password is wrong.' })

            // Checks if passwords match
            const isMatch = await argon.verify(user.password, password)
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ msg: 'Email or password is wrong.' })
            }

            // 2FA step #1

            // Checks if user has 2FA on and is on login state 1, so
            // 2FA code havent been provided yet. InitialState for
            // 2FA code is empty string!
            if (user.twofactor && twofactor === '') {
                return res.status(401).json()
            }

            // 2FA step #2

            // Checks if user has 2FA on and provided 2FA code
            // in stage 2 & code is correct!
            if (user.twofactor && twofactor) {
                const validate = speakeasy.totp.verify({
                    secret: user.twofactor_secret,
                    encoding: 'base32',
                    token: twofactor,
                    window: 1,
                })
                if (!validate) {
                    return res
                        .status(400)
                        .json({ msg: '2FA code not correct.' })
                }
            }

            // Generate refresh token
            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/users/refresh_token',
                expiresIn: 172800000, // 2days
            })

            // Update lastlogin to database
            await Users.updateOne(
                {
                    _id: user._id,
                },
                {
                    $set: {
                        lastlogin: new Date(),
                    },
                }
            )

            // Logger
            logger(`Login`, user.name, 0)

            return res.json({ msg: 'Login success!' })
        } catch (err) {
            // Catch error
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            // Clear refresh cookie
            res.clearCookie('refreshtoken', {
                path: '/api/users/refresh_token',
            })

            // Logger
            logger(`Logout`, null, 0)

            return res.json({ msg: 'Logged out.' })
        } catch (err) {
            // Catch error
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Datafetching
    //*
    /// ////////////////////////////////////

    getAccessToken: (req, res) => {
        try {
            // Get access token via refresh token
            const rf_token = req.cookies.refreshtoken
            // No refresh token
            if (!rf_token)
                return res.status(400).json({ msg: 'Please login now!' })

            // Verify JWT
            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err)
                        return res
                            .status(400)
                            .json({ msg: 'Please login now!' })

                    const access_token = createAccessToken({ id: user.id })
                    res.json({ access_token })
                }
            )
        } catch (err) {
            // Catch error
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserInfor: async (req, res) => {
        try {
            // Find user by ID and send the data to frontend
            const user = await Users.findById(req.user.id).select(
                '-password -licenses'
            )
            res.json(user)
        } catch (err) {
            // Catch error
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Images
    //*
    /// ////////////////////////////////////

    uploadImage: async (req, res) => {
        // Get user id
        const user_id = req.user.id

        // Multer upload function
        upload(req, res, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ msg: err.message })
            }
            // Get image path
            const img_path = req.file.path

            // Resize image to square
            const buffer = await sharp(img_path).resize(200, 200).toBuffer()

            // Save resized image
            await sharp(buffer).toFile(img_path)

            // Check if user already has an old img and delete it
            const user = await Users.findById({ _id: user_id })
            if (user.image) {
                const pathToFile = path.join(
                    __dirname,
                    `../build/images/${user.image}`
                )

                // Remove existing image
                if (fs.existsSync(pathToFile)) {
                    fs.unlinkSync(pathToFile)
                }
            }

            // Logger
            logger(`Img upload`, user.name, 0)

            // Save new img
            await Users.findOneAndUpdate(
                { _id: user_id },
                {
                    $set: { image: req.file.filename },
                }
            )
            return res.json({
                msg: 'Successfully updated profile picture!',
            })
        })
    },

    /// ////////////////////////////////////
    //*
    //*   2-factor-authentication
    //*
    /// ////////////////////////////////////

    generate2FA: async (req, res) => {
        try {
            // Find user by ID
            const user = await Users.findById({ _id: req.user.id })

            // Check if user already has 2FA enabled.
            if (user.twofactor) {
                return res.status(500).json({ msg: '2FA already enabled' })
            }

            // Generate temporary 2FA secret
            const tempSecret = speakeasy.generateSecret()

            // Finds user by ID and saves tempsecret to DB
            await Users.findByIdAndUpdate(
                { _id: req.user.id },
                { $set: { tempsecret: tempSecret.base32 } }
            )

            // Label 2FA name as GateWay
            const GateWay2FA = tempSecret.otpauth_url.replace(
                'SecretKey',
                `GateWay:${user.email}`
            )

            // Converts speakeasy qrcode secret to png format and sends it to frontend
            QRCode.toDataURL(GateWay2FA, (err, data_url) => {
                res.json(data_url)
            })

            // Logger
            logger(`2FA generate`, user.name, 0)
        } catch (error) {
            // Catch error
            return console.log(error)
        }
    },
    verify2FA: async (req, res) => {
        // User has scanned QR code on frontend and usertoken is token given by auth application!
        const { usertoken } = req.body

        // Check if usertoken exists. This should never happen!
        if (!usertoken) {
            return
        }
        try {
            // Find user by ID
            const user = await Users.findById(req.user.id)

            // Verify token
            const verify = speakeasy.totp.verify({
                secret: user.tempsecret,
                encoding: 'base32',
                token: usertoken,
            })

            // If token is correct save it as twofactor_secret instead of tempsecret
            if (verify) {
                // Find user by ID => rename tempsecret field to twofactor_secret and set twofactor: true.
                await Users.findByIdAndUpdate(
                    { _id: req.user.id },
                    {
                        $rename: { tempsecret: 'twofactor_secret' },
                        $set: { twofactor: true },
                    }
                )

                // Logger
                logger(`2FA enabled`, user.name, 0)

                res.json('Success')
            } else {
                // Handle incorrect token
                return res.status(500).json({ msg: 'Token is incorrect' })
            }
        } catch (error) {
            // Catch error
            return console.log(error)
        }
    },
    remove2FA: async (req, res) => {
        // Get password from body
        const { password } = req.body

        // Check if password exists
        if (!password) {
            return
        }

        try {
            // Check if user exists
            const user = await Users.findById({ _id: req.user.id })

            // Checks if passwords match
            const isMatch = await argon.verify(user.password, password)
            if (!isMatch) {
                return res.status(400).json({ msg: 'Password is not correct.' })
            }

            // Remove DiscordID
            await Users.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $set: { twofactor: false },
                    $unset: { twofactor_secret: '' },
                }
            )

            // Logger
            logger(`2FA removed`, user.name, 0)

            // Respond to client
            res.json('Successfully disabled 2FA')
        } catch (error) {
            // Catch error
            console.log(error)
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Discord OAuth2
    //*
    /// ////////////////////////////////////

    getDiscordAuth: async (req, res) => {
        try {
            // Send user callback url
            res.json({
                client_id: process.env.CLIENT_ID,
                callback_url: `${process.env.BASE_URL}/api/users/discord/oauth`,
            })
        } catch (error) {
            // Catch error
            return console.log(error)
        }
    },
    verifyDiscordAuth: async (req, response) => {
        try {
            // Get code from body
            const { code } = req.body
            const user = req.user.id
            if (!user || !code)
                return console.log('Unexpected Behavior contact support #1', code, user)

            // Get user name
            const username = await Users.findById({ _id: req.user.id })

            // Required request data
            const data = {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BASE_URL}/settings`,
                code,
                scope: 'identify',
            }

            // Fetch access token
            fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                body: new URLSearchParams(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then((res) => res.json())
                .then(async (json) => {
                    // Fetch user data
                    const fetchDiscordUserInfo = await fetch(
                        'http://discordapp.com/api/users/@me',
                        {
                            headers: {
                                Authorization: `Bearer ${json.access_token}`,
                            },
                        }
                    )
                    const userInfo = await fetchDiscordUserInfo.json()

                    // User DiscordID
                    const DiscordID = userInfo.id
                    if (!DiscordID)
                        return console.log(
                            'Unexpected Behavior contact support #1',
                            DiscordID
                        )

                    await response.json({ msg: 'Success' })

                    // Set DiscordID to database => possibility to access Discord bot
                    await Users.findByIdAndUpdate(
                        { _id: user },
                        {
                            $set: { discordid: DiscordID },
                        }
                    )
                    await updateBotPermissions()

                    // Logger
                    return logger(`Discord linked`, username.name, 0)
                })
        } catch (error) {
            // Catch error
            console.log(error)
        }
    },
    removeDiscordAuth: async (req, res) => {
        // Get password from body
        const { password } = req.body

        // Check if password exists
        if (!password) {
            return
        }

        try {
            // Check if user exists
            const user = await Users.findById({ _id: req.user.id })

            // Checks if passwords match
            const isMatch = await argon.verify(user.password, password)
            if (!isMatch) {
                return res.status(400).json({ msg: 'Password is not correct.' })
            }

            // Remove DiscordID
            await Users.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $unset: { discordid: '' },
                }
            )

            // Respond to client
            res.json('Successfully unlinked Discord')

            await updateBotPermissions()

            // Logger
            return logger(`Discord unlinked`, user.name, 0)
        } catch (error) {
            // Catch error
            console.log(error)
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Change password
    //*
    /// ////////////////////////////////////

    changePassword: async (req, res) => {
        try {
            // Get new passoword / old password from body
            const { old_password, new_password } = req.body

            // Get user
            const user = await Users.findById({ _id: req.user.id })

            // Validate old password
            const isMatch = await argon.verify(user.password, old_password)
            if (!isMatch) {
                return res.status(400).json({ msg: 'Old password is wrong.' })
            }

            // Check if old password is same as new
            if (old_password === new_password) {
                return res
                    .status(400)
                    .json({ msg: 'New password cannot be same as old.' })
            }

            // Validate new password
            const result = passwordValidate.validate({
                password: new_password,
            })
            if (result.error) {
                console.log(result.error)
                return res
                    .status(422)
                    .json({ msg: result.error.details[0].message })
            }

            // Hash new password
            const passwordHash = await argon.hash(new_password)

            // Save new password
            await Users.findByIdAndUpdate(
                {
                    _id: user._id,
                },
                {
                    $set: {
                        password: passwordHash,
                    },
                }
            )

            res.json({ msg: 'Password successfully changed!' })
            return logger(`Password changed`, user.name, 0)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Licenses
    //*
    /// ////////////////////////////////////

    createLicense: async (req, res) => {
        // Get created by
        const { created_by } = req.body
        const { tags } = req.body
        let { pre_ips } = req.body

        // Change req body format to correct
        req.body = req.body.data

        // Get values from request body

        /* eslint-disable prefer-const */
        let {
            clientname,
            discordid,
            email,
            expires,
            expires_delete_after,
            expires_date,
            expires_days,
            expires_start_on_first,
            expires_times,
            description,
            expires_type,
            hwid_cap,
            hwid_expires,
            ip_cap,
            ip_expires,
            ip_geo_lock,
            prefer_discord,
            licensekey,
            product,
            receive_webhooks,
        } = req.body
        /* eslint-enable prefer-const */

        // Validate clientname & licensekey
        const result = createlicenseValidate.validate({
            licensekey,
            clientname,
        })
        if (result.error) {
            console.log(result.error)
            return res
                .status(400)
                .json({ msg: result.error.details[0].message })
        }
        if (!isNaN(clientname)) {
            return res
                .status(400)
                .json({ msg: 'Clientname cannot contain only numbers!' })
        }

        // Validate description
        if (description && description.length > 400) {
            return res.status(400).json({ msg: 'Description too long!' })
        }

        // Validate product
        const licenseProduct = await Products.findById({ _id: product })
        if (!licenseProduct) {
            return res.status(400).json({ msg: 'Product not found' })
        }

        // Get product name
        const product_name = licenseProduct.name

        // Validate DiscordID
        let discord_username
        let error
        if (discordid !== '') {
            const validDiscordID = /^\d+$/.test(discordid)
            if (
                !validDiscordID ||
                discordid.length < 17 ||
                discordid.length > 22
            ) {
                return res.status(400).json({ msg: 'Discord ID is not valid' })
            }
            await axios
                .get(`https://discordapp.com/api/users/${discordid}`, {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    },
                })
                .then((res) => {
                    discord_username = res.data.username
                })
                .catch((err) => {
                    if (
                        err.response.data.message.toLowerCase() ===
                        'unknown user'
                    ) {
                        discord_username = null
                        error = 'DiscordID did not match any existing user'
                    }
                })
        } else {
            discordid = null
            discord_username = null
        }
        if (error) {
            return res.status(400).json({
                msg: error,
            })
        }

        // Validate pre_ips
        let pre_ips_list
        if (!pre_ips || pre_ips.length === 0) {
            pre_ips = undefined
        } else {
            pre_ips_list = []
            for (let x = 0; x < pre_ips.length; x++) {
                const element = pre_ips[x]
                pre_ips_list.push({
                    ip: element,
                    created_at: new Date(),
                    expires_in: null,
                })
            }
        }

        // Check if license already exists
        const licenses = await Licenses.find()
        for (let i = 0; i < licenses.length; i++) {
            const element = licenses[i]
            const decrypted = await decrypt(element.licensekey)
            if (licensekey === decrypted) {
                return res.status(400).json({
                    msg: 'License key already exists',
                })
            }
        }

        // Add days to date function (for expire type 1)
        function addDays(date, days) {
            const result = new Date(date)
            result.setDate(result.getDate() + days)
            return result
        }

        // Handle expiring strings
        if (expires === 'true') {
            expires = true
            expires_type = parseInt(expires_type)
            if (expires_type === 1) {
                if (expires_start_on_first === 'true') {
                    expires_date = undefined
                } else {
                    expires_date = addDays(new Date(), parseInt(expires_days))
                }
                expires_times = undefined
            } else if (expires_type === 2) {
                expires_days = undefined
                expires_start_on_first = undefined
                expires_times = undefined
            } else if (expires_type === 3) {
                expires_days = undefined
                expires_start_on_first = undefined
                expires_date = undefined
            }
        }
        if (expires === 'false') {
            expires = false
            expires_type = undefined
            expires_days = undefined
            expires_start_on_first = undefined
            expires_date = undefined
            expires_times = undefined
        }

        // Handle IP-cap
        if (ip_cap === '∞') {
            ip_cap = null
            ip_expires = undefined
        } else {
            ip_cap = parseInt(ip_cap)
            if (ip_cap < 1) {
                return res.status(400).json({ msg: 'Invalid IP-Cap!' })
            }
            ip_expires === '∞'
                ? (ip_expires = null)
                : (ip_expires = parseInt(ip_expires))
            if (ip_expires && ip_expires < 1) {
                return res.status(400).json({ msg: 'Invalid IP-Expires!' })
            }
        }
        if (ip_geo_lock === 'None' || ip_geo_lock === null) {
            ip_geo_lock = null
        }

        // Handle HWID-cap
        if (hwid_cap === '∞') {
            hwid_cap = null
            hwid_expires = undefined
        } else {
            hwid_cap = parseInt(hwid_cap)
            if (hwid_cap < 1) {
                return res.status(400).json({ msg: 'Invalid HWID-Cap!' })
            }
            hwid_expires === '∞'
                ? (hwid_expires = null)
                : (hwid_expires = parseInt(hwid_expires))
            if (hwid_expires && hwid_expires < 1) {
                return res.status(400).json({ msg: 'Invalid HWID-Expires!' })
            }
        }

        // Price after discount
        const gross = licenseProduct.price * (1 - licenseProduct.discount / 100)

        // Encrypt licensekey
        const licensekey_encrypted = encrypt(licensekey)

        // Add +1 to Dashboard current ID
        await Dashboard.findOneAndUpdate({ $inc: { current_id: 1 } })
        const dashboard_updated = await Dashboard.find()

        // Make ID
        const yourNumber = dashboard_updated[0].current_id
        const defaultFill = '00000'

        const license_id = (defaultFill + yourNumber).substr(
            String(yourNumber).length
        )

        const newLicense = new Licenses({
            //* Essentials
            product,
            product_name,
            licensekey: licensekey_encrypted,
            clientname,
            email,
            discord_id: discordid,
            discord_username,
            prefer_discord,
            license_id: `UL${license_id}`,
            receive_webhooks,
            description,

            //* Lifespan
            expires,
            expires_delete_after,
            expires_type,
            expires_days,
            expires_start_on_first,
            expires_date,
            expires_times,

            //* IP-Settings
            ip_cap,
            ip_expires,
            ip_geo_lock,

            //* HWID-Settings
            hwid_cap,
            hwid_expires,

            //* General
            tags,
            latest_request: undefined,
            payment_sum: gross,
            lastest_hwid: null,
            lastest_ip: null,
            ip_list: pre_ips_list || [],
            hwid_list: [],
            total_requests: 0,
            created_by,
        })
        await newLicense.save()

        // Add +1 to user license count
        await Users.findByIdAndUpdate(
            { _id: req.user.id },
            { $inc: { licenses_added: 1, revenue: gross } }
        )

        // Add +1 to product sales
        await Products.findByIdAndUpdate(
            { _id: product },
            { $inc: { total_purchases: 1, total_gross: gross } }
        )
        res.json({ msg: 'Licensekey successfully added' })
        // Logger
        logger(`License created`, created_by, 0)
    },

    updateLicense: async (req, res) => {
        /* eslint-disable prefer-const */
        let {
            licensekey,
            clientname,
            email,
            product,
            discord_id,
            description,
            ip_cap,
            ip_expires,
            ip_geo_lock,
            hwid_cap,
            hwid_expires,
            expires,
            expires_type,
            receive_webhooks,
            expires_delete_after,
            prefer_discord,
            expires_date,
            expires_times,
            created_by,
            _id,
        } = req.body.data
        /* eslint-enable prefer-const */

        const { tags } = req.body

        const { days, times } = req.body.expiring

        // Verify that license exists
        const license = await Licenses.findById({ _id })
        if (!license) {
            return res.status(400).json({
                msg: 'License does not exist',
            })
        }

        // Validate client name
        if (!clientname || clientname.length < 3 || clientname.length > 100) {
            return res.status(400).json({
                msg: 'Invalid client name',
            })
        }

        // Validate product
        const productExists = await Products.findById({ _id: product })
        const product_name = productExists.name
        if (!product || !productExists) {
            return res.status(400).json({
                msg: 'Invalid product',
            })
        }

        // Validate description
        if (description && description.length > 400) {
            return res.status(400).json({ msg: 'Description too long!' })
        }

        // Validate DiscordID
        let discord_username
        let error
        if (discord_id && discord_id !== '') {
            const validDiscordID = /^\d+$/.test(discord_id)
            if (
                !validDiscordID ||
                discord_id.length < 17 ||
                discord_id.length > 22
            ) {
                return res.status(400).json({ msg: 'Discord ID is not valid' })
            }
            await axios
                .get(`https://discordapp.com/api/users/${discord_id}`, {
                    headers: {
                        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                    },
                })
                .then((res) => {
                    discord_username = res.data.username
                })
                .catch((err) => {
                    if (
                        err.response.data.message.toLowerCase() ===
                        'unknown user'
                    ) {
                        discord_username = null
                        error = 'DiscordID did not match any existing user'
                    }
                })
        } else {
            discord_id = null
            discord_username = null
        }
        if (error) {
            return res.status(400).json({
                msg: error,
            })
        }

        // Validate display preference
        if (!prefer_discord || prefer_discord === 'false') {
            prefer_discord = false
        }
        if (prefer_discord && prefer_discord === 'true') {
            prefer_discord = true
        }

        // Validate IP-cap
        if (!ip_cap || ip_cap === 'none' || ip_cap === '') {
            ip_cap = null
            ip_expires = undefined
        } else if (parseInt(ip_cap) < license.ip_list.length) {
            return res.status(400).json({
                msg: 'IP-Cap cannot be lower that current amount of IPs',
            })
        }

        // Validate HWID-cap
        if (!hwid_cap || hwid_cap === 'none' || hwid_cap === '') {
            hwid_cap = null
            hwid_expires = undefined
        } else if (parseInt(hwid_cap) < license.hwid_list.length) {
            return res.status(400).json({
                msg: 'HWID-Cap cannot be lower that current amount of HWIDs',
            })
        }

        // Validate geo lock
        if (!ip_geo_lock || ip_geo_lock === 'none' || ip_geo_lock === '') {
            ip_geo_lock = null
        }

        // Originally expiring license
        async function addDays(date, days) {
            const result = new Date(date)
            result.setDate(result.getDate() + parseInt(days))
            return result
        }
        if (license.expires) {
            if (expires === true || expires === 'true') {
                if (parseInt(expires_type) === 1) {
                    if (!expires_date) {
                        return res.status(400).json({
                            msg: 'This license havent started expiring yet',
                        })
                    }
                    expires_date = await addDays(expires_date, days)
                    await Licenses.findByIdAndUpdate(
                        { _id },
                        { $set: { expires_date } }
                    )
                }
                if (parseInt(expires_type) === 2) {
                    if (Date.parse(expires_date) < new Date()) {
                        return res.status(400).json({
                            msg: 'You need to select a valid date from future!',
                        })
                    }
                    await Licenses.findByIdAndUpdate(
                        { _id },
                        { $set: { expires_date } }
                    )
                }
                if (parseInt(expires_type) === 3) {
                    expires_times = parseInt(expires_times) + parseInt(times)
                    await Licenses.findByIdAndUpdate(
                        { _id },
                        { $set: { expires_times } }
                    )
                }
            } else {
                await Licenses.findByIdAndUpdate(
                    { _id },
                    {
                        $set: { expires: false },
                        $unset: {
                            expires_type: '',
                            expires_days: '',
                            expires_start_on_first: '',
                            expires_times: '',
                            expires_date: '',
                        },
                    }
                )
            }
        } else if (expires === true || expires === 'true') {
            let payload

            if (!expires_type) {
                expires_type = 1
            }

            // Days
            if (parseInt(expires_type) === 1) {
                if (parseInt(days) < 1) {
                    return res.status(400).json({
                        msg: 'Days must be greated than 0!',
                    })
                }
                payload = {
                    expires: true,
                    expires_type: 1,
                    expires_date: await addDays(new Date(), days),
                }
            }
            // Date
            else if (parseInt(expires_type) === 2) {
                if (Date.parse(expires_date) < new Date()) {
                    return res.status(400).json({
                        msg: 'You need to select a valid date from future!',
                    })
                }

                payload = {
                    expires: true,
                    expires_type: 2,
                    expires_date,
                }
            }
            // Date
            else {
                if (parseInt(expires_times) < 1) {
                    return res.status(400).json({
                        msg: 'Expires times must be greated than 0!',
                    })
                }

                payload = {
                    expires: true,
                    expires_type: 3,
                    expires_times: times,
                    total_requests: 0,
                }
            }

            // Set expires
            await Licenses.findByIdAndUpdate(
                { _id },
                {
                    $set: payload,
                }
            )
        }

        try {
            await Licenses.findByIdAndUpdate(
                { _id },
                {
                    $set: {
                        clientname,
                        email,
                        product,
                        product_name,
                        discord_id,
                        description,
                        discord_username,
                        ip_cap,
                        ip_expires,
                        ip_geo_lock,
                        hwid_cap,
                        hwid_expires,
                        receive_webhooks,
                        expires_delete_after,
                        prefer_discord,
                        tags: tags || [],
                    },
                }
            )

            const data = await Licenses.findById({ _id })
            data.licensekey = licensekey

            res.json({ msg: 'Successfully updated license', data })
            // Logger
            logger(`License updated`, created_by, 0)
        } catch (error) {
            console.log(error)
        }
    },

    clearHwids: async (req, res) => {
        const licensebody = req.body.data
        const user = await Users.findOne({ _id: req.user.id })
        if (!licensebody) {
            return res.status(400).json({
                msg: 'Something weird happened',
            })
        }
        try {
            await Licenses.findByIdAndUpdate(
                { _id: licensebody._id },
                { $set: { hwid_list: [], latest_hwid: null } }
            )
            const data = await Licenses.findById({ _id: licensebody._id })
            res.json({ msg: 'Successfully cleared HWIDs', data })

            // Logger
            logger(`License HWIDs cleared`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },

    clearIps: async (req, res) => {
        const licensebody = req.body.data
        const user = await Users.findOne({ _id: req.user.id })
        if (!licensebody) {
            return res.status(400).json({
                msg: 'Something weird happened',
            })
        }
        try {
            await Licenses.findByIdAndUpdate(
                { _id: licensebody._id },
                { $set: { ip_list: [], latest_ip: null } }
            )
            const data = await Licenses.findById({ _id: licensebody._id })
            res.json({ msg: 'Successfully cleared IPss', data })
            // Logger
            logger(`License IPs cleared`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },

    resetLicense: async (req, res) => {
        const licensebody = req.body.data
        const user = await Users.findOne({ _id: req.user.id })
        if (!licensebody) {
            return res.status(400).json({
                msg: 'Something weird happened',
            })
        }
        try {
            const license = await generateProductKey(5, 5)
            const licenseEncrypted = await encrypt(license)
            await Licenses.findByIdAndUpdate(
                { _id: licensebody._id },
                { $set: { licensekey: licenseEncrypted } }
            )
            const data = await Licenses.findById({ _id: licensebody._id })
            data.licensekey = license
            res.json({ msg: 'Successfully reset license key', data })
            // Logger
            logger(`License reset`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },

    deleteLicense: async (req, res) => {
        const licenseID = req.body.license
        const user = await Users.findOne({ _id: req.user.id })
        if (!licenseID) {
            return res.status(400).json({
                msg: 'Something weird happened',
            })
        }
        try {
            await Licenses.findByIdAndDelete({ _id: licenseID })
            res.json({ msg: 'Successfully deleted license key' })
            // Logger
            logger(`License deleted`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },

    getLicensesByEmail: async (req, res) => {
        try {
            const licenses = await Licenses.find({email: req.params.email})

            return res.json({ licenses: licenses, total: licenses.length })
        } catch (error) {
            console.log(error);
        }
    },

    getLicenses: async (req, res) => {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)
            const { query } = req.query
            const { product } = req.query
            const { sortby } = req.query

            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const results = {}

            let licenses_list
            if (sortby === 'date') {
                licenses_list = await Licenses.find().sort({ _id: -1 })
            } else if (sortby === 'name') {
                licenses_list = await Licenses.find()
                    .collation({ locale: 'en' })
                    .sort({ clientname: 1 })
            }
            const licenses = []
            for (let i = 0; i < licenses_list.length; i++) {
                const licenseToSearch = licenses_list[i]

                if (product && product !== '' && product !== 'undefined') {
                    if (licenseToSearch.product !== product) continue
                }
                if (query === '' || query === undefined) {
                    licenseToSearch.licensekey = decrypt(
                        licenseToSearch.licensekey
                    )
                    licenses.push(licenseToSearch)
                } else {
                    licenseToSearch.licensekey = decrypt(
                        licenseToSearch.licensekey
                    )
                    if (
                        licenseToSearch.licensekey
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        licenseToSearch.clientname
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    ) {
                        licenses.push(licenseToSearch)
                    }
                }
            }
            if (endIndex < licenses.length) {
                results.next = {
                    page: page + 1,
                    limit,
                }
            }
            if (startIndex > 0) {
                results.prev = {
                    page: page - 1,
                    limit,
                }
            }
            results.results = licenses.slice(startIndex, endIndex)
            return res.json({ licenses: results, total: licenses.length })
        } catch (error) {
            console.log(error)
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Products
    //*
    /// ////////////////////////////////////

    createProduct: async (req, res) => {
        // Get created by
        const { created_by } = req.body

        // Change req body format to correct
        req.body = req.body.data

        const { price, version, name } = req.body

        if (isNaN(price)) {
            return res.status(400).json({
                msg: 'Invalid price',
            })
        }

        if (name.length < 3) {
            return res.status(400).json({
                msg: 'Product name must be at least 3 characters long',
            })
        }

        if (version.length < 3) {
            return res.status(400).json({
                msg: 'Version number must be at least 3 characters long!',
            })
        }

        const exists = await Products.findOne({ name })
        if (exists) {
            return res.status(400).json({
                msg: 'Given product already exists',
            })
        }

        const newProduct = new Products({
            name,
            version,
            price,
            discount: 0,
            total_purchases: 0,
            total_gross: 0,
            created_by,
        })
        await newProduct.save()

        res.json({ msg: 'Product successfully added' })

        const user = await Users.findOne({ _id: req.user.id })
        // Logger
        logger(`Product created`, user.name, 0)
    },
    getProducts: async (req, res) => {
        try {
            const products = await Products.find()
            const latest_product = await Products.find()
                .sort({ $natural: -1 })
                .limit(1)
            res.json({ products, latest: latest_product[0]?.name })
        } catch (err) {
            console.log(err)
        }
    },
    deleteProduct: async (req, res) => {
        const { product } = req.body
        try {
            // Check if product is used in licenses
            const licenses = await Licenses.find()
            for (let i = 0; i < licenses.length; i++) {
                const element = licenses[i]
                if (element.product === product) {
                    return res.status(400).json({
                        msg: 'Product is in use! Delete licenses which are bind to this product first!',
                    })
                }
            }

            await Products.findByIdAndDelete({ _id: product })
            res.json({ msg: 'Delete success' })

            const user = await Users.findOne({ _id: req.user.id })
            // Logger
            logger(`Product deleted`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },
    updateProduct: async (req, res) => {
        const { name, version, discount, price, _id } = req.body.editing
        if (isNaN(price)) {
            return res.status(400).json({
                msg: 'Invalid price',
            })
        }

        if (name.length < 3) {
            return res.status(400).json({
                msg: 'Product name must be at least 3 characters long',
            })
        }

        if (version.length < 3) {
            return res.status(400).json({
                msg: 'Version number must be at least 3 characters long!',
            })
        }
        if (isNaN(discount)) {
            return res.status(400).json({
                msg: 'Invalid discount percentage',
            })
        }

        const isDublicate = await Products.find({ name })
        if (isDublicate && isDublicate.length > 1) {
            return res.status(400).json({
                msg: `You already have product called ${name}`,
            })
        }

        try {
            await Products.findByIdAndUpdate(
                { _id },
                {
                    $set: {
                        name,
                        version,
                        discount,
                        price,
                    },
                }
            )
            res.json({ msg: 'Successfully edited product' })

            const product = await Products.findOne({ _id })
            if (product) {
                await Licenses.updateMany(
                    { product: product._id },
                    { $set: { product_name: name } }
                )
            }

            const user = await Users.findOne({ _id: req.user.id })
            // Logger
            logger(`Product updated`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Users
    //*
    /// ////////////////////////////////////

    createUser: async (req, res) => {
        const { created_by } = req.body
        const { name, email, password1, password2, permission } = req.body.data

        // Check if passwords are the same
        if (password1 !== password2) {
            return res.status(400).json({
                msg: 'Passwords does not match',
            })
        }

        // Validate password & email
        const result = loginSchema.validate({ email, password: password1 })
        if (result.error) {
            console.log(result.error)
            return res
                .status(422)
                .json({ msg: result.error.details[0].message })
        }

        // Check if user has administrator permission
        const user = await Users.findById({ _id: req.user.id })
        if (user.role !== 0) {
            return res.status(400).json({
                msg: 'You dont have enough permissions',
            })
        }

        // Check if user exists
        const exists = await Users.findOne({ email })
        if (exists) {
            return res.status(400).json({
                msg: 'User with that email already exists',
            })
        }

        // Hash password
        const passwordHash = await argon.hash(password1)

        const newUser = new Users({
            name,
            email,
            password: passwordHash,
            twofactor: false,
            role: permission,
            created_by,
        })
        await newUser.save()

        res.json({ msg: 'Successfully added a new user' })

        // Logger
        logger(`User created`, user.name, 0)
    },

    deleteUser: async (req, res) => {
        const { email } = req.body.user

        // Check if user exists and if he has administrator perms (this should never happen)
        const hasPerms = await Users.findOne({ _id: req.user.id })
        if (!hasPerms || hasPerms.role !== 0) {
            return res.status(500).json({ msg: 'Permission denied' })
        }

        // Find user
        const user = await Users.findOne({ email })
        if (!user.created_by) {
            return res.status(400).json({
                msg: 'You cannot delete root user',
            })
        }

        await Users.findOneAndDelete({ email })
        res.json({ msg: 'Successfully deleted user' })

        const username = await Users.findOne({ _id: req.user.id })

        await updateBotPermissions()

        // Logger
        logger(`User deleted`, username.name, 0)
    },

    getUsers: async (req, res) => {
        try {
            const users = await Users.find().select(
                '-twofactor -password -twofactor_secret -createdAt -updatedAt'
            )
            res.json({ users })
        } catch (error) {
            console.log(error)
        }
    },
    updateUser: async (req, res) => {
        const { name, email, role, _id } = req.body.editing

        // Check if user exists and if he has administrator perms (this should never happen)
        const hasPerms = await Users.findOne({ _id: req.user.id })
        if (!hasPerms || hasPerms.role !== 0) {
            return res.status(500).json({ msg: 'Permission denied' })
        }

        if (name && name.length < 3) {
            return res.status(400).json({
                msg: 'Name must be at least 3 characters long',
            })
        }

        // Validate email
        const result = emailValidate.validate({ email })
        if (result.error) {
            console.log(result.error)
            return res
                .status(422)
                .json({ msg: result.error.details[0].message })
        }

        // Block editing root perm level
        const user = await Users.findById({ _id })
        if (!user.created_by) {
            if (parseInt(role) !== user.role) {
                return res.status(400).json({
                    msg: 'You cannot edit root user permission level',
                })
            }
        }

        // Block editing own perm level
        if (user._id === _id) {
            if (parseInt(role) !== user.role) {
                return res.status(400).json({
                    msg: 'You cannot edit your own permission level',
                })
            }
        }

        const exists = await Users.findOne({ email })
        if (user.email !== email && exists) {
            return res.status(400).json({
                msg: 'That email already exists!',
            })
        }

        await Users.findByIdAndUpdate({ _id }, { $set: { email, name, role } })

        res.json({ msg: 'Successfully updated user' })

        const username = await Users.findOne({ _id: req.user.id })
        // Logger
        logger(`User updated`, username.name, 0)
    },

    /// ////////////////////////////////////
    //*
    //*   Dashboard data
    //*
    /// ////////////////////////////////////

    getDashboardData: async (req, res) => {
        const licenses = await Licenses.find().sort({ _id: -1 })
        // Total licenses
        const total_licenses = licenses.length

        // Weekly earnings
        let weekly_earnings
        if (licenses && licenses.length > 0) {
            const final_weekly = []
            for (let i = 0; i < licenses.length; i++) {
                const element = licenses[i]
                if (
                    moment(element.createdAt).format('WW') ===
                    moment().format('WW')
                ) {
                    final_weekly.push(element.payment_sum)
                } else {
                    break
                }
            }
            const weekly_sum = final_weekly.reduce((acc, val) => acc + val, 0)
            weekly_earnings = weekly_sum.toFixed(2)
        } else {
            weekly_earnings = 0
        }

        // Monthly earnings + monthly licenses

        let monthly_earnings = 0
        let monthly_licenses = 0
        let last_month = 0
        if (licenses && licenses.length > 0) {
            const final_monthly = []
            let monthly_amount = 0
            for (let i = 0; i < licenses.length; i++) {
                const element = licenses[i]
                if (
                    moment(element.createdAt).format('MM') ===
                    moment().format('MM')
                ) {
                    final_monthly.push(element.payment_sum)
                    monthly_amount += 1
                } else if (
                    moment(element.createdAt).format('MM') ===
                    moment().subtract(1, 'months').format('MM')
                ) {
                    last_month += 1
                } else {
                    break
                }
            }
            const monthly_sum = final_monthly.reduce((acc, val) => acc + val, 0)
            monthly_earnings = monthly_sum.toFixed(2)
            monthly_licenses = monthly_amount
        } else {
            monthly_earnings = 0
            monthly_licenses = 0
        }

        last_month = ((monthly_licenses - last_month) / last_month) * 100

        const products = await Products.find().sort({ total_purchases: -1 })

        // Total product purchases
        let total_purchases = 0
        for (let x = 0; x < products.length; x++) {
            const element = products[x]
            total_purchases += element.total_purchases
        }

        // Latest logs
        const logs = await Logs.find().sort({ _id: -1 })
        const latest_logs = logs.slice(0, 6)

        // Top products
        const top_products_names = []
        const top_products_values = []
        if (products) {
            for (let x = 0; x < products.length; x++) {
                const element = products[x]
                top_products_names.push(element.name)
                top_products_values.push(
                    (element.total_purchases / total_purchases) * 100
                )
            }
        }

        // Latest request origin
        const requests = await Requests.find({
            date: new Date().toLocaleDateString(),
        })
        let latest_requests_list = []
        if (requests[0]) {
            latest_requests_list = requests[0].requests.slice(-6)
        }
        latest_requests_list.reverse()

        // Latest licenses
        const latest_licenses = licenses.slice(0, 6)

        // Progress goals
        const dashboard = await Dashboard.findOne()
        const { license_goal_monthly } = dashboard

        res.json({
            total_licenses,
            weekly_earnings,
            monthly_earnings,
            monthly_licenses,
            last_month,
            best_product: products[0],
            top_products_names,
            top_products_values,
            total_purchases,
            license_goal_monthly,
            latest_requests_list,
            latest_licenses,
            latest_logs,
        })
    },

    // TODO: Tee
    updatedChartData: async (req, res) => {
        const { range } = req.query

        if (range === 'today') {
            try {
                const requests = await Requests.findOne({
                    date: new Date().toLocaleDateString(),
                })
                if (requests && requests.requests) {
                    const daily = requests.requests

                    const final = []
                    for (let x = 0; x < 24; x++) {
                        const date = new Date(
                            new Date().setHours(x + 3, 0, 0, 0)
                        )
                        final.push(date)
                    }

                    const successful = new Array(24).fill(0)
                    const rejected = new Array(24).fill(0)

                    for (let i = 0; i < daily.length; i++) {
                        const element = daily[i]
                        if (element.rejected) {
                            const number = element.date.getHours()
                            rejected[number] += 1
                        } else {
                            const number = element.date.getHours()
                            successful[number] += 1
                        }
                    }
                    res.json({ successful, rejected, days: final })
                } else {
                    const final = []
                    for (let x = 0; x < 24; x++) {
                        const date = new Date(
                            new Date().setHours(x + 3, 0, 0, 0)
                        )
                        final.push(date)
                    }
                    res.json({
                        successful: new Array(24).fill(0),
                        rejected: new Array(24).fill(0),
                        days: final,
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (range === '7days') {
            // Latest requests
            const last7dates = await LastNDates(7)
            const last7days = await LastNDays(7)
            const daily_requests = await Requests.find({ date: last7dates })

            // Requests
            let successful_requests
            let rejected_requests
            if (daily_requests) {
                successful_requests = []
                rejected_requests = []
                for (let i = 0; i < last7dates.length; i++) {
                    const dateToSearch = last7dates[i]
                    let requestsFound = 0
                    let rejectedFound = 0
                    for (let j = 0; j < daily_requests.length; j++) {
                        const requestData = daily_requests[j]
                        if (requestData.date != null) {
                            if (requestData.date === dateToSearch) {
                                rejectedFound =
                                    requestData.rejected_requests == null
                                        ? 0
                                        : requestData.rejected_requests
                                requestsFound =
                                    requestData.successful_requests == null
                                        ? 0
                                        : requestData.successful_requests
                                break
                            }
                        }
                    }
                    successful_requests.push(requestsFound)
                    rejected_requests.push(rejectedFound)
                }
            } else {
                successful_requests = [0, 0, 0, 0, 0, 0, 0]
                rejected_requests = [0, 0, 0, 0, 0, 0, 0]
            }
            res.json({
                successful: successful_requests,
                rejected: rejected_requests,
                days: last7days,
            })
        }
        if (range === '30days') {
            try {
                // Latest requests
                const last7dates = await LastNDates(30)
                const last7days = await LastNDays(30)
                const daily_requests = await Requests.find({
                    date: last7dates,
                })

                // Requests
                let successful_requests
                let rejected_requests
                if (daily_requests) {
                    successful_requests = []
                    rejected_requests = []
                    for (let i = 0; i < last7dates.length; i++) {
                        const dateToSearch = last7dates[i]
                        let requestsFound = 0
                        let rejectedFound = 0
                        for (let j = 0; j < daily_requests.length; j++) {
                            const requestData = daily_requests[j]
                            if (requestData.date != null) {
                                if (requestData.date === dateToSearch) {
                                    rejectedFound =
                                        requestData.rejected_requests == null
                                            ? 0
                                            : requestData.rejected_requests
                                    requestsFound =
                                        requestData.successful_requests == null
                                            ? 0
                                            : requestData.successful_requests
                                    break
                                }
                            }
                        }
                        successful_requests.push(requestsFound)
                        rejected_requests.push(rejectedFound)
                    }
                } else {
                    successful_requests = new Array(30).fill(0)
                    rejected_requests = new Array(30).fill(0)
                }
                res.json({
                    successful: successful_requests,
                    rejected: rejected_requests,
                    days: last7days,
                })
            } catch (error) {
                console.log(error)
            }
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Logs data
    //*
    /// ////////////////////////////////////

    getLogsData: async (req, res) => {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const { query } = req.query

            const { dashboard } = req.query
            const { requests } = req.query
            const { discord } = req.query

            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const results = {}

            // List of logs
            let logs_list = []
            if (
                dashboard === 'true' &&
                requests === 'true' &&
                discord === 'true'
            ) {
                logs_list = await Logs.find().sort({ _id: -1 })
            } else if (
                dashboard === 'false' &&
                requests === 'false' &&
                discord === 'false'
            ) {
                logs_list = []
            } else {
                if (discord === 'true') {
                    logs_list.push(...(await Logs.find({ status: 2 })))
                }
                if (requests === 'true') {
                    logs_list.push(...(await Logs.find({ status: 1 })))
                }
                if (dashboard === 'true') {
                    logs_list.push(...(await Logs.find({ status: 0 })))
                }
                logs_list.sort((a, b) => b.createdAt - a.createdAt)
            }

            // Query
            const after_query = []
            if (query && query !== '') {
                for (let x = 0; x < logs_list.length; x++) {
                    const element = logs_list[x]
                    if (
                        (element.activity &&
                            element.activity
                                .toLowerCase()
                                .includes(query.toLowerCase())) ||
                        (element.user &&
                            element.user
                                .toLowerCase()
                                .includes(query.toLowerCase()))
                    ) {
                        after_query.push(element)
                    }
                }
            }

            let final
            if (query && query !== '') {
                final = after_query
            } else {
                final = logs_list
            }

            // Pagination
            if (endIndex < final.length) {
                results.next = {
                    page: page + 1,
                    limit,
                }
            }
            if (startIndex > 0) {
                results.prev = {
                    page: page - 1,
                    limit,
                }
            }
            results.results = final.slice(startIndex, endIndex)
            return res.json({ logs: results, total: logs_list.length })
        } catch (error) {
            console.log(error)
        }
    },

    updateSavePreference: async (req, res) => {
        const { dashboard, requests, discord } = req.body

        // Check if user exists and if he has administrator perms (this should never happen)
        const user = await Users.findOne({ _id: req.user.id })
        if (!user || user.role !== 0) {
            return res.status(500).json({ msg: 'Permission denied' })
        }

        const dashboard_settings = await Dashboard.find({})
        if (dashboard_settings[0].save_dashboard !== dashboard) {
            await Dashboard.findOneAndUpdate(
                {},
                { $set: { save_dashboard: dashboard } }
            )
        }

        if (dashboard_settings[0].save_requests !== requests) {
            await Dashboard.findOneAndUpdate(
                {},
                { $set: { save_requests: requests } }
            )
        }

        if (dashboard_settings[0].save_discord !== discord) {
            await Dashboard.findOneAndUpdate(
                {},
                { $set: { save_discord: discord } }
            )
        }

        res.json({ msg: 'Successfully changed saving preferences' })
    },

    getSwitchState: async (req, res) => {
        try {
            const dashboard = await Dashboard.find({})
            res.json({
                dashboard: dashboard[0].save_dashboard,
                requests: dashboard[0].save_requests,
                discord: dashboard[0].save_discord,
            })
        } catch (error) {
            console.log(error)
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Blacklist
    //*
    /// ////////////////////////////////////

    getBlacklistData: async (req, res) => {
        try {
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const results = {}

            // List of blacklists
            const blacklist_data = await Blacklist.find().sort({ _id: -1 })

            // Pagination
            if (endIndex < blacklist_data.length) {
                results.next = {
                    page: page + 1,
                    limit,
                }
            }
            if (startIndex > 0) {
                results.prev = {
                    page: page - 1,
                    limit,
                }
            }
            results.results = blacklist_data.slice(startIndex, endIndex)

            return res.json({
                total: blacklist_data.length,
                blacklist: results,
            })
        } catch (error) {
            console.log(error)
        }
    },

    addBlacklistData: async (req, res) => {
        const { blacklisted, type, created_by } = req.body

        const user = await Users.findById({ _id: req.user.id })

        try {
            const exists = await Blacklist.findOne({
                blacklisted,
            })

            // Check if already exists
            if (exists) {
                return res
                    .status(400)
                    .json({ msg: 'That IP/HWID already exists' })
            }

            // Validate IP-Address
            let blacklisted_region
            if (type === 'ip') {
                const ipv4 =
                    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
                if (!ipv4.test(blacklisted)) {
                    return res.status(400).json({ msg: 'Invalid IP-address' })
                }
                blacklisted_region = await axios
                    .get(`https://proxycheck.io/v2/${blacklisted}?vpn=1&asn=1`)
                    .then(
                        (resp) =>
                            `${resp.data[blacklisted].country} / ${resp.data[blacklisted].continent}`
                    )
                    .catch((err) => console.log(err))
            }

            // Validate HWID
            if (type === 'hwid') {
                if (blacklisted.length < 20) {
                    return res.status(400).json({ msg: 'Invalid HWID' })
                }
            }

            // Save new blacklist
            const newBlacklist = new Blacklist({
                blacklisted,
                type,
                blocked_connections: 0,
                region: blacklisted_region,
                created_by,
            })
            await newBlacklist.save()
            res.json({ msg: 'Successfully added a new blacklist' })

            logger(`Blacklist created`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },

    deleteBlacklist: async (req, res) => {
        const id = req.body.blacklisted
        if (!id) {
            return res.status(400)
        }
        try {
            await Blacklist.findByIdAndDelete({ _id: id })
            res.json({ msg: 'Successfully deleted blacklisted IP/HWID' })

            const user = await Users.findById({ _id: req.user.id })
            logger(`Blacklist removed`, user.name, 0)
        } catch (error) {
            console.log(error)
        }
    },

    updateProgressGoal: async (req, res) => {
        const value = req.body.progressGoal
        if (!value) {
            return
        }

        // Check if user exists and if he has administrator perms (this should never happen)
        const user = await Users.findOne({ _id: req.user.id })
        if (!user || user.role !== 0) {
            return res.status(500).json({ msg: 'Permission denied' })
        }

        const value_int = parseInt(value)
        if (value_int < 1) {
            return res.status(400).json({ msg: 'Goal must be over 1!' })
        }
        await Dashboard.findOneAndUpdate(
            {},
            { $set: { license_goal_monthly: value_int } }
        )
        res.json({ msg: 'Progress goal updated successfully!' })
        logger(`Update progress chart`, user.name, 0)
    },

    /// ////////////////////////////////////
    //*
    //*   Update Discord bot
    //*
    /// ////////////////////////////////////

    updateDiscordBot: async (req, res) => {
        const {
            bot_label,
            bot_color,
            bot_activity,
            bot_success,
            bot_failed,
            bot_timeout,
            self_verify,
            customer_role,
        } = req.body

        // Check if user exists and if he has administrator perms (this should never happen)
        const user = await Users.findOne({ _id: req.user.id })
        if (!user || user.role !== 0) {
            return res.status(500).json({ msg: 'Permission denied' })
        }

        if (bot_label.length > 25) {
            return res.status(400).json({ msg: 'Invalid bot label' })
        }
        if (bot_activity.length > 120) {
            return res.status(400).json({ msg: 'Invalid bot activity' })
        }
        const isHex = /^#[0-9a-f]{3,6}$/i
        if (
            !isHex.test(bot_color) ||
            !isHex.test(bot_failed) ||
            !isHex.test(bot_timeout) ||
            !isHex.test(bot_success)
        ) {
            return res.status(400).json({ msg: 'Invalid bot embed colors' })
        }

        if (customer_role && customer_role !== '' && self_verify !== 'false') {
            if (isNaN(customer_role) || customer_role.length < 17) {
                return res.status(400).json({ msg: 'Invalid customer role ID' })
            }
        }

        try {
            await Dashboard.findOneAndUpdate(
                {},
                {
                    $set: {
                        discord_bot_label: bot_label,
                        discord_bot_color: bot_color,
                        discord_bot_failed: bot_failed,
                        discord_bot_timeout: bot_timeout,
                        discord_bot_success: bot_success,
                        self_verify,
                        customer_role,
                        discord_bot_activity: bot_activity,
                    },
                }
            )
            res.json({ msg: 'Successfully updated Discord bot data' })

            const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
            await client.login(process.env.DISCORD_BOT_TOKEN)
            client.user.setActivity(bot_activity, { type: 'PLAYING' })
        } catch (error) {
            console.log(error)
        }
    },

    /// ////////////////////////////////////
    //*
    //*   Update Discord webhook
    //*
    /// ////////////////////////////////////

    updateDiscordWebhook: async (req, res) => {
        const {
            webhook_error,
            webhook_success,
            webhook_warning,
            webhook_label,
            webhook_url,
        } = req.body

        // Check if user exists and if he has administrator perms (this should never happen)
        const user = await Users.findOne({ _id: req.user.id })
        if (!user || user.role !== 0) {
            return res.status(500).json({ msg: 'Permission denied' })
        }

        if (!webhook_label || webhook_label.length > 25) {
            return res.status(400).json({ msg: 'Invalid webhook label' })
        }

        const isUrl =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

        if (!isUrl.test(webhook_url)) {
            return res.status(400).json({ msg: 'Invalid webhook URL' })
        }

        const isHex = /^#[0-9a-f]{3,6}$/i
        if (
            !isHex.test(webhook_error) ||
            !isHex.test(webhook_success) ||
            !isHex.test(webhook_warning)
        ) {
            return res.status(400).json({ msg: 'Invalid webhook colors' })
        }

        await Dashboard.findOneAndUpdate(
            {},
            {
                $set: {
                    webhook_success_color: webhook_success,
                    webhook_error_color: webhook_error,
                    webhook_warning_color: webhook_warning,
                    webhook_url,
                    webhook_label,
                },
            }
        )
        res.json({ msg: 'Successfully updated' })
    },
    updateDiscordWebhookImg: async (req, res) => {
        // Multer upload function
        upload(req, res, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ msg: err.message })
            }
            // Get image path
            const img_path = req.file.path

            // Resize image to square
            const buffer = await sharp(img_path).resize(200, 200).toBuffer()

            // Save resized image
            await sharp(buffer).toFile(img_path)

            // Check if user already has an old img and delete it
            const dashboard = await Dashboard.findOne()
            const pathToFile = path.join(
                __dirname,
                `../build/images/${dashboard.webhook_image}`
            )

            // Remove existing webhook image
            if (fs.existsSync(pathToFile)) {
                fs.unlinkSync(pathToFile)
            }

            // Logger
            logger(`Img upload`, null, 0)

            // Save new img
            await Dashboard.findOneAndUpdate(
                {},
                {
                    $set: { webhook_image: req.file.filename },
                }
            )
            return res.json({
                msg: 'Successfully updated profile picture!',
            })
        })
    },
    getSettingsData: async (req, res) => {
        try {
            const dashboard = await Dashboard.findOne()

            dashboard.private_key = await decrypt(dashboard.private_key)
            dashboard.public_key = await decrypt(dashboard.public_key)

            res.json(dashboard)
        } catch (error) {
            console.log(error)
        }
    },
    resetWebhookImage: async (req, res) => {
        try {
            const hasImage = await Dashboard.findOne()
            if (
                !hasImage.webhook_image ||
                hasImage.webhook_image === 'https://i.imgur.com/A3OVRtG.png'
            ) {
                return res
                    .status(400)
                    .json({ msg: 'You dont have webhook image' })
            }
            await Dashboard.findOneAndUpdate(
                {},
                { $set: { webhook_image: 'https://i.imgur.com/A3OVRtG.png' } }
            )
            res.json({ msg: 'Successfully reset webhook image' })
        } catch (error) {
            return console.log(error)
        }
    },
    resetApiKey: async (req, res) => {
        const { type, password } = req.body
        if (!password) {
            return res.status(400).json({ msg: 'Password is required' })
        }
        if (!type || (type !== 'private_key' && type !== 'public_key'))
            return res.status(500).json({ msg: 'Invalid type' })

        // Check if user exists and if he has administrator perms (this should never happen)
        const user = await Users.findOne({ _id: req.user.id })
        if (!user || user.role !== 0) {
            return res.status(500).json({ msg: 'Permission denied' })
        }
        // Checks if passwords match
        const isMatch = await argon.verify(user.password, password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Password is not correct.' })
        }

        const keyDec = crypto.randomBytes(40).toString('hex').slice(0, 40)
        const new_key = await encrypt(keyDec)
        if (type === 'public_key') {
            try {
                await Dashboard.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            public_key: new_key,
                        },
                    }
                )
                logger('Public key reset', user.name, 0)
                return res.json({
                    msg: 'Successfully reset public API key',
                    key: keyDec,
                })
            } catch (error) {
                console.log(error)
            }
        }
        if (type === 'private_key') {
            try {
                await Dashboard.findOneAndUpdate(
                    {},
                    {
                        $set: {
                            private_key: new_key,
                        },
                    }
                )
                logger('Private key reset', user.name, 0)
                return res.json({
                    msg: 'Successfully reset private API key',
                    key: keyDec,
                })
            } catch (error) {
                console.log(error)
            }
        }
    },
}

/// ////////////////////////////////////
//*
//*   JSON-web-tokens
//*
/// ////////////////////////////////////

const createAccessToken = (payload) =>
    // JWT accesstoken
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5m',
    })
const createRefreshToken = (payload) =>
    // JWT refreshtoken
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '6h',
    })
module.exports = userCtrl
