import axios from 'axios';
import React, { useState } from 'react';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { dispatchLogin } from '../../../redux/actions/authAction';
import { showErrMsg } from '../../../utils/ErrorHandler';
import HelmetHandler from '../../../utils/HelmetHandler';
import Popup from '../../../utils/Popup';
import { isLength } from '../../../utils/validation';

/* Initial state */
const initialState = {
	email: '',
	password: '',
	twofactor: '',
	err: '',
	success: '',
};

function Login() {
	const [user, setUser] = useState(initialState);
	const dispatch = useDispatch();
	const history = useHistory();

	const [popup, setPopup] = useState(false);

	const { email, password, twofactor, err, success } = user;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value, err: '', success: '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLength(password)) {
			return setUser({
				...user,
				err: 'Invalid credentials',
				success: '',
			});
		}
		try {
			const res = await axios.post('/api/users/login', {
				email,
				password,
				twofactor,
			});
			setUser({ ...user, err: '', success: res.data.msg });
			localStorage.setItem('firstLogin', true);
			dispatch(dispatchLogin());
			return <Redirect to="/dashboard" />;
		} catch (err) {
			if (err?.response?.status === 401) {
				setPopup(true);
			}

			err.response.data.msg &&
				setUser({ ...user, err: 'Login failed', success: '' });
		}
	};
	return (
		<>
			<HelmetHandler title="Login - GateWay" />
			<Popup trigger={popup} type={'full'} setTrigger={setPopup}>
				<TwoFactorWrapper>
					<LoginForm onSubmit={handleSubmit}>
						<LoginLogoSpan>
							<RiShieldKeyholeLine />
						</LoginLogoSpan>
						<TwoFactorH4>2FA Required</TwoFactorH4>
						<LoginFormLabel>
							Enter the 6 digit code from your authentication
							application!
						</LoginFormLabel>
						<TwoFactorErrContainer>
							{err && showErrMsg(err)}
						</TwoFactorErrContainer>
						<LoginFormInput
							style={{ maxWidth: '400px', marginBottom: '.5rem' }}
							placeholder="6 digits code"
							type="number"
							id="twofactor"
							required
							name="twofactor"
							value={twofactor}
							onChange={handleChangeInput}
						/>
						<LoginFormSubmitBtn
							style={{ maxWidth: '400px' }}
							type="submit"
						>
							Submit
						</LoginFormSubmitBtn>
					</LoginForm>
				</TwoFactorWrapper>
			</Popup>
			<LoginWrapper>
				<LoginContainer>
					<LoginTop>
						<LoginTopTextContainer>
							<LoginTopH5>Welcome to GateWay!</LoginTopH5>
							<LoginTopText>Login to continue</LoginTopText>
						</LoginTopTextContainer>
					</LoginTop>
					<LoginBottom>
						<LoginLogoContainer>
							<LoginLogoSpan>
								<RiShieldKeyholeLine />
							</LoginLogoSpan>
						</LoginLogoContainer>
						{popup ? null : err && showErrMsg(err)}
						<LoginForm onSubmit={handleSubmit}>
							<LoginFormElement>
								<LoginFormLabel>Email</LoginFormLabel>
								<LoginFormInput
									placeholder="Enter email"
									type="email"
									id="email"
									required
									name="email"
									value={email}
									onChange={handleChangeInput}
								/>
							</LoginFormElement>
							<LoginFormElement>
								<LoginFormLabel>Password</LoginFormLabel>
								<LoginFormInput
									placeholder="Enter password"
									type="password"
									id="password"
									required
									name="password"
									value={password}
									onChange={handleChangeInput}
								/>
							</LoginFormElement>
							<LoginFormElement
								style={{ display: 'flex', gap: '10px' }}
							>
								<LoginFormCheckbox
									type="checkbox"
									id="checkbox"
								/>
								<LoginFormLabel htmlFor="checkbox">
									Remember me
								</LoginFormLabel>
							</LoginFormElement>
							<LoginFormSubmitBtn type="submit">
								Log in
							</LoginFormSubmitBtn>
						</LoginForm>
					</LoginBottom>
					<LoginBottomText>&copy; 2023 GateWay</LoginBottomText>
				</LoginContainer>
			</LoginWrapper>
		</>
	);
}

const LoginWrapper = styled.div`
	padding-top: 6rem;
`;

const LoginContainer = styled.div`
	width: 95%;
	max-width: 475px;
	margin: auto;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
`;

const LoginTop = styled.div`
	display: flex;
	background-color: #34406b;
	border-radius: 0.25rem 0.25rem 0 0;
	padding-bottom: 20px;
`;

const LoginTopTextContainer = styled.div`
	width: 60%;
	padding: 25px;
`;

const LoginTopH5 = styled.h5`
	color: #556ee6;
	font-size: 1.01562rem;
	margin-bottom: 0.5rem;
	font-weight: 500;
`;
const LoginTopText = styled.p`
	color: #556ee6;
	font-size: 0.8125rem;
	font-weight: 400;
`;

const LoginBottom = styled.div`
	background-color: #2a3042;
	padding: 0 25px 25px 25px;
	border-radius: 0 0 0.25rem 0.25rem;
`;

const LoginLogoContainer = styled.div`
	display: flex;
	margin-bottom: 30px;
`;

const LoginLogoSpan = styled.span`
	border-radius: 50%;
	margin-top: -30px;
	background-color: #32394e;
	width: 72px;
	height: 72px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 35px;
	color: #f6f6f6;
`;

const LoginForm = styled.form``;

const LoginFormElement = styled.div`
	margin-bottom: 1rem;
`;
const LoginFormLabel = styled.label`
	font-weight: 500;
	margin-bottom: 0.5rem;
	color: #a6b0cf;
	font-size: 0.8125rem;
`;
const LoginFormInput = styled.input`
	display: block;
	width: 100%;
	outline: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	appearance: none;
	border-radius: 0.25rem;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const LoginFormSubmitBtn = styled.button`
	color: #fff;
	width: 100%;
	background-color: #556ee6;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: #a6b0cf;
	outline: none;
	text-align: center;
	border: none;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	margin-bottom: 30px;
`;

const LoginFormCheckbox = styled.input`
	width: 1em;
	height: 1em;
	margin-top: 0.25em;
	vertical-align: top;
	background-color: #32394e;
	background-repeat: no-repeat;
	background-position: 50%;
	background-size: contain;
	border: 1px solid #a6b0cf;
	outline: none;
	border-radius: 0.25em;
	appearance: none;
	transition: background-color 0.15s ease-in-out,
		background-position 0.15s ease-in-out, border-color 0.15s ease-in-out,
		box-shadow 0.15s ease-in-out;
	&:checked {
		appearance: auto;
	}
`;

const LoginBottomText = styled.p`
	font-size: 0.8125rem;
	font-weight: 400;
	color: #a6b0cf;
	text-align: center;
	margin-top: 20px;
`;

// 2FA
const TwoFactorWrapper = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`;

const TwoFactorH4 = styled.div`
	color: #f6f6f6;
	font-size: 1.21875rem;
	font-weight: 500;
	margin-top: 1rem;
	margin-bottom: 0.5rem;
`;

const TwoFactorErrContainer = styled.div`
	max-width: 400px;
	width: 100%;
`;

export default Login;
