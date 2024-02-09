import { Skeleton } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ImBin } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import styled from 'styled-components';
import HelmetHandler from '../../../utils/HelmetHandler';
import { Context } from '../../../utils/NavState';
import { notify_error, notify_success } from '../../../utils/Notifications';
import SmallBtn from '../../global/buttons/SmallBtn';
import Footer from '../../global/Footer';
import NavbarHeader from '../../global/NavbarHeader';
import VerticalMenu from '../../global/VerticalMenu';
import {
	GlobalCardDesc,
	GlobalCardTitle,
	GlobalInput,
	GlobalPaginationContainer,
	GlobalSelect,
	MainWrapper,
	PageTitleContainer,
	PageTitleH4,
	PageTitleNav,
	PageTitleSpan,
} from '../../styles/GlobalStyles';

const initialState = {
	blacklisted: '',
	type: 'ip',
};

function Blacklist() {
	const [navState] = useContext(Context);
	const [callback, setCallback] = useState(false);
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const [loading, setLoading] = useState(true);
	const skeletonamount = 5;
	const { user } = auth;

	const [blacklist, setBlacklist] = useState([]);
	const [data, setData] = useState(initialState);
	const { blacklisted, type } = data;

	// Pagination
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(12);
	const [pages, setPages] = useState();

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
	//*   Get blacklists
	//*
	///////////////////////////////////////

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			const getProducts = async () => {
				let res = await axios.get(
					`/api/users/getblacklist?page=${pageNumber}&limit=${limit}`,
					{
						headers: { Authorization: token },
					}
				);
				if (!unmounted) {
					setPages(res.data.total);
					setBlacklist(res.data.blacklist.results);
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
	//*   Handle submit
	//*
	///////////////////////////////////////

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (blacklisted.length < 7) {
			return notify_error('Invalid IP/HWID');
		}
		try {
			const res = await axios.post(
				'/api/users/addblacklist',
				{ blacklisted: blacklisted, type: type, created_by: user.name },
				{
					headers: { Authorization: token },
				}
			);
			//setData(initialState);
			setCallback(!callback);
			setData(initialState);
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

	const handleDelete = async (item) => {
		try {
			const res = await axios.post(
				`/api/users/deleteblacklist`,
				{
					blacklisted: item,
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
	//*   Handle change
	//*
	///////////////////////////////////////

	const handlePageChange = async (event, page) => {
		event.preventDefault();
		setPageNumber(page);
		setCallback(!callback);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	const renderBlacklist = () => {
		if (!blacklist) {
			return null;
		}
		if (blacklist.length === 0) {
			return (
				<p style={{ color: '#a6b0cf', padding: '12px' }}>
					No results...
				</p>
			);
		}
		return blacklist.map((item) => (
			<BlacklistListElement key={item._id} style={{ minWidth: '1160px' }}>
				<BlacklistListText style={{ minWidth: '250px' }}>
					{item.blacklisted}
				</BlacklistListText>
				<BlacklistListText style={{ minWidth: '250px' }}>
					{item.region || 'None'}
				</BlacklistListText>
				<BlacklistListText style={{ minWidth: '250px' }}>
					{item.type.toUpperCase() || 'None'}
				</BlacklistListText>
				<BlacklistListText style={{ minWidth: '250px' }}>
					{item.blocked_connections}
				</BlacklistListText>
				<BlacklistListBtnContainer
					style={{ width: '10%', minWidth: '80px' }}
				>
					<ImBin onClick={() => handleDelete(item._id)} />
				</BlacklistListBtnContainer>
			</BlacklistListElement>
		));
	};

	return (
		<>
			<HelmetHandler title="Blacklist - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<MainWrapper
				style={
					navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
				}
			>
				<PageTitleContainer>
					<PageTitleH4>Blacklist</PageTitleH4>
					<PageTitleNav>
						Management <PageTitleSpan>/</PageTitleSpan> Blacklist
					</PageTitleNav>
				</PageTitleContainer>
				<BlacklistWrapper>
					<BlacklistCol className="col1">
						<GlobalCardTitle>Add new</GlobalCardTitle>
						<GlobalCardDesc>
							Here you can add HWIDs/IPs to blacklist and block
							their usage!
						</GlobalCardDesc>
						<BlacklistInputWrapper>
							<GlobalInput
								placeholder="IP/HWID"
								onChange={handleChange}
								name="blacklisted"
								value={blacklisted}
							/>
							<GlobalSelect
								onChange={handleChange}
								name="type"
								value={type}
							>
								<option value="ip">IP</option>
								<option value="hwid">HWID</option>
							</GlobalSelect>
							<SmallBtn onClick={handleSubmit} text="Submit" />
						</BlacklistInputWrapper>
					</BlacklistCol>
					<BlacklistCol
						className="col2"
						style={{ position: 'relative' }}
					>
						<GlobalCardTitle>Blacklist</GlobalCardTitle>
						<GlobalCardDesc>
							Here are your current Blacklisted IPs/HWIDs!
						</GlobalCardDesc>
						<BlacklistListWrapper
							style={{
								overflowX: 'auto',
							}}
						>
							<BlacklistListElement
								style={{
									minWidth: '1160px',
									backgroundColor: '#32394e',
									fontWeight: '600',
								}}
							>
								<BlacklistListText
									style={{ minWidth: '250px' }}
								>
									IP/HWID
								</BlacklistListText>
								<BlacklistListText
									style={{ minWidth: '250px' }}
								>
									Location
								</BlacklistListText>
								<BlacklistListText
									style={{ minWidth: '250px' }}
								>
									Type
								</BlacklistListText>
								<BlacklistListText
									style={{ minWidth: '250px' }}
								>
									Blocked connections
								</BlacklistListText>
								<BlacklistListText
									style={{ width: '10%', minWidth: '80px' }}
								>
									Manage
								</BlacklistListText>
							</BlacklistListElement>
							{loading ? (
								<>
									<animated.div style={fadeLoader}>
										{[...Array(skeletonamount)].map(
											(elementInArray, index) => (
												<BlacklistListElement
													key={index}
												>
													<BlacklistListText>
														{' '}
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</BlacklistListText>
													<BlacklistListText>
														{' '}
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</BlacklistListText>
													<BlacklistListText>
														{' '}
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</BlacklistListText>
													<BlacklistListText
														style={{ width: '10%' }}
													>
														{' '}
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</BlacklistListText>
												</BlacklistListElement>
											)
										)}
									</animated.div>
								</>
							) : (
								<animated.div style={fadeElement}>
									{renderBlacklist()}
								</animated.div>
							)}
						</BlacklistListWrapper>
						<GlobalPaginationContainer>
							{blacklist ? (
								<Pagination
									size={
										window.innerWidth < 450
											? 'small'
											: 'medium'
									}
									count={Math.ceil(10 / 30)}
									onChange={handlePageChange}
									page={1}
									color="primary"
								/>
							) : null}
						</GlobalPaginationContainer>
					</BlacklistCol>
				</BlacklistWrapper>
				<Footer />
			</MainWrapper>
		</>
	);
}

const BlacklistWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col1 {
		grid-row: 1/2;
	}

	.col2 {
		min-height: calc(100vh - 400px);
		max-width: 100%;
	}
`;
const BlacklistCol = styled.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
`;

const BlacklistInputWrapper = styled.div`
	display: flex;
	width: 100%;
	max-width: 1000px;
	gap: 20px;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`;
const BlacklistListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
	margin-bottom: 50px;
	min-height: 350px;
	@media screen and (max-width: 450px) {
		margin-bottom: 25px;
	}
`;

const BlacklistListElement = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`;

const BlacklistListText = styled.p`
	color: #a6b0cf;
	width: 30%;
	overflow-wrap: break-word;
`;

const BlacklistListBtnContainer = styled.div`
	display: flex;
	gap: 10px;
	color: #f46a6a;
	font-size: 16px;
	cursor: pointer;
`;

export default Blacklist;
