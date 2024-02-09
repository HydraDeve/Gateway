import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import DataProvider from './redux/store'
import TimeAgo from 'javascript-time-ago'
import { createTheme, ThemeProvider } from '@material-ui/core'

import en from 'javascript-time-ago/locale/en'
import { HelmetProvider } from 'react-helmet-async'

TimeAgo.addDefaultLocale(en)

const theme = createTheme({
    palette: {
        primary: {
            main: '#556ee6', // This is an orange looking color
        },
    },
})

const helmetContext = {}

ReactDOM.render(
    <HelmetProvider context={helmetContext}>
        <DataProvider>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </DataProvider>
    </HelmetProvider>,
    document.getElementById('root')
)
