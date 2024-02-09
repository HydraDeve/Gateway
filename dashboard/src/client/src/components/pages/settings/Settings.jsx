import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BlockPicker } from 'react-color'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { dispatchGetUser, fetchUser } from '../../../redux/actions/authAction'
import { showErrMsg } from '../../../utils/ErrorHandler'
import HelmetHandler from '../../../utils/HelmetHandler'
import { Context } from '../../../utils/NavState'
import { notify_error, notify_success } from '../../../utils/Notifications'
import Popup from '../../../utils/Popup'
import { isEmpty, isLength, isMatch } from '../../../utils/validation'
import SmallBtn from '../../global/buttons/SmallBtn'
import Footer from '../../global/Footer'
import NavbarHeader from '../../global/NavbarHeader'
import VerticalMenu from '../../global/VerticalMenu'
import {
    GlobalInput,
    GlobalSelect,
    MainWrapper,
    PageTitleContainer,
    PageTitleH4,
    PageTitleNav,
    PageTitleSpan,
} from '../../styles/GlobalStyles'

import { AiOutlineEye } from 'react-icons/ai'
import { FiCopy } from 'react-icons/fi'
import { BiReset } from 'react-icons/bi'

// Initial state
const initialState = {
    enable2FApop: false,
    disable2FApop: false,
    disableDiscordPopUp: false,
    apikey: false,
    twoFactorUrl: '',
    usertoken: '',
    image: null,

    // Verify password
    password: '',

    // Change password
    old_password: '',
    new_password1: '',
    new_password2: '',
    publicKey: '',
    privateKey: '',
    resetinput: '',
    err: '',
    success: '',

    // Webhooks
    webhook_success: '#2ECC71',
    webhook_warning: '#FF8A65',
    webhook_error: '#992D22',

    self_verify: true,
    customer_role: '',

    webhook_url: '',
    webhook_label: '',

    bot_color: '#3498DB',
    bot_label: '',
    bot_activity: '',
}

