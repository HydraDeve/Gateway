import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function OAuth2() {
    const token = useSelector((state) => state.token)

    const handleRedirect = () => {
        window.location.href = '/settings'
    }

    useEffect(() => {
        let unmounted = false
        const query = new URLSearchParams(window.location.search)
        const code = query.get('code')
        async function verifyAuth() {
            try {
                const res = await axios.post(
                    '/api/users/discord/oauth',
                    {
                        code: code,
                    },
                    {
                        headers: { Authorization: token },
                    }
                )
                handleRedirect()
            } catch (error) {
                console.log(error)
                return handleRedirect()
            }
        }
        verifyAuth()
        return () => {
            unmounted = true
        }
    }, [])

    return (
        <div>
            <p style={{ color: 'white', padding: '10px' }}>Redirecting...</p>
        </div>
    )
}

export default OAuth2
