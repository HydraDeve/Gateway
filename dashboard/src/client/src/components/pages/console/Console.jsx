import { Checkbox, FormControlLabel, Switch } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { FaMountain } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import styled from 'styled-components';
import HelmetHandler from '../../../utils/HelmetHandler';
import { Context } from '../../../utils/NavState';
import { notify_error, notify_success } from '../../../utils/Notifications';
import {
	SmallCardContainer,
	SmallCardElement,
	SmallCardH4,
	SmallCardSpan,
	SmallCardTitle,
} from '../../global/cards/SmallCardx';
import Footer from '../../global/Footer';
import NavbarHeader from '../../global/NavbarHeader';
import VerticalMenu from '../../global/VerticalMenu';
import {
	GlobalBtn,
	GlobalCardDesc,
	GlobalCardTitle,
	GlobalPaginationContainer,
	GlobalSearchInput,
	MainWrapper,
	PageTitleContainer,
	PageTitleH4,
	PageTitleNav,
	PageTitleSpan,
} from '../../styles/GlobalStyles';

function Console() {
	const [navState] = useContext(Context);
	const [callback, setCallback] = useState(false);
	const token = useSelector((state) => state.token);
	const [switchstate, setSwitchState] = useState();

	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	const [logs, setLogs] = useState([]);

	// Loading
	const [loading, setLoading] = useState(true);
	const skeletonamount = 8;

	// Switches
	const [dashboardSwitch, setDashboardSwitch] = useState(true);
	const [requestSwitch, setRequestSwitch] = useState(true);
	const [discordSwitch, setDiscordSwitch] = useState(true);

	// Pagination
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(12);
	const [pages, setPages] = useState();
	const [query, setQuery] = useState('');

	const [showRequests, setShowRequests] = useState(true);
	const [showDashboard, setShowDashboard] = useState(true);
	const [showDiscord, setShowDiscord] = useState(true);

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
	//*   Get logs
	//*
	///////////////////////////////////////

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			setLoading(true);
			const getProducts = async () => {
				let res = await axios.get(
					`/api/users/getlogs?page=${pageNumber}&limit=${limit}&query=${query}&requests=${showRequests}&dashboard=${showDashboard}&discord=${showDiscord}`,
					{
						headers: { Authorization: token },
					}
				);
				if (!unmounted) {
					setPages(res.data.total);
					setLogs(res.data.logs.results);
					setTimeout(
						() => (!unmounted ? setLoading(false) : null),
						250
					);
				}
			};
			getProducts();
		}
		return () => {
			unmounted = true;
		};
	}, [callback]);

	///////////////////////////////////////
	//*
	//*   Get switch state
	//*
	///////////////////////////////////////

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			const getProducts = async () => {
				let res = await axios.get(`/api/users/getswitchstate`, {
					headers: { Authorization: token },
				});
				if (!unmounted) {
					setDashboardSwitch(res.data.dashboard);
					setRequestSwitch(res.data.requests);
					setDiscordSwitch(res.data.discord);
				}
			};
			getProducts();
		}
		return () => {
			unmounted = true;
		};
	}, []);

	///////////////////////////////////////
	//*
	//*   Handle submit
	//*
	///////////////////////////////////////

	const handleSubmit = async () => {
		// axios
		try {
			const res = await axios.post(
				'/api/users/updatesavepreference',
				{
					dashboard: dashboardSwitch,
					requests: requestSwitch,
					discord: discordSwitch,
				},
				{
					headers: { Authorization: token },
				}
			);
			notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	///////////////////////////////////////
	//*
	//*   Change settings
	//*
	///////////////////////////////////////

	const handlePageChange = async (event, page) => {
		event.preventDefault();
		setPageNumber(page);
		setCallback(!callback);
	};

	const handleSwitchChange = (e) => {
		if (e.target.name === 'dashboard_logs') {
			setDashboardSwitch(!dashboardSwitch);
		} else if (e.target.name === 'discord_logs') {
			setDiscordSwitch(!discordSwitch);
		} else {
			setRequestSwitch(!requestSwitch);
		}
	};

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		if (name === 'query') {
			setLoading(true);
			setQuery(value);
			setPageNumber(1);
			setTimeout(() => {
				setCallback(!callback);
			}, 1000);

		}
	};

	const renderLogs = () => {
		if (!logs) {
			return;
		}
		if (logs.length === 0) {
			return (
				<p style={{ color: '#a6b0cf', padding: '12px' }}>
					No results...
				</p>
			);
		}
		return logs.map((item) => (
			<ConsoleListElement style={{ minWidth: '1000px' }} key={item._id}>
				<ConsoleListText>{item.user}</ConsoleListText>
				<ConsoleListText>{item.activity}</ConsoleListText>
				<ConsoleListText>{item.details || 'None'}</ConsoleListText>
				<ConsoleListText>
					<ReactTimeAgo
						date={Date.parse(item.createdAt)}
						locale="en-US"
					/>
				</ConsoleListText>
			</ConsoleListElement>
		));
	};

	return (
		<>
			<HelmetHandler title="Console - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<MainWrapper
				style={
					navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
				}
			>
				<PageTitleContainer>
					<PageTitleH4>Console</PageTitleH4>
					<PageTitleNav>
						Management <PageTitleSpan>/</PageTitleSpan> Console
					</PageTitleNav>
				</PageTitleContainer>
				<ConsoleWrapper>
					<ConsoleCol className="col1">
						<SmallCardContainer>
							<SmallCardElement>
								<SmallCardTitle>
									Total activity records
								</SmallCardTitle>
								<SmallCardH4>
									{loading ? (
										<animated.div style={fadeLoader}>
											<Skeleton
												animation="wave"
												width={'100%'}
												height={'40px'}
											/>
										</animated.div>
									) : (
										<animated.div style={fadeElement}>
											{pages}
										</animated.div>
									)}
								</SmallCardH4>
							</SmallCardElement>
							<SmallCardElement>
								<SmallCardSpan>
									<FaMountain />
								</SmallCardSpan>
							</SmallCardElement>
						</SmallCardContainer>
					</ConsoleCol>
					<ConsoleCol className="col2">
						<GlobalCardTitle>Display</GlobalCardTitle>
						<GlobalCardDesc>
							Change display settings!
						</GlobalCardDesc>
						<LicensesInputContainer>
							<LicensesSpan>
								<BiSearchAlt />
							</LicensesSpan>
							<GlobalSearchInput
								placeholder="Search"
								name="query"
								onChange={handleChangeInput}
							/>
						</LicensesInputContainer>
						<FormControlLabel
							control={
								<Checkbox
									checked={showRequests}
									onChange={() => {
										setShowRequests(!showRequests);
										setCallback(!callback);
									}}
									name="checkedB"
									color="primary"
								/>
							}
							label="Show requests"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={showDashboard}
									onChange={() => {
										setShowDashboard(!showDashboard);
										setCallback(!callback);
									}}
									name="checkedB"
									color="primary"
								/>
							}
							label="Show dashboard events"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={showDiscord}
									onChange={() => {
										setShowDiscord(!showDiscord);
										setCallback(!callback);
									}}
									name="checkedB"
									color="primary"
								/>
							}
							label="Show Discord events"
						/>
					</ConsoleCol>
					<ConsoleCol
						className="col3"
						style={{ position: 'relative' }}
					>
						<GlobalCardTitle>Settings</GlobalCardTitle>
						<GlobalCardDesc>
							At default logs are deleted after 30days.
						</GlobalCardDesc>
						<ConsoleSwitchContainer>
							<FormControlLabel
								control={
									<Switch
										disabled={
											user.role === 0 ? false : true
										}
										checked={dashboardSwitch}
										onChange={handleSwitchChange}
										name="dashboard_logs"
										color="primary"
									/>
								}
								label="Save dashboard logs"
							/>
							<FormControlLabel
								control={
									<Switch
										disabled={
											user.role === 0 ? false : true
										}
										checked={requestSwitch}
										onChange={handleSwitchChange}
										name="request_logs"
										color="primary"
									/>
								}
								label="Save request logs"
							/>
							<FormControlLabel
								control={
									<Switch
										disabled={
											user.role === 0 ? false : true
										}
										checked={discordSwitch}
										onChange={handleSwitchChange}
										name="discord_logs"
										color="primary"
									/>
								}
								label="Save Discord logs"
							/>
						</ConsoleSwitchContainer>
						<div
							className="bottom-container"
							style={{
								position: 'absolute',
								bottom: '16px',
								left: '16px',
								display: 'flex',
								gap: '10px',
							}}
						>
							<GlobalBtn
								disabled={user.role === 0 ? false : true}
								onClick={handleSubmit}
							>
								Submit changes
							</GlobalBtn>
						</div>
					</ConsoleCol>
					<ConsoleCol
						className="col4"
						style={{ position: 'relative' }}
					>
						<GlobalCardTitle>Console</GlobalCardTitle>
						<GlobalCardDesc>
							Here latest activity is being logged!
						</GlobalCardDesc>
						<ConsoleListWrapper className="Console-desktop">
							<ConsoleListElement
								style={{
									minWidth: '1000px',
									backgroundColor: '#32394e',
									fontWeight: '600',
								}}
							>
								<ConsoleListText>User</ConsoleListText>
								<ConsoleListText>Activity</ConsoleListText>
								<ConsoleListText>Details</ConsoleListText>
								<ConsoleListText>Timestamp</ConsoleListText>
							</ConsoleListElement>

							{loading ? (
								<>
									<animated.div style={fadeLoader}>
										{[...Array(skeletonamount)].map(
											(elementInArray, index) => (
												<ConsoleListElement
													key={index}
													style={{
														minWidth: '1000px',
													}}
												>
													<ConsoleListText>
														{' '}
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</ConsoleListText>
													<ConsoleListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</ConsoleListText>
													<ConsoleListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</ConsoleListText>
													<ConsoleListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</ConsoleListText>
												</ConsoleListElement>
											)
										)}
									</animated.div>
								</>
							) : (
								<animated.div style={fadeElement}>
									{renderLogs()}
								</animated.div>
							)}
						</ConsoleListWrapper>
						<GlobalPaginationContainer>
							{logs ? (
								<Pagination
									size={
										window.innerWidth < 450
											? 'small'
											: 'medium'
									}
									count={Math.ceil(pages / limit)}
									onChange={handlePageChange}
									page={pageNumber}
									color="primary"
								/>
							) : null}
						</GlobalPaginationContainer>
					</ConsoleCol>
				</ConsoleWrapper>
				<Footer />
			</MainWrapper>
		</>
	);
}

