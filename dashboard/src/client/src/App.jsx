import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Blacklist from './components/pages/blacklist/Blacklist';
import Console from './components/pages/console/Console';
import CreateLicense from './components/pages/createlicense/CreateLicense';

/* Import pages */
import Landing from './components/pages/landing/Landing';
import Login from './components/pages/login/Login';
import Products from './components/pages/products/Products';
import Settings from './components/pages/settings/Settings';
import Users from './components/pages/users/Users';

/* Auth actions */
import {
	dispatchGetUser,
	dispatchLogin,
	fetchUser,
} from './redux/actions/authAction';

/* NavState */
import NavState from './utils/NavState';
import PrivateRoute from './router/PrivateRoute';
import OAuth2 from './components/pages/authentication/OAuth2';

// Toast notifications
import { ToastContainer } from 'react-toastify';
import './components/global/Notifications.css';
import Licenses from './components/pages/licenses/Licenses';
import RedirectHandler from './router/RedirectHandler';

/* Global styling */
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Poppins",sans-serif;
  }



  :root {
    --ul-main: #222736;
    --ul-second: #2A3042;
    --ul-third: #262B3C;
    --ul-purple: #a6b0cf;
    --ul-highlight-main: #556EE6;
    --ul-highlight-second: #34406B;
  }


  body {
    background-color: var(--ul-main);
  }

  input:focus {
	border: 1px solid #3e465c;
	transition: border 0.5s;
  }
  /* Hide arrows from number inputs */
    /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  	/* Change Autocomplete styles in Chrome*/
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	textarea:-webkit-autofill,
	textarea:-webkit-autofill:hover,
	textarea:-webkit-autofill:focus,
	select:-webkit-autofill,
	select:-webkit-autofill:hover,
	select:-webkit-autofill:focus {
	-webkit-text-fill-color: #bfc8e2;
	-webkit-box-shadow: 0 0 0px 1000px #2E3446 inset;
	transition: background-color 5000s ease-in-out 0s;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #262B3C; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #556ee6; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
`;

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);

	// Axios interceptor
	// Add a response interceptor
	axios.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		async function (error) {
			const isUnAuthorizedError = (error) => {
				return (
					error.response &&
					error.config.retries &&
					error.response.status === 400 &&
					error.response.data.msg === 'Invalid Authentication.'
				);
			};

			const isNonexistingUser = (error) => {
				return (
					error.response &&
					error.config.retries &&
					error.response.status === 400 &&
					error.response.data.msg === 'Invalid user.'
				);
			};

			const updateAccessToken = async () => {
				try {
					const res = await axios.post(
						'/api/users/refresh_token',
						null
					);
					error.config.headers.Authorization = res.data.access_token;
					dispatch({
						type: 'GET_TOKEN',
						payload: res.data.access_token,
					});
				} catch (error) {
					localStorage.removeItem('firstLogin');
					window.location.href = '/';
				}
			};
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			error.config.retries = error.config.retries || {
				count: 0,
			};

			if (isUnAuthorizedError(error) && error.config.retries.count < 3) {
				await updateAccessToken(); // refresh the access token
				error.config.retries.count += 1;

				return axios(error.config); // if succeed re-fetch the original request with the updated accessToken
			}
			if (isNonexistingUser(error)) {
				try {
					await axios.get('/api/users/logout');
					localStorage.removeItem('firstLogin');
					window.location.href = '/';
				} catch (err) {
					window.location.href = '/';
				}
			}
			return Promise.reject(error);
		}
	);

	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin');
		if (firstLogin) {
			const getToken = async () => {
				try {
					const res = await axios.post(
						'/api/users/refresh_token',
						null
					);
					dispatch({
						type: 'GET_TOKEN',
						payload: res.data.access_token,
					});
				} catch (error) {
					localStorage.removeItem('firstLogin');
					window.location.href = '/';
				}
			};
			getToken();
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchLogin());

				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	const { isLogged, loading } = auth;

	return (
		<>
			<Router>
				<NavState>
					<ToastContainer />
					<Switch>
						<Route
							exact
							path="/"
							component={
								isLogged && !loading ? RedirectHandler : Login
							}
						/>
						<PrivateRoute
							exact
							path="/dashboard"
							component={Landing}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/licenses"
							component={Licenses}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/add-new"
							component={CreateLicense}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/products"
							component={Products}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/blacklist"
							component={Blacklist}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/users"
							component={Users}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/settings"
							component={Settings}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/console"
							component={Console}
							isLogged={isLogged}
							loading={loading}
						/>
						<PrivateRoute
							exact
							path="/discord/oauth"
							component={OAuth2}
							isLogged={isLogged}
							loading={loading}
						/>
						<Route render={() => <Redirect to="/" />} />
					</Switch>
				</NavState>
			</Router>
			<GlobalStyle />
		</>
	);
}

export default App;
