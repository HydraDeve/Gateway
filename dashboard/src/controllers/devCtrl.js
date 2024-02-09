const axios = require('axios')
const moment = require('moment')
const Licenses = require('../models/licenseModel')
const Products = require('../models/productsModel')
const Users = require('../models/userModel')
const Dashboard = require('../models/dashboardModel')
const { decrypt, encrypt } = require('../utils/crypto')
const { logger } = require('../utils/logger')
const { generateProductKey } = require('../utils/generateLicense')

const devCtrl = {
    // Getlicenses function to get all licenses from the database and encrypting them
    getlicenses: async (req, res) => {
        const license = req.query.license
        const clientname = req.query.clientname
        const product_name = req.query.product

        if (!license && !clientname && !product_name) {
            // Get all licenses from database
            const licenses = await Licenses.find()

            // Array for all the encrypted licenses
            const encryptedLicenses = []

            // Encrypting all licenses
            for (let x = 0; x < licenses.length; x++) {
                const licenseToCheck = licenses[x]
                // Get licensekey from licenses json and decrypt it
                const licensekey = licenseToCheck.licensekey
                const licensekeyEnc = await decrypt(licensekey)

                // Replace license.licensekey with licensekeyEnc
                licenseToCheck.licensekey = licensekeyEnc

                // Add license to the array
                encryptedLicenses.push(licenseToCheck)
            }

            return res.json({
                msg: 'All licenses successfully fetched!',
                total: encryptedLicenses.length,
                licenses: encryptedLicenses,
            })
        }

        const query = {}
        if (clientname) query.clientname = clientname
        if (product_name) query.product_name = product_name

        // Check if query is empty
        const licenses = []
        if (Object.keys(query).length !== 0) {
            const matches = await Licenses.find(query)
            if (!matches) {
                return res.json({ msg: 'No matches found' })
            }
            // Push every match to the licenses array
            for (let x = 0; x < matches.length; x++) {
                licenses.push(matches[x])
            }
        } else {
            const matches = await Licenses.find()
            if (!matches) {
                return res.json({ msg: 'No matches found' })
            }
            // Push every match to the licenses array
            for (let x = 0; x < matches.length; x++) {
                licenses.push(matches[x])
            }
        }

        const final = []

        if (license && licenses.length > 0) {
            for (let x = 0; x < licenses.length; x++) {
                const licenseToCheck = licenses[x]
                const licenseDec = await decrypt(licenseToCheck.licensekey)
                licenseToCheck.licensekey = licenseDec

                if (license === licenseDec) final.push(licenseToCheck)
            }
        } else {
            for (let x = 0; x < licenses.length; x++) {
                const licenseToCheck = licenses[x]
                const licenseDec = await decrypt(licenseToCheck.licensekey)
                licenseToCheck.licensekey = licenseDec

                final.push(licenseToCheck)
            }
        }

        if (final.length === 0) return res.json({ msg: 'No matches found' })

        return res.json({
            msg: 'Successfully found licenses matching given query!',
            count: final.length,
            licenses: final,
        })
    },

    // Createlicense function to create a new license to the database.
    createlicense: async (req, res) => {
        // Get license product from request body

        /* eslint-disable */
        let {
            product,
            clientname,
            discord_id,
            description,
            expires,
            expires_delete_after,
            expires_type,
            expires_days,
            expires_date,
            expires_times,
            expires_start_on_first,
            ip_cap,
            ip_expires,
            hwid_cap,
            prefer_discord,
            hwid_expires,
            receive_webhooks,
            pre_ips_list,
            tags,
            created_by,
        } = req.body
        /* eslint-enable */

        // Validate minimum body form
        if (
            product === undefined ||
            clientname === undefined ||
            expires === undefined
        ) {
            return res.status(400).json({
                msg: 'Required fields are missing!',
            })
        }

        // Validate req.body types
        if (
            (prefer_discord && typeof prefer_discord !== 'boolean') ||
            (tags && typeof tags !== 'object') ||
            (pre_ips_list && typeof pre_ips_list !== 'object') ||
            (product && typeof product !== 'string') ||
            (clientname && typeof clientname !== 'string') ||
            (discord_id && typeof discord_id !== 'string') ||
            (description && typeof description !== 'string') ||
            (expires && typeof expires !== 'boolean') ||
            (expires_delete_after &&
                typeof expires_delete_after !== 'boolean') ||
            (expires_type && typeof expires_type !== 'string') ||
            (expires_days && typeof expires_days !== 'number') ||
            (expires_date && typeof expires_date !== 'string') ||
            (expires_times && typeof expires_times !== 'number') ||
            (expires_start_on_first &&
                typeof expires_start_on_first !== 'boolean') ||
            (ip_cap && typeof ip_cap !== 'number') ||
            (ip_expires && typeof ip_expires !== 'number') ||
            (hwid_cap && typeof hwid_cap !== 'number') ||
            (hwid_expires && typeof hwid_expires !== 'number') ||
            (receive_webhooks && typeof receive_webhooks !== 'boolean') ||
            (created_by && typeof created_by !== 'string')
        ) {
            return res.status(400).json({
                msg: 'Invalid request body types!',
            })
        }

        // Check if product exists in the database
        const productExists = await Products.findOne({ name: product })
        if (!productExists) {
            return res.status(400).json({
                msg: 'Invalid product',
            })
        }

        // Validate clientname length
        if (clientname.length < 3 || clientname.length > 100) {
            return res.status(400).json({
                msg: 'Invalid clientname length',
            })
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

        // Validate description
        if (description && description.length > 400) {
            return res.status(400).json({ msg: 'Description too long!' })
        }

        // Price after discount
        const gross = productExists.price * (1 - productExists.discount / 100)

        // Add +1 to Dashboard current ID
        await Dashboard.findOneAndUpdate({ $inc: { current_id: 1 } })
        const dashboard_updated = await Dashboard.findOne()

        // Make ID
        const yourNumber = dashboard_updated.current_id
        const defaultFill = '00000'

        const license_id = (defaultFill + yourNumber).substr(
            String(yourNumber).length
        )

        // Add days to date function (for expire type 1)
        function addDays(date, days) {
            const result = new Date(date)
            result.setDate(result.getDate() + days)
            return result
        }

        // Validate IP-Cap
        if (ip_cap !== undefined) {
            if (isNaN(ip_cap) || ip_cap < 1) {
                return res.status(400).json({ msg: 'IP-Cap is not valid' })
            }
        }

        // Validate IP-Expires
        if (ip_expires !== undefined) {
            if (isNaN(ip_expires) || ip_expires < 1) {
                return res.status(400).json({ msg: 'IP-Expires is not valid' })
            }
        }

        // Validate HWID-Cap
        if (hwid_cap !== undefined) {
            if (isNaN(hwid_cap) || hwid_cap < 1) {
                return res.status(400).json({ msg: 'HWID-Cap is not valid' })
            }
        }

        // Validate HWID-Expires
        if (hwid_expires !== undefined) {
            if (isNaN(hwid_expires) || hwid_expires < 1) {
                return res
                    .status(400)
                    .json({ msg: 'HWID-Expires is not valid' })
            }
        }

        // Handle expiring strings
        if (expires && expires === true) {
            if (expires_type === undefined) {
                console.log(expires_type)
                return res.status(400).json({
                    msg: 'Invalid expires_type. 1 = days, 2 = date, 3 = times',
                })
            }
            if (expires_type === 'days') {
                if (!expires_days) {
                    return res.status(400).json({ msg: 'Invalid expires_days' })
                }
                if (expires_start_on_first === undefined) {
                    return res
                        .status(400)
                        .json({ msg: 'Invalid expires_start_on_first' })
                }

                if (expires_start_on_first) {
                    expires_date = undefined
                } else {
                    expires_date = addDays(new Date(), expires_days)
                }
                expires_type = 1
                expires_times = undefined
            } else if (expires_type === 'date') {
                if (!expires_date) {
                    return res.status(400).json({ msg: 'Invalid expires_date' })
                }

                if (moment(expires_date, 'MM/DD/YYYY', true).isValid()) {
                    return res.status(400).json({
                        msg: 'Invalid expires_date format. Wanted format: MM/DD/YYYY',
                    })
                }

                expires_type = 2
                expires_days = undefined
                expires_start_on_first = undefined
                expires_times = undefined
            } else if (expires_type === 'times') {
                if (!expires_times) {
                    return res
                        .status(400)
                        .json({ msg: 'Invalid expires_times' })
                }
                expires_type = 3
                expires_days = undefined
                expires_start_on_first = undefined
                expires_date = undefined
            } else {
                return res.status(400).json({
                    msg: 'Invalid expires_type. 1 = days, 2 = date, 3 = times',
                })
            }
        }
        if (!expires) {
            expires = false
            expires_type = undefined
            expires_days = undefined
            expires_start_on_first = undefined
            expires_date = undefined
            expires_times = undefined
        }

        // Create license key
        const licensekey = await generateProductKey(5, 5)
        const licensekeyEnc = await await encrypt(licensekey)

        // Start creating a license object
        const license = {
            licensekey: licensekeyEnc,
            product_name: product,
            product: productExists._id,
            clientname,
            discord_id: discord_id || null,
            discord_username,
            description: description || null,
            ip_cap: ip_cap === undefined ? null : ip_cap,
            ip_expires:
                // eslint-disable-next-line no-nested-ternary
                ip_cap === undefined
                    ? null
                    : ip_expires === undefined
                    ? null
                    : ip_expires,
            hwid_cap: hwid_cap === undefined ? null : hwid_cap,
            hwid_expires:
                // eslint-disable-next-line no-nested-ternary
                hwid_cap === undefined
                    ? null
                    : hwid_expires === undefined
                    ? null
                    : hwid_expires,
            receive_webhooks: receive_webhooks || false,
            license_id,
            payment_sum: gross,
            tags,
            latest_request: undefined,
            lastest_hwid: null,
            lastest_ip: null,
            ip_geo_lock: null,
            ip_list: pre_ips_list || [],
            hwid_list: [],
            total_requests: 0,
            created_by: created_by || 'DevAPI',

            //* Lifespan
            expires,
            expires_delete_after,
            expires_type,
            expires_days,
            expires_start_on_first,
            expires_date,
            expires_times,
        }

        const newLicense = new Licenses(license)
        await newLicense.save()

        // Add +1 to user license count
        await Users.findOneAndUpdate(
            { name: created_by },
            { $inc: { licenses_added: 1, revenue: gross } }
        )

        // Add +1 to product sales
        await Products.findOneAndUpdate(
            { name: created_by },
            { $inc: { total_purchases: 1, total_gross: gross } }
        )
        license.licensekey = licensekey
        res.json({ msg: 'Licensekey successfully added', license })
        // Logger
        logger(`License created`, 'DevAPI', 0)
    },

    // Function for deleting a license
    deleteLicense: async (req, res) => {
        const license = req.query.license
        if (!license) {
            return res.status(400).json({ msg: 'No license provided' })
        }

        const licenses = await Licenses.find()

        for (let x = 0; x < licenses.length; x++) {
            const licenseToCheck = licenses[x]
            const licenseDecrypted = await decrypt(licenseToCheck.licensekey)
            if (licenseDecrypted === license) {
                await Licenses.findOneAndRemove({ _id: licenseToCheck._id })
                licenseToCheck.licensekey = licenseDecrypted
                return res.json({
                    msg: 'License successfully deleted',
                    license: licenseToCheck,
                })
            }
        }

        // Response license not found
        res.status(404).json({ msg: 'License not found', license })
    },
}

module.exports = devCtrl