const LicensesInputContainer = styled.div`
	position: relative;
	width: 100%;
`;

const LicensesSpan = styled.span`
	position: absolute;
	z-index: 10;
	font-size: 16px;
	line-height: 43px;
	left: 13px;
	top: 0;
	color: #c3cbe4;
`;
const LicensesSearchInput = styled.input`
	border: none;
	height: 38px;
	width: 100%;
	padding-left: 40px;
	padding-right: 20px;
	box-shadow: none;
	border-radius: 30px;
	background-color: #2e3446;
	outline: none;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
`;

const ConsoleWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(130px, auto);
	min-height: calc(100vh - 200px);

	.col1 {
		grid-column: 1/2;
		grid-row: 1;
	}
	.col2 {
		grid-column: 1/2;
		grid-row: 2/4;
	}
	.col3 {
		grid-column: 1/2;
		grid-row: 4/6;
	}
	.col4 {
		grid-column: 2/6;
		grid-row: 1/6;
		max-width: 100%;
	}

	@media screen and (max-width: 1200px) {
		.col1 {
			grid-column: 1/6;
			grid-row: 1;
		}
		.col2 {
			grid-column: 1/6;
			grid-row: 2;
		}
		.col3 {
			grid-column: 1/6;
			grid-row: 3;
		}
		.col4 {
			grid-column: 1/6;
			grid-row: 4/6;
		}
	}
`;

const ConsoleCol = styled.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	padding: 16px;
`;

const ConsoleSwitchContainer = styled.div`
	@media screen and (max-width: 1200px) {
		margin-bottom: 50px;
	}
`;

const ConsoleListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
	margin-bottom: 50px;
	min-height: 350px;
	overflow-x: auto;
	@media screen and (max-width: 450px) {
		margin-bottom: 25px;
	}
`;
const ConsoleListElement = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`;

const ConsoleListText = styled.p`
	color: #a6b0cf;
	width: 25%;
	min-width: 250px;
`;

export default Console;
