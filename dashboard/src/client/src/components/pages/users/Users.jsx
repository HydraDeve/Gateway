import { Skeleton } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ImBin, ImClipboard, ImPencil } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import ReactTimeAgo from 'react-time-ago';
import styled from 'styled-components';
import HelmetHandler from '../../../utils/HelmetHandler';
import { Context } from '../../../utils/NavState';
import { notify_error, notify_success } from '../../../utils/Notifications';
import { isEmail, isLength } from '../../../utils/validation';
import Footer from '../../global/Footer';
import '../../global/List-animation.css';
import NavbarHeader from '../../global/NavbarHeader';
import VerticalMenu from '../../global/VerticalMenu';
import {
	MainWrapper,
	PageTitleContainer,
	PageTitleH4,
	PageTitleNav,
	PageTitleSpan,
} from '../../styles/GlobalStyles';

const initialState = {
	name: '',
	email: '',
	password1: '',
	password2: '',
	permission: 'z',
};

function Users() {
	const [navState] = useContext(Context);

	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	const [loading, setLoading] = useState(true);
	const skeletonamount = 5;

	const [users, setUsers] = useState();
	const [callback, setCallback] = useState(false);

	const [data, setData] = useState(initialState);
	const [editing, setEditing] = useState();

	const { name, email, password1, password2, permission } = data;

	///////////////////////////////////////
	//*
	//*   Animations
	//*
	///////////////////////////////////////

	const fadeElement = useSpring({
		config: { ...config.stiff },
		from: { opacity: 0 },
		to: {
			opacity: loading ? 0 : 1,
		},
	});
	const fadeLoader = useSpring({
		config: { ...config.stiff },
		from: { opacity: 0 },
		to: {
			opacity: loading ? 1 : 0,
		},
	});

	///////////////////////////////////////
	//*
	//*   Handle change
	//*
	///////////////////////////////////////

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value, err: '', success: '' });
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditing({ ...editing, [name]: value });
	};

	///////////////////////////////////////
	//*
	//*   Handle submit
	//*
	///////////////////////////////////////

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (name === '' || email === '' || password1 === '' || password2 === '')
			return notify_error('You must fill all fields');
		if (password1 !== password2) {
			return notify_error('Passwords did not match');
		}
		if (permission === 'z') {
			return notify_error('You must choose permission level');
		}
		if (isLength(password1)) {
			return notify_error('Password is too short');
		}
		if (!isEmail(email)) {
			return notify_error('Email is not valid');
		}

		try {
			const res = await axios.post(
				'/api/users/createuser',
				{ data, created_by: user.name },
				{
					headers: { Authorization: token },
				}
			);
			//setData(initialState);
			setCallback(!callback);
			setEditing(null);
			notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		if (
			editing.name === '' ||
			editing.email === '' ||
			editing.permission === ''
		)
			return notify_error('Edited fields cannot be empty');
		if (!isEmail(editing.email)) {
			return notify_error('Invalid email');
		}

		if (user._id === editing._id && user.role !== parseInt(editing.role)) {
			return notify_error('You cannot modify your own permission level');
		}

		try {
			const res = await axios.post(
				'/api/users/updateuser',
				{ editing },
				{
					headers: { Authorization: token },
				}
			);
			setEditing(null);
			setCallback(!callback);
			notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	///////////////////////////////////////
	//*
	//*   Handle delete
	//*
	///////////////////////////////////////

	const handleDelete = async (delete_user) => {
		if (user.role !== 0) return;
		if (delete_user._id === user._id) {
			return notify_error('You cannot delete your own account!');
		}
		try {
			const res = await axios.post(
				`/api/users/deleteuser`,
				{
					user: delete_user,
				},
				{
					headers: { Authorization: token },
				}
			);
			setCallback(!callback);
			return notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	///////////////////////////////////////
	//*
	//*   Handle edit
	//*
	///////////////////////////////////////

	const handleEdit = async (userdata) => {
		if (user.role !== 0) return;
		if (editing) {
			return setEditing(null);
		} else {
			setEditing(userdata);
		}
	};

	///////////////////////////////////////
	//*
	//*   Get users
	//*
	///////////////////////////////////////

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			const getUsers = async () => {
				let res = await axios.get(`/api/users/getusers`, {
					headers: { Authorization: token },
				});
				if (!unmounted) {
					setUsers(res.data.users);
					setTimeout(
						() => (!unmounted ? setLoading(false) : null),
						250
					);
				}
			};
			getUsers();
		}
		return () => {
			unmounted = true;
		};
	}, [callback]);

	///////////////////////////////////////
	//*
	//*   Pagination
	//*
	///////////////////////////////////////

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	const handlePageChange = async (event, page) => {
		event.preventDefault();
		setCurrentPage(page);
	};

	const renderUsersFull = () => {
		if (!users) {
			return null;
		}
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOFirstPost = indexOfLastPost - postsPerPage;
		const currentPosts = users.slice(indexOFirstPost, indexOfLastPost);

		return currentPosts.map((userdata) => (
			<div className="keygroup" key={userdata._id}>
				{editing?._id === userdata._id ? (
					<UsersListElement>
						<UsersListTextSmall>
							<UserListImg
								src={
									userdata.image
										? `/images/${userdata.image}`
										: `/images/default.png`
								}
							/>
						</UsersListTextSmall>

						<EditingContainer style={{ width: '10%' }}>
							<EditingInput
								name="name"
								value={editing.name}
								onChange={handleEditChange}
							/>
						</EditingContainer>
						<EditingContainer>
							<EditingInput
								name="email"
								value={editing.email}
								onChange={handleEditChange}
							/>
						</EditingContainer>
						<EditingContainer>
							<UsersSelect
								className="editing-select"
								value={editing.role}
								onChange={handleEditChange}
								name="role"
							>
								<option value="0">Administrator</option>
								<option value="1">Moderator</option>
							</UsersSelect>
						</EditingContainer>

						{userdata.lastlogin ? (
							<UsersListText>
								{' '}
								<ReactTimeAgo
									date={Date.parse(userdata.lastlogin)}
									locale="en-US"
								/>
							</UsersListText>
						) : (
							<UsersListText>None</UsersListText>
						)}

						<UsersListText>{userdata.licenses_added}</UsersListText>
						<UsersListBtnContainer>
							<ImPencil onClick={() => handleEdit(userdata)} />
							<ImBin onClick={() => handleDelete(userdata)} />
							<ImClipboard onClick={handleEditSubmit} />
						</UsersListBtnContainer>
					</UsersListElement>
				) : (
					<UsersListElement>
						<UsersListTextSmall>
							<UserListImg
								src={
									userdata.image
										? `/images/${userdata.image}`
										: `/images/default.png`
								}
							/>
						</UsersListTextSmall>

						<UsersListTextName style={{ width: '10%' }}>
							{userdata.name}
						</UsersListTextName>
						<UsersListText>{userdata.email}</UsersListText>
						<UsersListTagContainer>
							<UsersListTextTag>
								{userdata.role === 0
									? 'Administrator'
									: 'Moderator'}
							</UsersListTextTag>
						</UsersListTagContainer>

						{userdata.lastlogin ? (
							<UsersListText>
								{' '}
								<ReactTimeAgo
									date={Date.parse(userdata.lastlogin)}
									locale="en-US"
								/>
							</UsersListText>
						) : (
							<UsersListText>None</UsersListText>
						)}

						<UsersListText>{userdata.licenses_added}</UsersListText>
						<UsersListBtnContainer>
							<ImPencil
								style={
									user.role === 0
										? { cursor: 'pointer' }
										: { cursor: 'not-allowed' }
								}
								onClick={() => handleEdit(userdata)}
							/>
							<ImBin
								style={
									user.role === 0
										? { cursor: 'pointer' }
										: { cursor: 'not-allowed' }
								}
								onClick={() => handleDelete(userdata)}
							/>
						</UsersListBtnContainer>
					</UsersListElement>
				)}
			</div>
		));
	};

	const renderUsersMobile = () => {
		if (!users) {
			return null;
		}
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOFirstPost = indexOfLastPost - postsPerPage;
		const currentPosts = users.slice(indexOFirstPost, indexOfLastPost);

		return currentPosts.map((userdata) => (
			<div className="keygroup" key={`${userdata._id}-mobile`}>
				{editing?._id === userdata._id ? (
					<>
						{' '}
						<UsersListElement
							style={{ background: 'rgb(50, 57, 78)' }}
						>
							<EditingInput
								name="name"
								value={editing.name}
								onChange={handleEditChange}
							/>
						</UsersListElement>
						<UsersListElementEditing>
							<UsersListTextMobile>Email</UsersListTextMobile>
							<EditingInput
								name="email"
								value={editing.email}
								onChange={handleEditChange}
							/>
						</UsersListElementEditing>
						<UsersListElementEditing>
							<UsersListTextMobile>
								Permission
							</UsersListTextMobile>
							<UsersSelect
								className="editing-select"
								value={editing.role}
								onChange={handleEditChange}
								name="role"
							>
								<option value="0">Administrator</option>
								<option value="1">Moderator</option>
							</UsersSelect>
						</UsersListElementEditing>
						<UsersListElement>
							<UsersListTextMobile>
								Added licenses
							</UsersListTextMobile>
							<UsersListTextMobile>
								{userdata.licenses_added}
							</UsersListTextMobile>
						</UsersListElement>
						<UsersListElement>
							<UsersListTextMobile>
								Last login
							</UsersListTextMobile>

							{userdata.lastlogin ? (
								<UsersListTextMobile>
									{' '}
									<ReactTimeAgo
										date={Date.parse(userdata.lastlogin)}
										locale="en-US"
									/>
								</UsersListTextMobile>
							) : (
								<UsersListText>None</UsersListText>
							)}
						</UsersListElement>
						<UsersListElement>
							<UsersListTextMobile>Manage</UsersListTextMobile>
							<UsersListBtnContainer>
								<ImPencil
									onClick={() => handleEdit(userdata)}
								/>
								<ImBin onClick={() => handleDelete(userdata)} />
								<ImClipboard onClick={handleEditSubmit} />
							</UsersListBtnContainer>
						</UsersListElement>
					</>
				) : (
					<>
						{' '}
						<UsersListElement
							style={{ background: 'rgb(50, 57, 78)' }}
						>
							<UsersListTextMobile>
								{userdata.name}
							</UsersListTextMobile>
						</UsersListElement>
						<UsersListElement>
							<UsersListTextMobile>Email</UsersListTextMobile>
							<UsersListTextMobile>
								{userdata.email}
							</UsersListTextMobile>
						</UsersListElement>
						<UsersListElement>
							<UsersListTextMobile>
								{userdata.role === 0
									? 'Administrator'
									: 'Moderator'}
							</UsersListTextMobile>
							<UsersListTextTag>
								{' '}
								{userdata.role === 0
									? 'Administrator'
									: 'Moderator'}
							</UsersListTextTag>
						</UsersListElement>
						<UsersListElement>
							<UsersListTextMobile>
								Added licenses
							</UsersListTextMobile>
							<UsersListTextMobile>
								{userdata.licenses_added}
							</UsersListTextMobile>
						</UsersListElement>
						<UsersListElement>
							<UsersListTextMobile>
								Last login
							</UsersListTextMobile>

							{userdata.lastlogin ? (
								<UsersListTextMobile>
									{' '}
									<ReactTimeAgo
										date={Date.parse(userdata.lastlogin)}
										locale="en-US"
									/>
								</UsersListTextMobile>
							) : (
								<UsersListText>None</UsersListText>
							)}
						</UsersListElement>
						<UsersListElement>
							<UsersListTextMobile>Manage</UsersListTextMobile>
							<UsersListBtnContainer>
								<ImPencil
									style={
										user.role === 0
											? { cursor: 'pointer' }
											: { cursor: 'not-allowed' }
									}
									onClick={() => handleEdit(userdata)}
								/>
								<ImBin
									style={
										user.role === 0
											? { cursor: 'pointer' }
											: { cursor: 'not-allowed' }
									}
									onClick={() => handleDelete(userdata)}
								/>
							</UsersListBtnContainer>
						</UsersListElement>
					</>
				)}
			</div>
		));
	};

	return (
		<>
			<HelmetHandler title="Users - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<MainWrapper
				style={
					navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
				}
			>
				<PageTitleContainer>
					<PageTitleH4>Users</PageTitleH4>
					<PageTitleNav>
						Management <PageTitleSpan>/</PageTitleSpan> Users
					</PageTitleNav>
				</PageTitleContainer>
				<UsersWrapper>
					<UsersCol className="col1">
						<UsersCardTitle>Add new user</UsersCardTitle>
						<UsersCardDesc>
							Here you can add new subuser! Administrator can do
							anything. Moderator can do anything expect
							add/manage users.
						</UsersCardDesc>
						<UsersInputWrapper>
							<UsersInput
								disabled={user.role === 0 ? false : true}
								placeholder="Name"
								name="name"
								onChange={handleChangeInput}
								value={name}
							/>
							<UsersInput
								disabled={user.role === 0 ? false : true}
								placeholder="Email"
								name="email"
								onChange={handleChangeInput}
								value={email}
								type="email"
							/>
							<UsersInput
								disabled={user.role === 0 ? false : true}
								placeholder="Password"
								name="password1"
								onChange={handleChangeInput}
								value={password1}
								type="password"
							/>
							<UsersInput
								disabled={user.role === 0 ? false : true}
								placeholder="Password confirm"
								name="password2"
								type="password"
								onChange={handleChangeInput}
								value={password2}
							/>
							<UsersSelect
								disabled={user.role === 0 ? false : true}
								value={permission}
								onChange={handleChangeInput}
								name="permission"
							>
								<option value="z">Permissions...</option>
								<option value="0">Administrator</option>
								<option value="1">Moderator</option>
							</UsersSelect>
							<UsersBtn
								disabled={user.role === 0 ? false : true}
								onClick={handleSubmit}
							>
								Add
							</UsersBtn>
						</UsersInputWrapper>
					</UsersCol>
					<UsersCol className="col2">
						<UsersCardTitle>Users</UsersCardTitle>
						<UsersCardDesc>
							Here are your current users.
						</UsersCardDesc>
						<UsersListWrapper className="Users-desktop">
							<UsersListElement
								style={{
									backgroundColor: '#32394e',
									fontWeight: '600',
								}}
							>
								<UsersListTextSmall>#</UsersListTextSmall>
								<UsersListText style={{ width: '10%' }}>
									Name
								</UsersListText>
								<UsersListText>Email</UsersListText>
								<UsersListText>Permissions</UsersListText>
								<UsersListText>Last login</UsersListText>
								<UsersListText>Added licenses</UsersListText>
								<UsersListText>Manage</UsersListText>
							</UsersListElement>

							{loading ? (
								<>
									<animated.div style={fadeLoader}>
										{[...Array(skeletonamount)].map(
											(elementInArray, index) => (
												<UsersListElement key={index}>
													<UsersListTextSmall>
														<Skeleton
															animation="wave"
															variant="circle"
															width={'40px'}
															height={'40px'}
														/>
													</UsersListTextSmall>
													<UsersListText
														style={{ width: '10%' }}
													>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
												</UsersListElement>
											)
										)}
									</animated.div>
								</>
							) : (
								<animated.div style={fadeElement}>
									{renderUsersFull()}
								</animated.div>
							)}
						</UsersListWrapper>

						<UsersListWrapper className="Users-mobile">
							{renderUsersMobile()}
						</UsersListWrapper>
						<PaginationContainer>
							{users ? (
								<Pagination
									count={Math.ceil(users.length / 5)}
									onChange={handlePageChange}
									page={currentPage}
									color="primary"
								/>
							) : null}
						</PaginationContainer>
					</UsersCol>
				</UsersWrapper>
				<Footer />
			</MainWrapper>
		</>
	);
}

const UsersWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col2 {
		min-height: calc(100vh - 400px);
	}

	.MuiPaginationItem-root {
		color: #a6b0cf;
	}

	/* Disabled inputs */
	input:disabled,
	select:disabled {
		background-color: #2d3245;
		color: #8f96af;
		&:hover {
			cursor: not-allowed;
		}
	}
	button:disabled {
		cursor: not-allowed;
	}
`;
const UsersCol = styled.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
	overflow-x: hidden;

	.editing-select {
		width: 90%;
		@media screen and (max-width: 996px) {
			width: 100%;
		}
	}

	.Users-desktop {
		height: calc(100% - 130px);
	}

	.Users-mobile {
		display: none;
	}
	@media screen and (max-width: 996px) {
		.Users-desktop {
			display: none;
		}
		.Users-mobile {
			display: flex;
		}
	}
`;

const PaginationContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding-top: 20px;
`;

const UsersCardTitle = styled.h4`
	font-size: 15px;
	margin: 0 0 7px;
	font-weight: 600;
	color: #f6f6f6;
`;
const UsersCardDesc = styled.p`
	color: #a6b0cf;
	margin-bottom: 24px;
	font-size: 0.8125rem;
	font-weight: 400;
`;

const EditingInput = styled.input`
	display: block;
	outline: none;
	width: 90%;
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
	@media screen and (max-width: 996px) {
		width: 100%;
	}
