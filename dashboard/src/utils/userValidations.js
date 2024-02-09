const Joi = require('joi')

const email = Joi.string()
    .email({ minDomainSegments: 2 })
    .min(8)
    .max(30)
    .required()
    .messages({
        'string.email': `Not a Valid E-mail, valid emails are of the form name@domain.tld `,
        'string.empty': `E-mail cannot be an empty field`,
        'string.min': `E-mail should have a minimum length of {#limit}`,
        'string.max': `E-mail should have a maximum length of {#limit}`,
    })

const password = Joi.string()
    .min(6)
    .max(100)
    .pattern(/^[a-zA-Z0-9]/)
    .required()
    .messages({
        'string.pattern.base': `Password can only contain upper case and lower case characters and numbers`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.max': `Password should have a maximum length of {#limit}`,
    })

const licensekey = Joi.string().min(10).max(40).required().messages({
    'string.empty': `License key cannot be empty`,
    'string.min': `License key should have a minimum length of {#limit}`,
    'string.max': `License key should have a maximum length of {#limit}`,
})

const clientname = Joi.string().min(3).max(100).required().messages({
    'string.empty': `Client name cannot be empty`,
    'string.min': `Client name should have a minimum length of {#limit}`,
    'string.max': `Client name should have a maximum length of {#limit}`,
})

exports.loginSchema = Joi.object({ email, password })
exports.passwordValidate = Joi.object({ password })
exports.emailValidate = Joi.object({ email })
exports.createlicenseValidate = Joi.object({ licensekey, clientname })