function Settings() {
    const [navState] = useContext(Context)
    const token = useSelector((state) => state.token)
    const auth = useSelector((state) => state.auth)

    const [callback, setCallback] = useState(false)
    const [loading, setLoading] = useState(true)
    const [apikeytype, setApikeytype] = useState('')

    const [privateKeyVisibility, setPrivateKeyVisivility] = useState(false)
    const [publicKeyVisibility, setPublicKeyVisivility] = useState(false)

    // Color picker
    const [colorpicker, setColorpicker] = useState('')
    const [colorMode, setColorMode] = useState('')

    const { user } = auth
    const dispatch = useDispatch()

    ///////////////////////////////////////
    //*
    //*   States
    //*
    ///////////////////////////////////////

    const [data, setData] = useState(initialState)

    const {
        enable2FApop,
        disable2FApop,
        disableDiscordPopUp,
        apikey,
        twoFactorUrl,
        usertoken,
        password,
        old_password,
        new_password1,
        new_password2,
        publicKey,
        image,
        privateKey,
        resetinput,
        err,

        webhook_success,
        webhook_error,
        webhook_warning,
        bot_color,
        bot_failed,
        bot_timeout,
        bot_success,

        self_verify,
        customer_role,

        webhook_url,
        webhook_label,
        webhook_image,
        bot_label,
        bot_activity,
    } = data

    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            fetchUser(token).then((res) => {
                dispatch(dispatchGetUser(res))
            })
        }
        return () => {
            unmounted = true
        }
    }, [callback])

    ///////////////////////////////////////
    //*
    //*   2FA-Requests
    //*
    ///////////////////////////////////////

    const generate2FA = async () => {
        try {
            const res = await axios.get('/api/users/2FA/generate', {
                headers: { Authorization: token },
            })
            setData({
                ...data,
                twoFactorUrl: res.data,
                enable2FApop: true,
                err: '',
                success: '',
            })
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }
    const verify2FA = async (e) => {
        try {
            e.preventDefault()
            await axios.post(
                '/api/users/2FA/verify',
                {
                    usertoken: usertoken,
                },
                {
                    headers: { Authorization: token },
                }
            )
            setCallback(!callback)
            setData({ ...data, enable2FApop: false, err: '', success: '' })
            notify_success('Successfully enabled 2FA')
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    const resetApiKey = async (e) => {
        try {
            e.preventDefault()

            if (!password) {
                return notify_error('You must verify using your password')
            }

            const res = await axios.post(
                '/api/users/resetapikey',
                {
                    type: apikeytype,
                    password: password,
                },
                {
                    headers: { Authorization: token },
                }
            )
            setCallback(!callback)
            if (apikeytype === 'public_key') {
                setData({
                    ...data,
                    apikey: false,
                    publicKey: res.data.key,
                    err: '',
                    success: '',
                })
            }
            if (apikeytype === 'private_key') {
                setData({
                    ...data,
                    apikey: false,
                    privateKey: res.data.key,
                    err: '',
                    success: '',
                })
            }
            notify_success('Successfully reset API key')
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    const remove2FA = async (e) => {
        try {
            e.preventDefault()

            if (!password) {
                return notify_error('You must verify using your password')
            }

            await axios.post(
                '/api/users/2FA/remove',
                {
                    password: password,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            setCallback(!callback)
            setData({
                ...data,
                disable2FApop: false,
                err: '',
                success: '',
            })
            notify_success('Successfully removed 2FA')
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    ///////////////////////////////////////
    //*
    //*   Get users
    //*
    ///////////////////////////////////////

    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            const getUsers = async () => {
                let res = await axios.get(`/api/users/getsettingsdata`, {
                    headers: { Authorization: token },
                })
                if (!unmounted) {
                    setData({
                        ...data,
                        webhook_error: res.data.webhook_error_color,
                        webhook_warning: res.data.webhook_warning_color,
                        webhook_success: res.data.webhook_success_color,
                        webhook_url: res.data.webhook_url,
                        webhook_label: res.data.webhook_label,

                        bot_label: res.data.discord_bot_label,
                        bot_color: res.data.discord_bot_color,
                        bot_failed: res.data.discord_bot_failed,
                        bot_timeout: res.data.discord_bot_timeout,
                        bot_success: res.data.discord_bot_success,
                        self_verify: res.data.self_verify,
                        customer_role: res.data.customer_role,
                        bot_activity: res.data.discord_bot_activity,

                        privateKey: res.data.private_key,
                        publicKey: res.data.public_key,
                    })
                    setTimeout(
                        () => (!unmounted ? setLoading(false) : null),
                        250
                    )
                }
            }

            getUsers()
        }
        return () => {
            unmounted = true
        }
    }, [])

    ///////////////////////////////////////
    //*
    //*   Discord OAuth2
    //*
    ///////////////////////////////////////

    const discordAuth = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.get('/api/users/discord/geturl', {
                headers: {
                    Authorization: token,
                },
            })
            const callback_url = res.data.callback_url
            const client_id = res.data.client_id

            window.location.href = `https://discordapp.com/oauth2/authorize?client_id=${client_id}&scope=identify+guilds&response_type=code&callback_uri=${callback_url}`
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    const removeDiscordAuth = async (e) => {
        try {
            e.preventDefault()
            await axios.post(
                '/api/users/discord/remove',
                {
                    password: password,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            setCallback(!callback)
            setData({
                ...data,
                disableDiscordPopUp: false,
                err: '',
                success: '',
            })
            notify_success('Successfully unlinked Discord')
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    ///////////////////////////////////////
    //*
    //*   Image upload
    //*
    ///////////////////////////////////////

    const handleImgSubmit = async (e) => {
        try {
            e.preventDefault()

            if (!image) {
                return notify_error('You must select an image')
            }

            const formdata = new FormData()
            formdata.append('file', image)
            await axios.post('/api/users/upload', formdata, {
                headers: {
                    Authorization: token,
                },
            })
            let randomString = Math.random().toString(36)
            setData({
                ...data,
                resetinput: randomString,
                image: null,
                err: '',
                success: '',
            })
            setCallback(!callback)
            return notify_success('Avatar successfully changed')
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    ///////////////////////////////////////
    //*
    //*   Change password
    //*
    ///////////////////////////////////////

    const changePasswordSubmit = async (e) => {
        e.preventDefault()
        if (isEmpty(new_password1 || new_password2))
            return notify_error('Passwords cannot be empty')
        if (isLength(new_password1 || new_password2))
            return notify_error(
                'New password must be at least 6 characters long'
            )

        if (!isMatch(new_password1, new_password2))
            return notify_error('New passwords did not match')

        try {
            const res = await axios.post(
                '/api/users/changepassword',
                { old_password: old_password, new_password: new_password1 },
                {
                    headers: { Authorization: token },
                }
            )
            //notify('Updated Success!');
            setData({
                ...data,
                new_password1: '',
                new_password2: '',
                old_password: '',
                err: '',
                success: '',
            })
            notify_success(res.data.msg)
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    ///////////////////////////////////////
    //*
    //*   Handle bot submit
    //*
    ///////////////////////////////////////

    const handleBotSubmit = async (e) => {
        e.preventDefault()
        if (bot_label === '' || bot_label.length > 25) {
            return notify_error('Invalid bot label')
        }
        if (bot_activity === '' || bot_activity.length > 120) {
            return notify_error('Invalid bot activity')
        }

        const isHex = /^#[0-9a-f]{3,6}$/i

        if (bot_color === '' || !isHex.test(bot_color)) {
            return notify_error('Invalid hex color for bot embed color')
        }
        try {
            const res = await axios.post(
                '/api/users/updatediscordbot',
                {
                    bot_color: bot_color,
                    bot_failed: bot_failed,
                    bot_success: bot_success,
                    bot_timeout: bot_timeout,
                    bot_label: bot_label,
                    self_verify: self_verify,
                    bot_activity: bot_activity,
                    customer_role: customer_role,
                },
                {
                    headers: { Authorization: token },
                }
            )
            notify_success(res.data.msg)
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    const handleWebhookReset = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                '/api/users/resetwebhookimage',
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            notify_success(res.data.msg)
        } catch (err) {
            return err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    const handleWebhookSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file', webhook_image)

        const isHex = /^#[0-9a-f]{3,6}$/i
        if (
            !isHex.test(webhook_error) ||
            !isHex.test(webhook_success) ||
            !isHex.test(webhook_warning)
        ) {
            return notify_error('Invalid webhook colors')
        }
        if (webhook_label === '' || webhook_label.length > 25) {
            return notify_error('Invalid webhook label')
        }

        const isUrl =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

        if (!isUrl.test(webhook_url)) {
            return notify_error('Invalid webhook url')
        }

        if (webhook_image && webhook_image !== '') {
            await axios.post('/api/users/updatediscordwebhookimg', formdata, {
                headers: {
                    Authorization: token,
                },
            })
        }
        const res = await axios.post(
            '/api/users/updatediscordwebhook',
            {
                webhook_url,
                webhook_label,
                webhook_success,
                webhook_error,
                webhook_warning,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        notify_success(res.data.msg)
    }

    ///////////////////////////////////////
    //*
    //*   Change input
    //*
    ///////////////////////////////////////

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const handleImgChangeInput = (e) => {
        const { name } = e.target
        const file = e.target.files[0]
        setData({ ...data, [name]: file, err: '', success: '' })
    }

    const handleWebhookColorChange = (color, event) => {
        setData({ ...data, [colorMode]: color.hex })
    }

    const handleColorPicker = (mode) => {
        if (colorpicker === mode) {
            setColorpicker('')
        } else {
            setColorpicker(mode)
        }
    }

    ///////////////////////////////////////
    //*
    //*   Popup triggers
    //*
    ///////////////////////////////////////

    const enable2FApopTrigger = (state) => {
        setData({
            ...data,
            enable2FApop: state,
            password: '',
            err: '',
            success: '',
        })
    }
    const disableDiscordPopTrigger = (state) => {
        setData({
            ...data,
            disableDiscordPopUp: state,
            password: '',
            err: '',
            success: '',
        })
    }
    const disable2FApopTrigger = (state) => {
        setData({
            ...data,
            disable2FApop: state,
            password: '',
            err: '',
            success: '',
        })
    }
    const resetApiKeyTrigger = (state) => {
        setData({
            ...data,
            apikey: state,
            password: '',
            err: '',
            success: '',
        })
    }

    return (
        <>
            <HelmetHandler title="Settings - GateWay" />
            <NavbarHeader NavStatus={navState} />
            <VerticalMenu NavStatus={navState} />

            <Popup trigger={enable2FApop} setTrigger={enable2FApopTrigger}>
                <form action="">
                    <TwoFactorContainer>
                        <TwoFactorElement>
                            <TwoFactorImg src={twoFactorUrl} alt="" />
                        </TwoFactorElement>
                        <TwoFactorElement>
                            {err && showErrMsg(err)}
                            <TwoFactorText>
                                Scan the QR-code in 2FA application, input the
                                code and submit to get 2FA activated!
                            </TwoFactorText>
                            <GlobalInput
                                id="token"
                                name="usertoken"
                                placeholder="Code from 2FA application"
                                onChange={handleChangeInput}
                                value={usertoken}
                                type="number"
                            />
                            <SettingsBtn type="submit" onClick={verify2FA}>
                                Submit
                            </SettingsBtn>
                        </TwoFactorElement>
                    </TwoFactorContainer>
                </form>
            </Popup>
            <Popup
                trigger={disableDiscordPopUp}
                setTrigger={disableDiscordPopTrigger}
            >
                <form action="">
                    <TwoFactorContainer>
                        <TwoFactorElement style={{ width: '100%' }}>
                            <TwoFactorText>
                                Password required for unlinking Discord.
                            </TwoFactorText>
                            {err && showErrMsg(err)}
                            <GlobalInput
                                id="password"
                                name="password"
                                placeholder="Your password"
                                onChange={handleChangeInput}
                                value={password}
                                type="password"
                            />
                            <SettingsBtn
                                type="submit"
                                onClick={removeDiscordAuth}
                            >
                                Submit
                            </SettingsBtn>
                        </TwoFactorElement>
                    </TwoFactorContainer>
                </form>
            </Popup>
            <Popup trigger={disable2FApop} setTrigger={disable2FApopTrigger}>
                <form action="">
                    <TwoFactorContainer>
                        <TwoFactorElement style={{ width: '100%' }}>
                            <TwoFactorText>
                                Password required for removing 2FA.
                            </TwoFactorText>
                            {err && showErrMsg(err)}
                            <GlobalInput
                                id="password"
                                name="password"
                                placeholder="Your password"
                                onChange={handleChangeInput}
                                value={password}
                                type="password"
                            />
                            <SettingsBtn type="submit" onClick={remove2FA}>
                                Submit
                            </SettingsBtn>
                        </TwoFactorElement>
                    </TwoFactorContainer>
                </form>
            </Popup>
            <Popup trigger={apikey} setTrigger={resetApiKeyTrigger}>
                <form action="">
                    <TwoFactorContainer>
                        <TwoFactorElement style={{ width: '100%' }}>
                            <TwoFactorText>
                                Password required for API-key change!
                            </TwoFactorText>
                            {err && showErrMsg(err)}
                            <GlobalInput
                                id="password"
                                name="password"
                                placeholder="Your password"
                                onChange={handleChangeInput}
                                value={password}
                                type="password"
                            />
                            <SettingsBtn type="submit" onClick={resetApiKey}>
                                Submit
                            </SettingsBtn>
                        </TwoFactorElement>
                    </TwoFactorContainer>
                </form>
            </Popup>

            <MainWrapper
                style={
                    navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
                }
            >
                <PageTitleContainer>
                    <PageTitleH4>Settings</PageTitleH4>
                    <PageTitleNav>
                        Management <PageTitleSpan>/</PageTitleSpan> Settings
                    </PageTitleNav>
                </PageTitleContainer>
                <SettingsWrapper>
                    <SettingsCol className="col1">
                        <SettingsCardTitle>Profile</SettingsCardTitle>
                        <ProfileContainer>
                            <ProfileImg
                                src={
                                    user.image
                                        ? `/images/${user.image}`
                                        : `/images/default.png`
                                }
                            />
                            <ProfileTextContainer>
                                <ProfileH5>{user.name}</ProfileH5>
                                <ProfileText>{user.email}</ProfileText>
                                <div className="tag-container">
                                    <ProfileTextTag>
                                        {user.role === 0
                                            ? 'Administrator'
                                            : 'Moderator'}
                                    </ProfileTextTag>
                                </div>
                            </ProfileTextContainer>
                        </ProfileContainer>
                    </SettingsCol>
                    <SettingsCol className="col2">
                        <SettingsCardTitle>Change password</SettingsCardTitle>
                        {err && showErrMsg(err)}
                        <SettingsLabel htmlFor="current_password">
                            Current password
                        </SettingsLabel>
                        <GlobalInput
                            id="current_password"
                            type="password"
                            placeholder="Current password"
                            name="old_password"
                            value={old_password}
                            onChange={handleChangeInput}
                        />
                        <SettingsLabel htmlFor="new_password">
                            New password
                        </SettingsLabel>
                        <GlobalInput
                            id="new_password"
                            type="password"
                            placeholder="New password"
                            name="new_password1"
                            value={new_password1}
                            onChange={handleChangeInput}
                        />
                        <SettingsLabel htmlFor="confirm_password">
                            Confirm new password
                        </SettingsLabel>
                        <GlobalInput
                            id="confirm_password"
                            type="password"
                            placeholder="Confirm new password"
                            name="new_password2"
                            value={new_password2}
                            onChange={handleChangeInput}
                        />
                        <SettingsBtn
                            style={{ marginTop: '10px' }}
                            onClick={changePasswordSubmit}
                        >
                            Change password
                        </SettingsBtn>
                    </SettingsCol>
                    <SettingsCol className="col3">
                        <SettingsCardTitle>Change avatar</SettingsCardTitle>
                        {err && showErrMsg(err)}
                        <form action="">
                            <SettingsLabel htmlFor="change_avatar">
                                Change avatar
                            </SettingsLabel>
                            <SettingsInputFile
                                type="file"
                                name="image"
                                onChange={handleImgChangeInput}
                                key={resetinput}
                                accept="image/x-png,image/jpeg"
                                id="change_avatar"
                            />
                            <SettingsBtn
                                style={{ marginTop: '10px' }}
                                onClick={handleImgSubmit}
                            >
                                Change avatar
                            </SettingsBtn>{' '}
                        </form>
                    </SettingsCol>
                    <SettingsCol className="col4">
                        <SettingsCardTitle>Security</SettingsCardTitle>
                        <SettingsCardDesc>
                            Enable 2-factor-authentication and connect your
                            Discord account in order to use Discord bot!
                        </SettingsCardDesc>
                        <ProfileBtnContainer>
                            {user.twofactor ? (
                                <SettingsBtn
                                    style={{
                                        backgroundColor: '#f46a6a',
                                        color: '#f6f6f6',
                                    }}
                                    onClick={() => {
                                        setData({
                                            ...data,
                                            disable2FApop: true,
                                            err: '',
                                            success: '',
                                        })
                                    }}
                                >
                                    Disable 2FA
                                </SettingsBtn>
                            ) : (
                                <SettingsBtn
                                    onClick={() => {
                                        generate2FA()
                                        setData({
                                            ...data,
                                            enable2FApop: true,
                                            err: '',
                                            success: '',
                                        })
                                    }}
                                >
                                    Enable 2FA
                                </SettingsBtn>
                            )}

                            {user.discordid ? (
                                <SettingsBtn
                                    style={{
                                        backgroundColor: '#f46a6a',
                                        color: '#f6f6f6',
                                    }}
                                    onClick={() => {
                                        setData({
                                            ...data,
                                            disableDiscordPopUp: true,
                                            err: '',
                                            success: '',
                                        })
                                    }}
                                >
                                    Unlink Discord
                                </SettingsBtn>
                            ) : (
                                <SettingsBtn
                                    onClick={(e) => {
                                        discordAuth(e)
                                    }}
                                >
                                    Connect Discord
                                </SettingsBtn>
                            )}
                        </ProfileBtnContainer>
                    </SettingsCol>
                    <SettingsCol className="col5">
                        <SettingsCardTitle>API-keys</SettingsCardTitle>
                        <SettingsCardDesc>
                            See your API-keys. Public API-key is used in your
                            products on client-side and private key should
                            always been used only on backend!
                        </SettingsCardDesc>
                        <SettingsLabel htmlFor="public_api">
                            Public API key
                        </SettingsLabel>
                        <SettingsAdvancedGroup>
                            <GlobalInput
                                style={publicKey ? null : { cursor: 'pointer' }}
                                disabled={user.role === 0 ? false : true}
                                id="public_api"
                                value={publicKey || 'Loading...'}
                                type={publicKeyVisibility ? 'text' : 'password'}
                                readOnly
                            />
                            <SmallBtn
                                text={<FiCopy />}
                                color="#32394E"
                                onClick={() => {
                                    navigator.clipboard.writeText(publicKey)
                                    notify_success(
                                        'Public API-key copied to clipboard!'
                                    )
                                }}
                            />
                            <SmallBtn
                                text={<BiReset />}
                                color="#32394E"
                                onClick={() => {
                                    setApikeytype('public_key')

                                    setData({
                                        ...data,
                                        apikey: true,
                                        password: '',
                                        err: '',
                                        success: '',
                                    })
                                }}
                            />
                            <SmallBtn
                                text={<AiOutlineEye />}
                                onClick={() =>
                                    setPublicKeyVisivility(!publicKeyVisibility)
                                }
                            />
                        </SettingsAdvancedGroup>
                        <SettingsLabel htmlFor="private_api">
                            Private API key
                        </SettingsLabel>
                        <SettingsAdvancedGroup>
                            <GlobalInput
                                style={
                                    privateKey ? null : { cursor: 'pointer' }
                                }
                                disabled={user.role === 0 ? false : true}
                                id="private_api"
                                type={
                                    privateKeyVisibility ? 'text' : 'password'
                                }
                                value={privateKey || 'Loading...'}
                                readOnly
                            />
                            <SmallBtn
                                text={<FiCopy />}
                                color="#32394E"
                                onClick={() => {
                                    navigator.clipboard.writeText(privateKey)
                                    notify_success(
                                        'Private API-key copied to clipboard!'
                                    )
                                }}
                            />
                            <SmallBtn
                                text={<BiReset />}
                                color="#32394E"
                                onClick={() => {
                                    setApikeytype('private_key')
                                    setData({
                                        ...data,
                                        apikey: true,
                                        password: '',
                                        err: '',
                                        success: '',
                                    })
                                }}
                            />
                            <SmallBtn
                                color="#556ee6"
                                text={<AiOutlineEye />}
                                onClick={() =>
                                    setPrivateKeyVisivility(
                                        !privateKeyVisibility
                                    )
                                }
                            />
                        </SettingsAdvancedGroup>
                    </SettingsCol>
                    <SettingsCol className="col6">
                        <SettingsCardTitle>Discord webhooks</SettingsCardTitle>
                        <SettingsCardDesc>
                            Discord webhooks provide you data of your licenses
                            directly to your Discord channel. You can customize
                            the look here!
                        </SettingsCardDesc>
                        <SettingsLabel
                            htmlFor="private_api"
                            style={{ display: 'flex', marginTop: '5px' }}
                        >
                            Webhook URL
                        </SettingsLabel>
                        <GlobalInput
                            onChange={handleChangeInput}
                            disabled={user.role === 0 ? false : true}
                            value={webhook_url || ''}
                            name="webhook_url"
                            placeholder="Webhook URL"
                        />
                        <SettingsLabel htmlFor="private_api">
                            Webhook label
                        </SettingsLabel>
                        <GlobalInput
                            onChange={handleChangeInput}
                            disabled={user.role === 0 ? false : true}
                            value={webhook_label || ''}
                            name="webhook_label"
                            placeholder="Webhook label"
                        />
                        <SettingsLabel htmlFor="private_api">
                            Webhook image
                        </SettingsLabel>
                        <SettingsAdvancedGroup>
                            <SettingsInputFile
                                type="file"
                                onChange={handleImgChangeInput}
                                disabled={user.role === 0 ? false : true}
                                key={resetinput}
                                name="webhook_image"
                                accept="image/x-png,image/jpeg"
                                id="webhook_image"
                            />
                            <SmallBtn
                                text={<BiReset />}
                                color="#556ee6"
                                onClick={handleWebhookReset}
                            />
                        </SettingsAdvancedGroup>
                        <SettingsLabel
                            htmlFor="private_api"
                            style={{ display: 'flex' }}
                        >
                            Webhook embed color
                        </SettingsLabel>
                        <ProfileBtnContainer>
                            {' '}
                            <SettingsBtn
                                style={{
                                    backgroundColor: webhook_success,
                                    color: 'white',
                                }}
                                disabled={user.role === 0 ? false : true}
                                onClick={() => {
                                    handleColorPicker('webhook_success')
                                    setColorMode('webhook_success')
                                }}
                            >
                                Success color
                            </SettingsBtn>
                            <SettingsBtn
                                style={{
                                    backgroundColor: webhook_warning,
                                    color: 'white',
                                }}
                                disabled={user.role === 0 ? false : true}
                                onClick={() => {
                                    handleColorPicker('webhook_warning')
                                    setColorMode('webhook_warning')
                                }}
                            >
                                Warning color
                            </SettingsBtn>
                            <SettingsBtn
                                style={{
                                    backgroundColor: webhook_error,
                                    color: 'white',
                                }}
                                disabled={user.role === 0 ? false : true}
                                onClick={() => {
                                    handleColorPicker('webhook_error')
                                    setColorMode('webhook_error')
                                }}
                            >
                                Error color
                            </SettingsBtn>
                        </ProfileBtnContainer>
                        {colorpicker === 'webhook_success' && (
                            <div
                                className="color-picker"
                                style={{
                                    position: 'absolute',
                                    zIndex: '100',
                                    marginTop: '10px',
                                }}
                            >
                                <BlockPicker
                                    name="webhook_success"
                                    color={webhook_success}
                                    onChangeComplete={handleWebhookColorChange}
                                />
                            </div>
                        )}
                        {colorpicker === 'webhook_warning' && (
                            <div
                                className="color-picker"
                                style={{
                                    position: 'absolute',
                                    zIndex: '100',
                                    marginLeft: '115px',
                                    marginTop: '10px',
                                }}
                            >
                                <BlockPicker
                                    name="webhook_warning"
                                    color={webhook_warning}
                                    onChangeComplete={handleWebhookColorChange}
                                />
                            </div>
                        )}
                        {colorpicker === 'webhook_error' && (
                            <div
                                className="color-picker"
                                style={{
                                    position: 'absolute',
                                    zIndex: '100',
                                    marginLeft: '245px',
                                    marginTop: '10px',
                                }}
                            >
                                <BlockPicker
                                    name="webhook_error"
                                    color={webhook_error}
                                    onChangeComplete={handleWebhookColorChange}
                                />
                            </div>
                        )}
                        <SettingsBtn
                            style={{ marginTop: '10px' }}
                            onClick={handleWebhookSubmit}
                            disabled={user.role === 0 ? false : true}
                        >
                            Submit changes
                        </SettingsBtn>
                    </SettingsCol>
                    <SettingsCol className="col7">
                        <SettingsCardTitle>Discord bot</SettingsCardTitle>
                        <SettingsCardDesc>
                            Here you can change Discord bot settings.
                        </SettingsCardDesc>
                        <SettingsLabel htmlFor="private_api">
                            Discord bot label
                        </SettingsLabel>
                        <GlobalInput
                            onChange={handleChangeInput}
                            disabled={user.role === 0 ? false : true}
                            placeholder="Discord bot label"
                            value={bot_label || ''}
                            name="bot_label"
                        />

                        <SettingsLabel htmlFor="private_api">
                            Discord bot activity
                        </SettingsLabel>
                        <GlobalInput
                            onChange={handleChangeInput}
                            disabled={user.role === 0 ? false : true}
                            placeholder="Discord bot activity"
                            name="bot_activity"
                            value={bot_activity || ''}
                        />

                        <SettingsLabel htmlFor="self_verify">
                            Enable self verify
                        </SettingsLabel>
                        <GlobalSelect
                            id="self_verify"
                            disabled={user.role === 0 ? false : true}
                            name="self_verify"
                            onChange={handleChangeInput}
                            value={self_verify}
                        >
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                        </GlobalSelect>

                        {self_verify === 'true' || self_verify === true ? (
                            <>
                                {' '}
                                <SettingsLabel htmlFor="customer_role">
                                    Customer role ID
                                </SettingsLabel>
                                <GlobalInput
                                    onChange={handleChangeInput}
                                    disabled={user.role === 0 ? false : true}
                                    placeholder="Customer role ID"
                                    name="customer_role"
                                    value={customer_role || ''}
                                />
                            </>
                        ) : null}

                        <SettingsLabel
                            htmlFor="private_api"
                            style={{ display: 'flex' }}
                        >
                            Bot embed color
                        </SettingsLabel>
                        <ProfileBtnContainer>
                            {' '}
                            <SettingsBtn
                                style={{
                                    backgroundColor: bot_color,
                                    color: 'white',
                                }}
                                disabled={user.role === 0 ? false : true}
                                onClick={() => {
                                    handleColorPicker('bot_color')
                                    setColorMode('bot_color')
                                }}
                            >
                                Initial color
                            </SettingsBtn>
                            <SettingsBtn
                                style={{
                                    backgroundColor: bot_failed,
                                    color: 'white',
                                }}
                                disabled={user.role === 0 ? false : true}
                                onClick={() => {
                                    handleColorPicker('bot_failed')
                                    setColorMode('bot_failed')
                                }}
                            >
                                Failed color
                            </SettingsBtn>
                            <SettingsBtn
                                style={{
                                    backgroundColor: bot_timeout,
                                    color: 'white',
                                }}
                                disabled={user.role === 0 ? false : true}
                                onClick={() => {
                                    handleColorPicker('bot_timeout')
                                    setColorMode('bot_timeout')
                                }}
                            >
                                Timed out color
                            </SettingsBtn>
                            <SettingsBtn
                                style={{
                                    backgroundColor: bot_success,
                                    color: 'white',
                                }}
                                disabled={user.role === 0 ? false : true}
                                onClick={() => {
                                    handleColorPicker('bot_success')
                                    setColorMode('bot_success')
                                }}
                            >
                                Success color
                            </SettingsBtn>
                        </ProfileBtnContainer>
                        {colorpicker === 'bot_color' && (
                            <div
                                className="color-picker"
                                style={{
                                    position: 'absolute',
                                    zIndex: '100',
                                    marginTop: '10px',
                                }}
                            >
                                <BlockPicker
                                    name="bot_color"
                                    color={bot_color}
                                    onChangeComplete={handleWebhookColorChange}
                                />
                            </div>
                        )}
                        {colorpicker === 'bot_failed' && (
                            <div
                                className="color-picker"
                                style={{
                                    position: 'absolute',
                                    zIndex: '100',
                                    marginLeft: '80px',
                                    marginTop: '10px',
                                }}
                            >
                                <BlockPicker
                                    name="bot_failed"
                                    color={bot_failed}
                                    onChangeComplete={handleWebhookColorChange}
                                />
                            </div>
                        )}
                        {colorpicker === 'bot_timeout' && (
                            <div
                                className="color-picker"
                                style={{
                                    position: 'absolute',
                                    zIndex: '100',
                                    marginLeft: '215px',
                                    marginTop: '10px',
                                }}
                            >
                                <BlockPicker
                                    name="bot_timeout"
                                    color={bot_timeout}
                                    onChangeComplete={handleWebhookColorChange}
                                />
                            </div>
                        )}
                        {colorpicker === 'bot_success' && (
                            <div
                                className="color-picker"
                                style={{
                                    position: 'absolute',
                                    zIndex: '100',
                                    marginLeft: '365px',
                                    marginTop: '10px',
                                }}
                            >
                                <BlockPicker
                                    name="bot_success"
                                    color={bot_success}
                                    onChangeComplete={handleWebhookColorChange}
                                />
                            </div>
                        )}
                        <SettingsBtn
                            style={{ marginTop: '10px' }}
                            onClick={handleBotSubmit}
                            disabled={user.role === 0 ? false : true}
                        >
                            Submit changes
                        </SettingsBtn>
                    </SettingsCol>
                </SettingsWrapper>
                <Footer />
            </MainWrapper>
        </>
    )
}

const SettingsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 12px 12px 24px 12px;
    grid-gap: 24px;
    grid-auto-rows: minmax(120px, auto);
`
const SettingsCol = styled.div`
    background-color: var(--ul-second);
    border-radius: 0.25rem;
    box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    grid-column: 1/6;
    padding: 16px;
`

const SettingsCardTitle = styled.h4`
    font-size: 15px;
    margin: 0 0 7px;
    font-weight: 600;
    color: #f6f6f6;
`
const SettingsCardDesc = styled.p`
    color: #a6b0cf;
    margin-bottom: 24px;
    font-size: 0.8125rem;
    font-weight: 400;
`

const SettingsBtn = styled.button`
    background-color: #556ee6;
    outline: none;
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #a6b0cf;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.47rem 0.75rem;
    font-size: 0.9125rem;
    border-radius: 0.25rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

const TwoFactorContainer = styled.div`
    display: flex;
    padding: 12px;
    align-items: center;
    gap: 20px;
    @media screen and (max-width: 1200px) {
        flex-direction: column;
    }
`
const TwoFactorText = styled.p`
    color: #a6b0cf;
    font-weight: 400;
    font-size: 0.8125rem;
    margin-bottom: 5px;
`
const TwoFactorElement = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 1200px) {
        width: 100%;
        align-items: center;
    }
`

const TwoFactorImg = styled.img`
    height: 250px;
    background-color: #c3cbe4;
    border-radius: 0.25rem;
    @media screen and (max-width: 1200px) {
        height: 200px;
        width: 200px;
    }
`

const SettingsInputFile = styled.input`
    margin-top: 5px;
    margin-bottom: 5px;
    display: block;
    width: 100%;
    outline: none;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    color: #bfc8e2;
    background-color: #2e3446;
    background-clip: padding-box;
    border: 1px solid #32394e;
    appearance: none;
    padding: 0.47rem 0.75rem;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    ::-webkit-file-upload-button {
        background: #32394e;
        outline: none;
        border: none;
        color: #a6b0cf;
        cursor: pointer;
        height: 100%;
        margin-right: 10px;
    }
    ::-ms-browse {
        background: #32394e;
        outline: none;
        border: none;
        color: #a6b0cf;
        cursor: pointer;
        height: 100%;
        margin-right: 10px;
    }
`
const SettingsLabel = styled.label`
    color: #a6b0cf;
    font-weight: 500;
    font-size: 0.8125rem;
    width: 200px;
    @media screen and (max-width: 1200px) {
        width: auto;
    }
`

const SettingsAdvancedGroup = styled.div`
    display: flex;
    width: 100%;
`

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`
const ProfileImg = styled.img`
    border-radius: 50%;
    padding: 3px;
    background-color: #32394e;
    height: 72px;
`
const ProfileTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ProfileH5 = styled.h5`
    color: #f6f6f6;
    font-size: 1.01562rem;
    font-weight: 500;
`
const ProfileText = styled.p`
    font-size: 0.8125rem;
    font-weight: 400;
    color: #a6b0cf;
`
const ProfileTextTag = styled.p`
    color: #556ee6;
    background-color: rgba(85, 110, 230, 0.18);
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 11px;
    border-radius: 0.25rem;
`

const ProfileBtnContainer = styled.div`
    display: flex;
    gap: 10px;
`

export default Settings
