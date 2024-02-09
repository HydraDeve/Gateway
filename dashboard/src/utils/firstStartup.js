const crypto = require('crypto')
const argon = require('argon2')
const Users = require('../models/userModel')
const Dashboard = require('../models/dashboardModel')

// Argon2 for password hashing

// Encrypt function to encrypt API-keys
const { encrypt } = require('./crypto')
const { joensuu } = require('./dateHandler')

const errorLog = (reason) => {
    // Check if login values exists in .env
    // Missing config values console log
    console.log(`\x1b[33m`)
    console.log(`    \x1b[33m╭────────────────────────────────────────╮`)
    console.log(
        `    \x1b[33m│    \x1b[37m> Missing/invalid config values <   \x1b[33m│`
    )
    console.log(
        `    \x1b[33m│    \x1b[37mCheck your .env file and fill in    \x1b[33m│`
    )
    console.log(
        `    \x1b[33m│    \x1b[37m         all the details            \x1b[33m│`
    )
    console.log(`    \x1b[33m╰────────────────────────────────────────╯`)
    console.log(`\x1b[33m`)

    console.log(`\x1b[33m${reason}`)

    // Process.exit => causes crash
    process.exit(1)
}

const firstStartup = async () => {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.length < 10) {
        return errorLog('Invalid MONGODB_URI in .env')
    }

    if (!process.env.LOGIN_EMAIL || process.env.LOGIN_EMAIL.length < 10) {
        return errorLog('Invalid LOGIN_EMAIL in .env')
    }
    if (!process.env.PORT || isNaN(process.env.PORT)) {
        return errorLog('Invalid PORT in .env')
    }
    if (
        !process.env.DISCORD_BOT_TOKEN ||
        process.env.DISCORD_BOT_TOKEN.length < 20
    ) {
        return errorLog('Invalid DISCORD_BOT_TOKEN in .env')
    }

    if (
        (process.env.LOGIN_PASSWORD && process.env.LOGIN_PASSWORD.length < 6) ||
        (process.env.LOGIN_PASSWORD && process.env.LOGIN_PASSWORD.length > 100)
    ) {
        return errorLog('Invalid LOGIN_PASSWORD in .env')
    }

    //* ACCOUNT CHECKING

    // Check if email doesnt exist => email is always unique
    const checkUser = await Users.findOne({
        email: process.env.LOGIN_EMAIL,
    })

    // If doesnt exist, create new account
    if (!checkUser) {
        // Argon2 password hash
        const passwordHash = await argon.hash(process.env.LOGIN_PASSWORD)

        const newUser = new Users({
            name: process.env.LOGIN_NAME,
            email: process.env.LOGIN_EMAIL,
            password: passwordHash,
            twofactor: false,
            role: 0,
        })
        await newUser.save()

        console.log(`\x1b[36m`)
        console.log(`    \x1b[36m╭────────────────────────────────────────╮`)
        console.log(
            `    \x1b[36m│       \x1b[37m> First startup detected <       \x1b[36m│`
        )
        console.log(
            `    \x1b[36m│       \x1b[37m                                 \x1b[36m│`
        )
        console.log(
            `    \x1b[36m│     \x1b[37mRemove your LOGIN_PASSWORD line    \x1b[36m│`
        )
        console.log(
            `    \x1b[36m│    \x1b[37m from .env for security reasons!    \x1b[36m│`
        )
        console.log(`    \x1b[36m╰────────────────────────────────────────╯`)
        console.log(`\x1b[36m`)
        console.log(`=> Name: ${process.env.LOGIN_NAME}`)
        console.log(`=> Email: ${process.env.LOGIN_EMAIL}`)
        console.log(`=> Password: ${process.env.LOGIN_PASSWORD}`)
        console.log(
            '=> Save you password somewhere. You can also change it later from dashboard!'
        )
        console.log(``)
    }

    //* DASHBOARD OPTIONS CHECKING

    const checkDashboard = await Dashboard.findOne({})
    if (!checkDashboard) {
        const public_key = crypto.randomBytes(40).toString('hex').slice(0, 40)
        console.log(`=> Public key: ${public_key}`)
        const public_key_encrypted = encrypt(public_key)

        const private_key = crypto.randomBytes(40).toString('hex').slice(0, 40)
        console.log(`=> Private key: ${private_key}`)
        const private_key_encrypted = encrypt(private_key)

        const newDashboard = new Dashboard({
            public_key: public_key_encrypted,
            private_key: private_key_encrypted,
        })
        await newDashboard.save()
    }
}

exports.firstStartup = firstStartup