`;

const EditingContainer = styled.div`
	width: 17%;
`;

const UsersInput = styled.input`
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

const UserListImg = styled.img`
	border-radius: 50%;
	padding: 3px;
	background-color: #32394e;
	height: 40px;
`;

const UsersSelect = styled.select`
	display: block;
	width: 100%;
	padding: 0.47rem 1.75rem 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	background-color: #2e3446;
	background-image: url('https://cdn.discordapp.com/attachments/729088611986702508/827255111528087573/nigga.svg');
	background-repeat: no-repeat;
	outline: none;
	background-position: right 0.75rem center;
	background-size: 16px 12px;
	border: 1px solid #32394e;
	border-radius: 0.25rem;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
`;

const UsersBtn = styled.button`
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
`;

const UsersInputWrapper = styled.div`
	display: flex;
	width: 100%;
	max-width: 1310px;
	gap: 20px;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`;
const UsersListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
`;

const UsersListElement = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`;

const UsersListElementEditing = styled.div`
	display: flex;
	align-items: left;
	flex-direction: column;
	gap: 5px;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`;

const UsersListTextMobile = styled.p`
	color: #a6b0cf;
`;

const UsersListText = styled.p`
	color: #a6b0cf;
	word-wrap: break-word;
	width: 17%;
`;
const UsersListTextSmall = styled.div`
	display: flex;
	align-items: center;
	width: 5%;
	color: #a6b0cf;
`;

const UsersListTagContainer = styled.div`
	width: 17%;
`;
const UsersListTextTag = styled.p`
	color: #556ee6;
	background-color: rgba(85, 110, 230, 0.18);
	display: inline-block;
	padding: 0.25em 0.4em;
	font-size: 11px;
	border-radius: 0.25rem;
`;
const UsersListTextName = styled.h4`
	color: #eff2f7;
	font-size: 14px;
	width: 17%;
	font-weight: 500;
`;

const UsersListBtnContainer = styled.div`
	display: flex;
	gap: 20px;
	color: #34c38f;
	font-size: 16px;
	cursor: pointer;
	svg:nth-child(2) {
		color: #f46a6a;
	}
	svg:nth-child(3) {
		color: #556ee6;
	}
`;

export default Users;
