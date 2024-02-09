import { Skeleton } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { BiSearchAlt } from 'react-icons/bi';
import { FiCopy, FiMoreHorizontal } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo';
import styled from 'styled-components';
import Countires from '../../../utils/Countries';
import HelmetHandler from '../../../utils/HelmetHandler';
import { Context } from '../../../utils/NavState';
import { notify_error, notify_success } from '../../../utils/Notifications';
import Popup from '../../../utils/Popup';
import SmallBtn from '../../global/buttons/SmallBtn';
import Footer from '../../global/Footer';
import NavbarHeader from '../../global/NavbarHeader';
import { TagsInput } from '../../global/TagsInput';
import VerticalMenu from '../../global/VerticalMenu';
import {
	GlobalCardDesc,
	GlobalCardTitle,
	GlobalInput,
	GlobalLabel,
	GlobalLabelOptional,
	GlobalPaginationContainer,
	GlobalSearchInput,
	GlobalSelect,
	GlobalTextarea,
	MainWrapper,
	PageTitleContainer,
	PageTitleH4,
	PageTitleNav,
	PageTitleSpan,
} from '../../styles/GlobalStyles';

const initialState = {
	days: 0,
	times: 0,
};

function Licenses() {
	const [navState] = useContext(Context);
	const token = useSelector((state) => state.token);

	const [licenses, setLicenses] = useState();
	const [callback, setCallback] = useState(false);
	const [popup, setPopup] = useState(false);

	// Loading
	const [loading, setLoading] = useState(true);
	const skeletonamount = 8;

	// Expiring
	const [licenseToEdit, setLicenseToEdit] = useState();
	const [originalExpires, setOriginalExpires] = useState();

	// Expiring edit data
	const [expiringData, setExpiringData] = useState(initialState);
	const { days, times } = expiringData;

	const [tags, setTags] = useState([]);

	// Pagination
	const [sortby, setSortBy] = useState('date');
	const [products, setProducts] = useState();
	const [product, setProduct] = useState();
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(8);
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
	//*   Handle change
	//*
	///////////////////////////////////////

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		if (name === 'query') {
			setLoading(true);
			setQuery(value);
			setPageNumber(1);
			setTimeout(() => {
				setCallback(!callback);
			}, 1000);
			return;
		}
		if (name === 'sortby') setSortBy(value);
		if (name === 'limit') setLimit(value);
		if (name === 'products') setProduct(value);
		setPageNumber(1);
		setCallback(!callback);
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setLicenseToEdit({ ...licenseToEdit, [name]: value });
	};

	const handleExpiryChange = (e) => {
		const { name, value } = e.target;
		setExpiringData({ ...expiringData, [name]: value });
	};

	///////////////////////////////////////
	//*
	//*   Button handler
	//*
	///////////////////////////////////////

	const handleBtn = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		if (value === 'dec') {
			if (name === 'days' && days > 0) {
				let new_value = parseInt(days) - 1;
				return setExpiringData({ ...expiringData, days: new_value });
			}
			if (name === 'times' && times > 0) {
				let new_value = parseInt(times) - 1;
				return setExpiringData({ ...expiringData, times: new_value });
			}
			if (licenseToEdit[name] === 'none') {
				return setLicenseToEdit({
					...licenseToEdit,
					[name]: 5,
				});
			}
			if (parseInt(licenseToEdit[name]) > 1) {
				let new_value = parseInt(licenseToEdit[name]) - 1;
				return setLicenseToEdit({
					...licenseToEdit,
					[name]: new_value,
				});
			}
			if (!licenseToEdit[name]) {
				return setLicenseToEdit({ ...licenseToEdit, [name]: 5 });
			}
		}
		if (value === 'inc') {
			if (name === 'days' && days >= 0) {
				let new_value = parseInt(days) + 1;
				return setExpiringData({ ...expiringData, days: new_value });
			}
			if (name === 'times' && times >= 0) {
				let new_value = parseInt(times) + 1;
				return setExpiringData({ ...expiringData, times: new_value });
			}
			if (licenseToEdit[name] === 'none') {
				return setLicenseToEdit({
					...licenseToEdit,
					[name]: 5,
				});
			}
			if (parseInt(licenseToEdit[name]) >= 0) {
				let new_value = parseInt(licenseToEdit[name]) + 1;
				return setLicenseToEdit({
					...licenseToEdit,
					[name]: new_value,
				});
			}
			if (!licenseToEdit[name]) {
				return setLicenseToEdit({ ...licenseToEdit, [name]: 5 });
			}
		}
		if (value === 'inf') {
			return setLicenseToEdit({ ...licenseToEdit, [name]: 'none' });
		}
	};

	///////////////////////////////////////
	//*
	//*   Handle submit
	//*
	///////////////////////////////////////

	const handleEditSubmit = async (e) => {
		e.preventDefault();

		// Validation
		if (licenseToEdit.clientname.length < 3) {
			return notify_error(
				'Client name must be at least 3 characters long'
			);
		}
		if (licenseToEdit.clientname.length > 30) {
			return notify_error('Client name too long');
		}
		if (
			licenseToEdit.discord_id &&
			licenseToEdit.discord_id !== '' &&
			( licenseToEdit.discord_id.length < 17 || licenseToEdit.discord_id.length > 22)
		) {
			return notify_error('Invalid Discord ID');
		}
		if (licenseToEdit.ip_cap === '0' || licenseToEdit.ip_cap === 0) {
			return notify_error('IP-Cap cannot be zero');
		}
		if (licenseToEdit.hwid_cap === '0' || licenseToEdit.hwid_cap === 0) {
			return notify_error('HWID-Cap cannot be zero');
		}
		if (
			licenseToEdit.hwid_expires === '0' ||
			licenseToEdit.hwid_expires === 0
		) {
			return notify_error('HWID-Expires days cannot be zero');
		}
		if (
			licenseToEdit.ip_expires === '0' ||
			licenseToEdit.ip_expires === 0
		) {
			return notify_error('IP-Expires days cannot be zero');
		}

		if (
			licenseToEdit.expires === true ||
			licenseToEdit.expires === 'true'
		) {
			if (parseInt(times) < 1 && licenseToEdit?.expires_type === '3') {
				return notify_error('Expiry days must be greater than 1');
			}
		}

		// axios
		try {
			const res = await axios.post(
				'/api/users/updatelicense',
				{
					data: licenseToEdit,
					expiring: expiringData,
					tags: tags,
				},
				{
					headers: { Authorization: token },
				}
			);
			setPopup(false);
			setCallback(!callback);
			setTags([]);
			setLicenseToEdit(res.data.data);
			setExpiringData(initialState);
			notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	///////////////////////////////////////
	//*
	//*   Clear data
	//*
	///////////////////////////////////////

	const clearHwids = async (e) => {
		if (!licenseToEdit || licenseToEdit.hwid_list.length === 0) {
			return notify_error('Cannot clear HWIDs when they does not exist');
		}
		try {
			const res = await axios.post(
				'/api/users/clearhwids',
				{
					data: licenseToEdit,
				},
				{
					headers: { Authorization: token },
				}
			);
			setCallback(!callback);
			setLicenseToEdit(res.data.data);
			notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	const clearIps = async (e) => {
		if (!licenseToEdit || licenseToEdit.ip_list.length === 0) {
			return notify_error('Cannot clear IPs when they does not exist');
		}
		try {
			const res = await axios.post(
				'/api/users/clearips',
				{
					data: licenseToEdit,
				},
				{
					headers: { Authorization: token },
				}
			);
			setCallback(!callback);
			setLicenseToEdit(res.data.data);
			notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	///////////////////////////////////////
	//*
	//*   Reset licensekey
	//*
	///////////////////////////////////////

	const resetLicense = async (e) => {
		if (!licenseToEdit) {
			return notify_error('Weird shit happened');
		}
		try {
			const res = await axios.post(
				'/api/users/resetlicense',
				{
					data: licenseToEdit,
				},
				{
					headers: { Authorization: token },
				}
			);
			setCallback(!callback);
			setLicenseToEdit(res.data.data);
			notify_success(res.data.msg);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	///////////////////////////////////////
	//*
	//*   Delete licensekey
	//*
	///////////////////////////////////////

	const deleteLicense = async (e) => {
		if (!licenseToEdit) {
			return notify_error('Weird shit happened');
		}
		try {
			const res = await axios.post(
				'/api/users/deletelicense',
				{
					license: licenseToEdit._id,
				},
				{
					headers: { Authorization: token },
				}
			);
			setCallback(!callback);
			notify_success(res.data.msg);
			setPopup(false);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	///////////////////////////////////////
	//*
	//*   Get licenses
	//*
	///////////////////////////////////////

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			setLoading(true);
			const getProducts = async () => {
				let res = await axios.get(
					`/api/users/getlicenses?page=${pageNumber}&limit=${limit}&query=${query}&product=${product}&sortby=${sortby}`,
					{
						headers: { Authorization: token },
					}
				);
				if (!unmounted) {
					setPages(res.data.total);
					setLicenses(res.data.licenses.results);
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
	//*   Get products
	//*
	///////////////////////////////////////

	useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			const getProducts = async () => {
				let res = await axios.get(`/api/users/getproducts`, {
					headers: { Authorization: token },
				});
				if (!unmounted) {
					setProducts(res.data.products);
				}
			};
			getProducts();
		}
		return () => {
			unmounted = true;
		};
	}, []);

	const renderProducts =
		products &&
		products.map(function (user) {
			return (
				<option value={user._id} key={user._id}>
					{user.name}
				</option>
			);
		});

	const renderIpList = () => {
		if (!licenseToEdit) {
			return null;
		}
		if (licenseToEdit.ip_list?.length === 0) {
			return (
				<p
					style={{
						color: '#a6b0cf',
						padding: '12px',
						fontSize: '0.8125rem',
					}}
				>
					No results...
				</p>
			);
		}
		return licenseToEdit.ip_list.map((ip) => (
			<LicensesDetailsWrapper
				key={ip.ip}
				style={{
					padding: '10px',
					marginRight: '20px',
				}}
			>
				<LicensesDetailsElement>
					<UsersListText>{ip.ip}</UsersListText>
				</LicensesDetailsElement>
				<LicensesDetailsElement>
					<UsersListText>
						{ip.created_at ? (
							<ReactTimeAgo
								date={Date.parse(ip.created_at)}
								locale="en-US"
							/>
						) : (
							'None'
						)}
					</UsersListText>
				</LicensesDetailsElement>
				<LicensesDetailsElement>
					<UsersListText>
						{ip.expires_in ? (
							<ReactTimeAgo
								date={Date.parse(ip.expires_in)}
								locale="en-US"
							/>
						) : (
							'None'
						)}
					</UsersListText>
				</LicensesDetailsElement>
			</LicensesDetailsWrapper>
		));
	};

	const renderHwidList = () => {
		if (!licenseToEdit) {
			return null;
		}
		if (licenseToEdit.hwid_list?.length === 0) {
			return (
				<p
					style={{
						color: '#a6b0cf',
						padding: '12px',
						fontSize: '0.8125rem',
					}}
				>
					No results...
				</p>
			);
		}
		return licenseToEdit.hwid_list.map((hwid) => (
			<LicensesDetailsWrapper
				key={hwid.hwid}
				style={{
					padding: '10px',
					marginRight: '20px',
				}}
			>
				<LicensesDetailsElement>
					<UsersListText
						style={{
							overflowWrap: 'break-word',
							maxWidth: '357px',
						}}
					>
						{hwid.hwid}
					</UsersListText>
				</LicensesDetailsElement>
				<LicensesDetailsElement>
					<UsersListText>
						{hwid.created_at ? (
							<ReactTimeAgo
								date={Date.parse(hwid.created_at)}
								locale="en-US"
							/>
						) : (
							'None'
						)}
					</UsersListText>
				</LicensesDetailsElement>
				<LicensesDetailsElement>
					<UsersListText>
						{hwid.expires_in ? (
							<ReactTimeAgo
								date={Date.parse(hwid.expires_in)}
								locale="en-US"
							/>
						) : (
							'None'
						)}
					</UsersListText>
				</LicensesDetailsElement>
			</LicensesDetailsWrapper>
		));
	};

	const handlePageChange = async (event, page) => {
		event.preventDefault();
		setPageNumber(page);
		setCallback(!callback);
	};

	const renderLicensesFull = () => {
		if (!licenses) {
			return null;
		}
		if (licenses.length === 0) {
			return (
				<p style={{ color: '#a6b0cf', padding: '12px' }}>
					No results...
				</p>
			);
		}
		return licenses.map((license) => (
			<UsersListElement
				style={{ minWidth: '1320px' }}
				key={license.licensekey}
			>
				<UsersListText style={{ width: '15%', minWidth: '200px' }}>
					{license.prefer_discord ? (
						<>
							{license.discord_username
								? license.discord_username
								: license.clientname}
						</>
					) : (
						license.clientname
					)}
				</UsersListText>
				<UsersListText style={{ width: '25%', minWidth: '320px' }}>
					{license.email}
				</UsersListText>
				<UsersListText style={{ width: '25%', minWidth: '320px' }}>
					{license.licensekey}
				</UsersListText>
				<UsersListText style={{ width: '20%', minWidth: '200px' }}>
					{license.product_name}
				</UsersListText>
				<UsersListText style={{ width: '10%', minWidth: '150px' }}>
					{license.ip_list.length}/{license.ip_cap || '∞'}
				</UsersListText>
				<UsersListText style={{ width: '10%', minWidth: '150px' }}>
					{license.hwid_list.length}/{license.hwid_cap || '∞'}
				</UsersListText>
				<UsersListText style={{ width: '10%', minWidth: '150px' }}>
					{license.createdAt.slice(0, -14)}
				</UsersListText>
				<UsersListText
					style={{
						width: '10%',
						display: 'flex',
						alignItems: 'center',
						minWidth: '150px',
						gap: '10px',
					}}
				>
					<FiMoreHorizontal
						onClick={() => {
							setPopup(true);
							setLicenseToEdit(license);
							setTags(license.tags);
							setOriginalExpires(license.expires);
							setExpiringData(initialState);
						}}
						style={{ fontSize: '1.3rem', cursor: 'pointer' }}
					/>
					<FiCopy
						style={{ fontSize: '1.3rem', cursor: 'pointer' }}
						onClick={() => {
							navigator.clipboard.writeText(license.licensekey);
							notify_success('License copied to clipboard');
						}}
					/>
				</UsersListText>
			</UsersListElement>
		));
	};

	return (
		<>
			<HelmetHandler title="Licenses - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />

			<Popup trigger={popup} type="big" setTrigger={setPopup}>
				<GlobalCardTitle>License management</GlobalCardTitle>
				<GlobalCardDesc>
					View license details or edit license
				</GlobalCardDesc>
				<LicensesDetailsBody>
					<GlobalCardTitle>Essentials</GlobalCardTitle>
					<LicensesDetailsWrapper>
						<LicensesDetailsElement>
							<GlobalLabel>Client</GlobalLabel>
							<GlobalInput
								value={licenseToEdit?.clientname}
								name="clientname"
								onChange={handleEditChange}
							></GlobalInput>
							<GlobalLabel>Client email</GlobalLabel>
							<GlobalInput
								value={licenseToEdit?.email}
								name="email"
								onChange={handleEditChange}
							></GlobalInput>
							<GlobalLabel>DiscordID</GlobalLabel>
							<GlobalInput
								type="number"
								name="discord_id"
								onChange={handleEditChange}
								value={licenseToEdit?.discord_id || 'none'}
							></GlobalInput>
							<GlobalLabel>Tags</GlobalLabel>
							<TagsInput selectedTags={setTags} tags={tags} />
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<GlobalLabel>Licensekey</GlobalLabel>
							<GlobalInput
								readOnly
								value={licenseToEdit?.licensekey}
							></GlobalInput>
							<GlobalLabel>
								DiscordUN
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<GlobalInput
								readOnly
								value={
									licenseToEdit?.discord_username || 'none'
								}
							/>
							<GlobalLabel>Preferred display name</GlobalLabel>
							<GlobalSelect
								value={licenseToEdit?.prefer_discord || false}
								name="prefer_discord"
								onChange={handleEditChange}
							>
								<option value={false}>Client name</option>
								<option value={true}>Discord username</option>
							</GlobalSelect>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<GlobalLabel>Product</GlobalLabel>
							<GlobalSelect
								value={licenseToEdit?.product || 'none'}
								name="product"
								onChange={handleEditChange}
							>
								{products && renderProducts}
							</GlobalSelect>
							<GlobalLabel>
								Created by
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<GlobalInput
								readOnly
								value={licenseToEdit?.created_by || 'none'}
							></GlobalInput>
						</LicensesDetailsElement>
					</LicensesDetailsWrapper>

					<LicensesDetailsWrapper>
						<LicensesDetailsElement style={{ width: '100%' }}>
							<GlobalLabel>Description</GlobalLabel>
							<GlobalTextarea
								value={licenseToEdit?.description}
								name="description"
								onChange={handleEditChange}
								rows="2"
							/>
						</LicensesDetailsElement>
					</LicensesDetailsWrapper>

					<GlobalCardTitle style={{ marginTop: '24px' }}>
						IP-Settings
					</GlobalCardTitle>
					<LicensesDetailsWrapper>
						<LicensesDetailsElement>
							<GlobalLabel>IP-Cap</GlobalLabel>
							<LicensesDetailsAdvancedGroup>
								<SmallBtn
									name="ip_cap"
									onClick={handleBtn}
									value="dec"
									text="-"
								/>

								{licenseToEdit?.ip_cap === 'none' ||
								!licenseToEdit?.ip_cap ? (
									<LicenseFakeInput>∞</LicenseFakeInput>
								) : (
									<GlobalInput
										min="1"
										type="number"
										name="ip_cap"
										onChange={handleEditChange}
										value={licenseToEdit?.ip_cap || 'none'}
									/>
								)}
								<SmallBtn
									name="ip_cap"
									onClick={handleBtn}
									value="inf"
									text="∞"
									color="rgb(50, 57, 78)"
								/>

								<SmallBtn
									name="ip_cap"
									onClick={handleBtn}
									value="inc"
									text="+"
								/>
							</LicensesDetailsAdvancedGroup>
						</LicensesDetailsElement>
						{licenseToEdit?.ip_cap &&
						licenseToEdit?.ip_cap !== 'none' ? (
							<LicensesDetailsElement>
								<GlobalLabel>IP-Expires</GlobalLabel>
								<LicensesDetailsAdvancedGroup>
									<SmallBtn
										name="ip_expires"
										onClick={handleBtn}
										value="dec"
										text="-"
									/>

									{licenseToEdit?.ip_expires === 'none' ||
									!licenseToEdit?.ip_expires ? (
										<LicenseFakeInput>∞</LicenseFakeInput>
									) : (
										<GlobalInput
											min="1"
											type="number"
											name="ip_expires"
											onChange={handleEditChange}
											value={
												licenseToEdit?.ip_expires ||
												'none'
											}
										/>
									)}
									<SmallBtn
										name="ip_expires"
										onClick={handleBtn}
										value="inf"
										text="∞"
										color="#32394E"
									/>
									<SmallBtn
										name="ip_expires"
										onClick={handleBtn}
										value="inc"
										text="+"
									/>
								</LicensesDetailsAdvancedGroup>
							</LicensesDetailsElement>
						) : (
							<LicensesDetailsElement></LicensesDetailsElement>
						)}
						<LicensesDetailsElement>
							<GlobalLabel>Geo location lock</GlobalLabel>
							<GlobalSelect
								value={licenseToEdit?.ip_geo_lock || 'none'}
								name="ip_geo_lock"
								onChange={handleEditChange}
							>
								<option value="none">None</option>
								<Countires />
							</GlobalSelect>
						</LicensesDetailsElement>
					</LicensesDetailsWrapper>
					<GlobalCardTitle style={{ marginTop: '24px' }}>
						IP-List
					</GlobalCardTitle>
					<LicensesDetailsWrapper
						style={{
							backgroundColor: '#32394e',
							fontWeight: '600',
							padding: '10px',
							marginRight: '20px',
						}}
					>
						<LicensesDetailsElement>
							<UsersListText>IP</UsersListText>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<UsersListText>Added at</UsersListText>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<UsersListText>Expires in</UsersListText>
						</LicensesDetailsElement>
					</LicensesDetailsWrapper>
					{renderIpList()}
					<GlobalCardTitle style={{ marginTop: '24px' }}>
						HWID-Settings
					</GlobalCardTitle>
					<LicensesDetailsWrapper>
						<LicensesDetailsElement>
							<GlobalLabel>HWID-Cap</GlobalLabel>
							<LicensesDetailsAdvancedGroup>
								<SmallBtn
									name="hwid_cap"
									onClick={handleBtn}
									value="dec"
									text="-"
								/>
								{licenseToEdit?.hwid_cap === 'none' ||
								!licenseToEdit?.hwid_cap ? (
									<LicenseFakeInput>∞</LicenseFakeInput>
								) : (
									<GlobalInput
										min="1"
										type="number"
										name="hwid_cap"
										onChange={handleEditChange}
										value={
											licenseToEdit?.hwid_cap || 'none'
										}
									/>
								)}
								<SmallBtn
									name="hwid_cap"
									onClick={handleBtn}
									value="inf"
									text="∞"
									color="#32394E"
								/>
								<SmallBtn
									name="hwid_cap"
									onClick={handleBtn}
									value="inc"
									text="+"
								/>
							</LicensesDetailsAdvancedGroup>
						</LicensesDetailsElement>
						{licenseToEdit?.hwid_cap &&
						licenseToEdit?.hwid_cap !== 'none' ? (
							<LicensesDetailsElement>
								<GlobalLabel>HWID-Expires</GlobalLabel>
								<LicensesDetailsAdvancedGroup>
									<SmallBtn
										name="hwid_expires"
										onClick={handleBtn}
										value="dec"
										text="-"
									/>
									{licenseToEdit?.hwid_expires === 'none' ||
									!licenseToEdit?.hwid_expires ? (
										<LicenseFakeInput>∞</LicenseFakeInput>
									) : (
										<GlobalInput
											min="1"
											type="number"
											name="hwid_expires"
											onChange={handleEditChange}
											value={
												licenseToEdit?.hwid_expires ||
												'none'
											}
										/>
									)}
									<SmallBtn
										name="hwid_expires"
										onClick={handleBtn}
										value="inf"
										text="∞"
										color="#32394E"
									/>
									<SmallBtn
										name="hwid_expires"
										onClick={handleBtn}
										value="inc"
										text="+"
									/>
								</LicensesDetailsAdvancedGroup>
							</LicensesDetailsElement>
						) : (
							<LicensesDetailsElement></LicensesDetailsElement>
						)}
						<LicensesDetailsElement></LicensesDetailsElement>
					</LicensesDetailsWrapper>
					<GlobalCardTitle style={{ marginTop: '24px' }}>
						HWID-List
					</GlobalCardTitle>
					<LicensesDetailsWrapper
						style={{
							backgroundColor: '#32394e',
							fontWeight: '600',
							padding: '10px',
							marginRight: '20px',
						}}
					>
						<LicensesDetailsElement>
							<UsersListText>IP</UsersListText>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<UsersListText>Added at</UsersListText>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<UsersListText>Expires in</UsersListText>
						</LicensesDetailsElement>
					</LicensesDetailsWrapper>
					{renderHwidList()}
					<GlobalCardTitle style={{ marginTop: '24px' }}>
						Expiring settings
					</GlobalCardTitle>
					<LicensesDetailsWrapper>
						<LicensesDetailsElement>
							<GlobalLabel>Expires</GlobalLabel>
							<GlobalSelect
								name="expires"
								onChange={handleEditChange}
								value={licenseToEdit?.expires.toString()}
							>
								<option value="true">True</option>
								<option value="false">False</option>
							</GlobalSelect>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							{licenseToEdit?.expires === 'false' ||
							licenseToEdit?.expires === false ? null : (
								<>
									<GlobalLabel>Expires type</GlobalLabel>
									<GlobalSelect
										disabled={
											licenseToEdit?.expires_type &&
											originalExpires
												? true
												: false
										}
										name="expires_type"
										onChange={handleEditChange}
										value={licenseToEdit?.expires_type}
									>
										<option value="1">Days</option>
										<option value="2">Date</option>
										<option value="3">Times</option>
									</GlobalSelect>
								</>
							)}
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							{licenseToEdit?.expires === 'false' ||
							licenseToEdit?.expires === false ? null : (
								<>
									<GlobalLabel>
										Expires in
										<GlobalLabelOptional>
											(automatic & hoverable)
										</GlobalLabelOptional>
									</GlobalLabel>
									<LicenseFakeInput>
										{licenseToEdit?.expires_date ? (
											<ReactTimeAgo
												date={Date.parse(
													licenseToEdit.expires_date
												)}
												locale="en-US"
											/>
										) : licenseToEdit?.expires_times &&
										  licenseToEdit?.expires_type === 3 ? (
											`${licenseToEdit?.total_requests}/${licenseToEdit?.expires_times}`
										) : (
											'None'
										)}
									</LicenseFakeInput>
								</>
							)}
						</LicensesDetailsElement>
					</LicensesDetailsWrapper>
					<>
						{licenseToEdit?.expires === 'false' ||
						licenseToEdit?.expires === false ? (
							''
						) : (
							<LicensesDetailsWrapper>
								{originalExpires ? (
									<LicensesDetailsElement>
										{parseInt(
											licenseToEdit?.expires_type
										) === 1 ? (
											<>
												<GlobalLabel>
													Add days
												</GlobalLabel>
												<LicensesDetailsAdvancedGroup>
													<SmallBtn
														onClick={handleBtn}
														value="dec"
														name="days"
														text="-"
													/>
													<GlobalInput
														type="number"
														onChange={
															handleExpiryChange
														}
														name="days"
														value={days}
													/>
													<SmallBtn
														onClick={handleBtn}
														value="inc"
														name="days"
														text="+"
													/>
												</LicensesDetailsAdvancedGroup>
											</>
										) : (
											''
										)}
										{parseInt(
											licenseToEdit?.expires_type
										) === 2 ? (
											<>
												<GlobalLabel>
													New date
												</GlobalLabel>
												<DatePicker
													selected={
														Date.parse(
															licenseToEdit?.expires_date
														) || expiringData.date
													}
													minDate={new Date().setDate(
														new Date().getDate() + 1
													)}
													onChange={(date) => {
														setLicenseToEdit({
															...licenseToEdit,
															expires_date: date,
														});
													}}
												/>
											</>
										) : (
											''
										)}
										{parseInt(
											licenseToEdit?.expires_type
										) === 3 ? (
											<>
												<GlobalLabel>
													Add times
												</GlobalLabel>
												<LicensesDetailsAdvancedGroup>
													<SmallBtn
														name="times"
														onClick={handleBtn}
														value="dec"
														text="-"
													/>
													<GlobalInput
														type="number"
														onChange={
															handleExpiryChange
														}
														name="times"
														value={times}
													/>
													<SmallBtn
														name="times"
														onClick={handleBtn}
														value="inc"
														text="+"
													/>
												</LicensesDetailsAdvancedGroup>
											</>
										) : (
											''
										)}
									</LicensesDetailsElement>
								) : (
									<LicensesDetailsElement>
										{parseInt(
											licenseToEdit?.expires_type
										) === 1 ||
										!licenseToEdit?.expires_type ? (
											<>
												<GlobalLabel>
													Days before expires
												</GlobalLabel>
												<LicensesDetailsAdvancedGroup>
													<SmallBtn
														onClick={handleBtn}
														value="dec"
														name="days"
														text="-"
													/>
													<GlobalInput
														type="number"
														onChange={
															handleExpiryChange
														}
														name="days"
														value={days}
													/>
													<SmallBtn
														onClick={handleBtn}
														value="inc"
														name="days"
														text="+"
													/>
												</LicensesDetailsAdvancedGroup>
											</>
										) : (
											''
										)}
										{parseInt(
											licenseToEdit?.expires_type
										) === 2 ? (
											<>
												<GlobalLabel>
													Set expiry date
												</GlobalLabel>
												<DatePicker
													selected={
														licenseToEdit?.expires_date ||
														new Date()
													}
													minDate={new Date().setDate(
														new Date().getDate() + 1
													)}
													onChange={(date) => {
														setLicenseToEdit({
															...licenseToEdit,
															expires_date: date,
														});
													}}
												/>
											</>
										) : (
											''
										)}
										{parseInt(
											licenseToEdit?.expires_type
										) === 3 ? (
											<>
												<GlobalLabel>
													Times before expires
												</GlobalLabel>
												<LicensesDetailsAdvancedGroup>
													<SmallBtn
														name="times"
														onClick={handleBtn}
														value="dec"
														text="-"
													/>
													<GlobalInput
														type="number"
														onChange={
															handleExpiryChange
														}
														name="times"
														value={times}
													/>
													<SmallBtn
														name="times"
														onClick={handleBtn}
														value="inc"
														text="+"
													/>
												</LicensesDetailsAdvancedGroup>
											</>
										) : (
											''
										)}
									</LicensesDetailsElement>
								)}

								<LicensesDetailsElement>
									{licenseToEdit?.expires === 'false' ||
									licenseToEdit?.expires === false ? null : (
										<>
											<GlobalLabel>
												Delete when expired
											</GlobalLabel>
											<GlobalSelect
												name="expires_delete_after"
												onChange={handleEditChange}
												value={
													licenseToEdit?.expires_delete_after
												}
											>
												<option value={true}>
													True
												</option>
												<option value={false}>
													False
												</option>
											</GlobalSelect>
										</>
									)}
								</LicensesDetailsElement>
								<LicensesDetailsElement></LicensesDetailsElement>
							</LicensesDetailsWrapper>
						)}
					</>
					<GlobalCardTitle style={{ marginTop: '24px' }}>
						Alert settings
					</GlobalCardTitle>
					<LicensesDetailsWrapper>
						<LicensesDetailsElement>
							<GlobalLabel>Receive webhooks</GlobalLabel>
							<GlobalSelect
								name="receive_webhooks"
								onChange={handleEditChange}
								value={licenseToEdit?.receive_webhooks}
							>
								<option value={true}>True</option>
								<option value={false}>False</option>
							</GlobalSelect>
						</LicensesDetailsElement>
						<LicensesDetailsElement></LicensesDetailsElement>
						<LicensesDetailsElement></LicensesDetailsElement>
					</LicensesDetailsWrapper>
					<GlobalCardTitle style={{ marginTop: '24px' }}>
						Activity
					</GlobalCardTitle>
					<LicensesDetailsWrapper style={{ marginBottom: '20px' }}>
						<LicensesDetailsElement>
							<GlobalLabel>
								Latest request
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<LicenseFakeInput>
								{licenseToEdit?.latest_request ? (
									<ReactTimeAgo
										date={Date.parse(
											licenseToEdit.latest_request
										)}
										locale="en-US"
									/>
								) : (
									'None'
								)}
							</LicenseFakeInput>
							<GlobalLabel>
								Total requests
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<LicenseFakeInput>
								{licenseToEdit?.total_requests || 'None'}
							</LicenseFakeInput>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<GlobalLabel>
								License created
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<LicenseFakeInput>
								{licenseToEdit?.createdAt ? (
									<ReactTimeAgo
										date={Date.parse(
											licenseToEdit.createdAt
										)}
										locale="en-US"
									/>
								) : (
									'Loading...'
								)}
							</LicenseFakeInput>
							<GlobalLabel>
								Latest IP
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<GlobalInput
								readOnly
								value={licenseToEdit?.latest_ip || 'None'}
							></GlobalInput>
						</LicensesDetailsElement>
						<LicensesDetailsElement>
							<GlobalLabel>
								Last edit{' '}
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<LicenseFakeInput>
								{licenseToEdit?.updatedAt ? (
									<ReactTimeAgo
										date={Date.parse(
											licenseToEdit.updatedAt
										)}
										locale="en-US"
									/>
								) : (
									'Loading...'
								)}
							</LicenseFakeInput>
							<GlobalLabel>
								Latest HWID
								<GlobalLabelOptional>
									(automatic)
								</GlobalLabelOptional>
							</GlobalLabel>
							<GlobalInput
								readOnly
								value={licenseToEdit?.latest_hwid || 'None'}
							></GlobalInput>
						</LicensesDetailsElement>
					</LicensesDetailsWrapper>
					<GlobalLabel>Actions</GlobalLabel>
					<LicensesSearchContainer style={{ marginBottom: '20px' }}>
						<SmallBtn
							text="Submit changes"
							onClick={handleEditSubmit}
						/>
						<SmallBtn text="Clear IPs" onClick={clearIps} />
						<SmallBtn text="Clear HWIDs" onClick={clearHwids} />
						<SmallBtn
							text="Reset licensekey"
							onClick={resetLicense}
						/>
						<SmallBtn
							text="Delete license"
							onClick={deleteLicense}
							color="rgb(244, 106, 106)"
						/>
					</LicensesSearchContainer>
				</LicensesDetailsBody>
			</Popup>

			<MainWrapper
				style={
					navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
				}
			>
				<PageTitleContainer>
					<PageTitleH4>Licenses</PageTitleH4>
					<PageTitleNav>
						Management <PageTitleSpan>/</PageTitleSpan> Licenses
					</PageTitleNav>
				</PageTitleContainer>
				<LicensesWrapper>
					<LicensesCol className="col1">
						<GlobalCardTitle>Search</GlobalCardTitle>
						<GlobalCardDesc>
							Search licenses via different parameters
						</GlobalCardDesc>
						<LicensesSearchContainer>
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

							<GlobalSelect
								name="products"
								onChange={handleChangeInput}
								value={product}
							>
								<option value="">Select product...</option>
								{products && renderProducts}
							</GlobalSelect>
							<GlobalSelect
								name="limit"
								onChange={handleChangeInput}
								value={limit}
							>
								<option value="8">8</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="30">30</option>
							</GlobalSelect>
							<GlobalSelect
								name="sortby"
								onChange={handleChangeInput}
								value={sortby}
							>
								<option value="date">Date</option>
								<option value="name">Name</option>
							</GlobalSelect>
						</LicensesSearchContainer>
					</LicensesCol>
					<LicensesCol className="col2">
						<GlobalCardTitle>Licenses</GlobalCardTitle>
						<GlobalCardDesc>
							Displaying all your licenses
						</GlobalCardDesc>
						<UsersListWrapper
							className="Users-desktop"
							style={{
								overflowX: 'auto',
							}}
						>
							<UsersListElement
								style={{
									backgroundColor: '#32394e',
									fontWeight: '600',
									minWidth: '1640px',
								}}
							>
								<UsersListText
									style={{ width: '15%', minWidth: '200px' }}
								>
									Client
								</UsersListText>
								<UsersListText
									style={{ width: '25%', minWidth: '320px' }}
								>
									Client email
								</UsersListText>
								<UsersListText
									style={{ width: '25%', minWidth: '320px' }}
								>
									License
								</UsersListText>
								<UsersListText
									style={{ width: '20%', minWidth: '200px' }}
								>
									Product
								</UsersListText>
								<UsersListText
									style={{ width: '10%', minWidth: '150px' }}
								>
									IP-Cap
								</UsersListText>
								<UsersListText
									style={{ width: '10%', minWidth: '150px' }}
								>
									HWID-Cap
								</UsersListText>
								<UsersListText
									style={{ width: '10%', minWidth: '150px' }}
								>
									Created at
								</UsersListText>
								<UsersListText
									style={{ width: '10%', minWidth: '150px' }}
								>
									Actions
								</UsersListText>
							</UsersListElement>
							{loading ? (
								<>
									<animated.div style={fadeLoader}>
										{[...Array(skeletonamount)].map(
											(elementInArray, index) => (
												<UsersListElement key={index}>
													<UsersListText
														style={{
															width: '15%',
															minWidth: '200px',
														}}
													>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText
														style={{
															width: '25%',
															minWidth: '320px',
														}}
													>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText
														style={{
															width: '20%',
															minWidth: '200px',
														}}
													>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText
														style={{
															width: '10%',
															minWidth: '150px',
														}}
													>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText
														style={{
															width: '10%',
															minWidth: '150px',
														}}
													>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText
														style={{
															width: '10%',
															minWidth: '150px',
														}}
													>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'20px'}
														/>
													</UsersListText>
													<UsersListText
														style={{
															width: '10%',
															minWidth: '150px',
														}}
													>
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
									{renderLicensesFull()}
								</animated.div>
							)}
						</UsersListWrapper>
						<GlobalPaginationContainer>
							{licenses ? (
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
					</LicensesCol>
				</LicensesWrapper>
				<Footer />
			</MainWrapper>
		</>
	);
}

const LicensesWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col2 {
		min-height: calc(100vh - 400px);
	}
	.Users-desktop {
		margin-bottom: 50px;
		@media screen and (max-width: 450px) {
			margin-bottom: 25px;
		}
	}
`;

const LicensesCol = styled.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
	overflow-x: hidden;
	position: relative;
`;

const LicensesDetailsBody = styled.div`
	height: 500px;
	overflow-y: auto;
`;

const LicenseFakeInput = styled.div`
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

const LicensesSearchContainer = styled.div`
	display: flex;
	gap: 20px;
	@media screen and (max-width: 992px) {
		flex-direction: column;
	}
`;

const UsersListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
	min-height: 350px;
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
const UsersListText = styled.p`
	color: #a6b0cf;
	font-size: 0.8125rem;
`;

const LicensesDetailsWrapper = styled.div`
	display: flex;
	@media screen and (max-width: 996px) {
		flex-direction: column;
	}
`;
const LicensesDetailsElement = styled.div`
	display: flex;
	width: 33.33%;
	flex-direction: column;
	margin-right: 20px;
	@media screen and (max-width: 996px) {
		width: 100%;
	}
`;

const LicensesDetailsAdvancedGroup = styled.div`
	display: flex;
	width: 100%;
`;

export default Licenses;
