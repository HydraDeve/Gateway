const { rejectionHandler } = require('../utils/apiCtrl/rejectionHandler')
const Licenses = require('../models/licenseModel')
const Products = require('../models/productsModel')
const { decrypt } = require('../utils/crypto')
const { expiringHandler } = require('../utils/apiCtrl/expiringHandler')
const { ipHandler } = require('../utils/apiCtrl/ipHandler')
const { hwidHandler } = require('../utils/apiCtrl/hwidHandler')
const { ipObject } = require('../utils/apiCtrl/ipObject')
const { hwidObject } = require('../utils/apiCtrl/hwidObject')
const { logger } = require('../utils/logger')
const { webhookHandler } = require('../utils/apiCtrl/webhookHandler')
const { blacklistHandler } = require('../utils/apiCtrl/blacklistHandler')
const { countrylockHandler } = require('../utils/apiCtrl/countrylockHandler')
const { dateAgo } = require('../utils/dateago')

const apiCtrl = {
    verify: async (req, res) => {
        // Get data from request body
        const { product, licensekey, hwid, version } = req.body

        // Get IP from request header
        let ip =
            req.headers['cf-connecting-ip'] ||
            req.headers['x-real-ip'] ||
            req.headers['x-forwarded-for'] ||
            req.socket.remoteAddress
        if (ip.substr(0, 7) === '::ffff:') {
            ip = ip.substr(7)
        }

        // Verify body form (hwid & version optional)
        if (!product || !licensekey) {
            // Request rejected
            rejectionHandler(true, ip)

            // Discord webhook
            webhookHandler(`Invalid licensekey`, ip, null, null, null, 'error')

            return res.json({
                status_msg: 'FAILED_AUTHENTICATION',
                status_overview: 'failed',
                status_code: 400,
            })
        }

        // Verify license key
        const licenselist = await Licenses.find()

        // TODO: Change this to just find({licensekey: encrypt(licensekey)})
        let licensebody
        for (let i = 0; i < licenselist.length; i++) {
            const licenseToSearch = licenselist[i]
            const decrypted = decrypt(licenseToSearch.licensekey)
            if (decrypted === licensekey) {
                licensebody = licenseToSearch
                break
            }
        }

        // Blacklist check
        const isBlacklisted = await blacklistHandler(ip, hwid)
        if (isBlacklisted) {
            rejectionHandler(true, ip, licensebody)

            // Logger
            logger(`Blacklisted IP/HWID`, null, 1, ip)

            // Discord webhook
            webhookHandler(
                `Blacklisted IP/HWID`,
                ip,
                licensebody || null,
                hwid,
                version === undefined ? null : version,
                'error',
                product,
                null,
                licensekey
            )

            return res.json({
                status_msg: 'BLACKLISTED',
                status_overview: 'failed',
                status_code: 403,
            })
        }

        // Wrong licensekey
        if (!licensebody) {
            rejectionHandler(true, ip)

            // Logger
            logger(`Invalid licensekey`, null, 1, ip)

            // Discord webhook
            webhookHandler(
                `Invalid licensekey`,
                ip,
                null,
                hwid,
                version,
                'error',
                product,
                null,
                licensekey
            )

            return res.json({
                status_msg: 'INVALID_LICENSEKEY',
                status_overview: 'failed',
                status_code: 401,
            })
        }

        // Check if license key is expired
        const isExpired = await expiringHandler(licensebody)
        if (isExpired) {
            rejectionHandler(true, ip, licensebody)

            res.json({
                status_msg: 'EXPIRED_LICENSEKEY',
                status_overview: 'failed',
                status_code: 410,
            })

            // Check if license should be deleted
            if (licensebody.expires_delete_after === true) {
                // Delete license
                await Licenses.findByIdAndDelete({ _id: licensebody._id })

                // Send webhook of delete
                webhookHandler(
                    `Deleted expired licensekey`,
                    ip,
                    licensebody,
                    hwid,
                    version,
                    'warning',
                    product
                )

                // Logger
                return logger(
                    `Expired licensekey`,
                    licensebody.clientname,
                    1,
                    ip
                )
            }
            // Send webhook of delete
            webhookHandler(
                `Expired licensekey`,
                ip,
                licensebody,
                hwid,
                version,
                'warning',
                product
            )

            // Logger
            return logger(`Expired licensekey`, licensebody.clientname, 1, ip)
        }

        // Check if product is correct
        const productByName = await Products.findOne({ name: product })

        if (!productByName) {
            rejectionHandler(true, ip, licensebody)

            // Logger
            logger(`Invalid product`, licensebody.clientname, 1, ip)

            // Discord webhook
            webhookHandler(
                `Invalid product`,
                ip,
                licensebody,
                hwid,
                version,
                'warning',
                product
            )

            return res.json({
                status_msg: 'INVALID_PRODUCT',
                status_overview: 'failed',
                status_code: 401,
            })
        }
        if (productByName.name !== licensebody.product_name) {
            rejectionHandler(true, ip, licensebody)

            // Logger
            logger(`Invalid product`, licensebody.clientname, 1, ip)

            // Discord webhook
            webhookHandler(
                `Invalid product`,
                ip,
                licensebody,
                hwid,
                version,
                'warning',
                product
            )

            return res.json({
                status_msg: 'INVALID_PRODUCT',
                status_overview: 'failed',
                status_code: 401,
            })
        }

        // Check IP-Cap

        // Clear expired IPs
        await ipHandler(licensebody)

        // Check if IP-cap reached
        if (
            licensebody.ip_cap &&
            licensebody.ip_list.length >= licensebody.ip_cap
        ) {
            let isNewIP = false
            for (let x = 0; x < licensebody.ip_list.length; x++) {
                const ipToSearch = licensebody.ip_list[x]
                if (ipToSearch.ip !== ip) {
                    isNewIP = true
                }
            }
            if (isNewIP) {
                rejectionHandler(true, ip, licensebody)

                // Logger
                logger(`Maximum IPs`, licensebody.clientname, 1, ip)

                // Discord webhook
                webhookHandler(
                    `Maximum IPs`,
                    ip,
                    licensebody,
                    hwid,
                    version,
                    'warning',
                    product
                )

                return res.json({
                    status_msg: 'MAXIMUM_IPS',
                    status_overview: 'failed',
                    status_code: 401,
                })
            }
        }

        // Check HWID-Cap

        // Clear expired HWIDs
        await hwidHandler(licensebody)
        // Check if IP-cap reached
        if (
            licensebody.hwid_cap &&
            licensebody.hwid_list.length >= licensebody.hwid_cap
        ) {
            let isNewHWID = false
            for (let x = 0; x < licensebody.hwid_list.length; x++) {
                const hwidToSearch = licensebody.hwid_list[x]
                if (hwidToSearch.hwid !== hwid) {
                    isNewHWID = true
                }
            }
            if (isNewHWID) {
                rejectionHandler(true, ip, licensebody)

                // Logger
                logger(`Maximum HWIDs`, licensebody.clientname, 1, ip)

                // Discord webhook
                webhookHandler(
                    `Maximum HWIDs`,
                    ip,
                    licensebody,
                    hwid,
                    version,
                    'warning',
                    product
                )

                return res.json({
                    status_msg: 'MAXIMUM_HWIDS',
                    status_overview: 'failed',
                    status_code: 401,
                })
            }
        }

        // Check country lock
        if (licensebody.ip_geo_lock) {
            const [isCountryblock, country] = await countrylockHandler(
                licensebody.ip_geo_lock,
                ip
            )
            if (isCountryblock) {
                rejectionHandler(true, ip, licensebody)

                // Logger
                logger(`Blocked country`, licensebody.clientname, 1, ip)

                // Discord webhook
                webhookHandler(
                    `Blocked country`,
                    ip,
                    licensebody,
                    hwid,
                    version,
                    'warning',
                    product,
                    country
                )

                return res.json({
                    status_msg: 'BLOCKED_COUNTRY',
                    status_overview: 'failed',
                    status_code: 401,
                })
            }
        }

        // Update license
        await Licenses.findByIdAndUpdate(
            { _id: licensebody._id },
            {
                $set: {
                    latest_request: new Date(),
                    latest_ip: ip,
                    latest_hwid: hwid,
                },
                $inc: { total_requests: 1 },
            }
        )

        // Update licensebody
        licensebody = await Licenses.findOne({ _id: licensebody._id })

        // Add +1 to successful requests
        rejectionHandler(false, ip, licensebody)

        // Handle IP
        await ipObject(ip, licensebody)

        // Handle HWID
        if (hwid) {
            await hwidObject(hwid, licensebody)
        }

        // Secret hash
        const niggahash = req.headers.authorization.substring(0, 2)
        const thash = Date.now().toString().slice(0, -5)
        const lhashL = req.body.licensekey.substring(0, 2)
        const lhashR = req.body.licensekey.substring(
            req.body.licensekey.length - 2,
            req.body.licensekey.length
        )
        const rhash = Buffer.from(lhashL + lhashR + niggahash).toString(
            'base64'
        )
        const finalhash = `${rhash}694201337${thash}`

        // Get expiring date
        let expires_in
        if (licensebody.expires) {
            if (
                licensebody.expires_type === 1 ||
                licensebody.expires_type === 2
            ) {
                expires_in = await dateAgo(licensebody.expires_date)
            }
            if (licensebody.expires_type === 3) {
                expires_in = `${licensebody.total_requests}/${licensebody.expires_times}`
            }
        } else {
            expires_in = 'never'
        }

        res.json({
            status_msg: 'SUCCESSFUL_AUTHENTICATION',
            status_overview: 'success',
            status_code: 200,
            status_id: finalhash,
            description: licensebody.description,
            version: productByName.version,
            clientname: licensebody.clientname,
            discord_username: licensebody.discord_username || 'unknown',
            discord_id: licensebody.discord_id || 'unknown',
            expires: expires_in,
        })

        // Updated body
        const updatedBody = await Licenses.findOne({ _id: licensebody._id })

        // Discord webhook
        webhookHandler(
            `Successful authentication`,
            ip,
            updatedBody,
            hwid,
            version,
            'success',
            product
        )

        return logger(
            `Successful authentication`,
            licensebody.clientname,
            1,
            ip
        )
    },
}

module.exports = apiCtrl
