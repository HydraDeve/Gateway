import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { AiOutlineEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { generateProductKey } from '../../../utils/Autofill';
import Countires from '../../../utils/Countries';
import HelmetHandler from '../../../utils/HelmetHandler';
import { Context } from '../../../utils/NavState';
import { notify_error, notify_success } from '../../../utils/Notifications';
import SmallBtn from '../../global/buttons/SmallBtn';
import '../../global/Datepicker.css';
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
	GlobalSelect,
	GlobalTextarea,
	MainWrapper,
	PageTitleContainer,
	PageTitleH4,
	PageTitleNav,
	PageTitleSpan,
} from '../../styles/GlobalStyles';

// Initial state
const initialState = {
	//* Essentials
	product: '0',
	products: [],
	licensekey: '',
	clientname: '',
	email: '',
	discordid: '',
	description: '',
	prefer_discord: false,

	//* Lifespan
	expires: 'false',
	expires_delete_after: false,
	expires_type: 1, //* 1 = days / 2 = date / 3 = times

	// Type 1 (Days)
	expires_days: 7,
	expires_start_on_first: true,

	// Type 2 (Date)
	expires_date: new Date(),

	// Type 3 (Times)
	expires_times: 1,

	//* IP-Settings
	ip_cap: 5,
	ip_expires: 7,
	ip_pre: [],
	ip_geo_lock: 'None',

	//* HWID-Settings
	hwid_cap: 5,
	hwid_expires: 30,

	//* Alert-settings
	receive_webhooks: true,
};

function CreateLicense() {
	const [navState] = useContext(Context);
	const [tags, setTags] = useState([]);
	const [preIPs, setPreIPs] = useState([]);
	const [customLicense, setCustomLicense] = useState(false);
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const { user } = auth;
	const [callback, setCallback] = useState(false);
	///////////////////////////////////////
	//*
	//*   States
	//*
	///////////////////////////////////////

	const [data, setData] = useState(initialState);

	const {
		product,
		products,
		licensekey,
		clientname,
		email,
		discordid,
		description,
		expires,
		expires_delete_after,
		expires_type,
		expires_days,
		expires_start_on_first,
		expires_date,
		expires_times,
		ip_cap,
		ip_expires,
		prefer_discord,
		ip_geo_lock,
		hwid_cap,
		hwid_expires,
		receive_webhooks,
	} = data;

	///////////////////////////////////////
	//*
	//*   Change input
	//*
	///////////////////////////////////////

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value, err: '', success: '' });
	};

	///////////////////////////////////////
	//*
	//*   Button handler
	//*
	///////////////////////////////////////

	const handleBtn = (e) => {
		// Decrease (dec), Increase (inc), Infinity (inf)
		e.preventDefault();
		const { value, name } = e.target;
		if (value === 'dec') {
			if (data[name] === '∞') {
				return setData({ ...data, [name]: initialState[name] });
			}
			if (parseInt(data[name]) > 1) {
				let new_value = parseInt(data[name]) - 1;
				return setData({ ...data, [name]: new_value });
			}
		}
		if (value === 'inc') {
			if (data[name] === '∞') {
				return setData({ ...data, [name]: initialState[name] });
			}
			if (parseInt(data[name]) >= 0) {
				let new_value = parseInt(data[name]) + 1;
				return setData({ ...data, [name]: new_value });
			}
		}
		if (value === 'inf') {
			return setData({ ...data, [name]: '∞' });
		}
	};

	///////////////////////////////////////
	//*
	//*   Autofill
	//*
	///////////////////////////////////////

	const autofill = async (e) => {
		e.preventDefault();
		const licensekey = await generateProductKey(5, 5);
		setData({ ...data, licensekey: licensekey });
	};

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
					setData({ ...data, products: res.data.products });
				}
			};
			getProducts();
		}
		return () => {
			unmounted = true;
		};
	}, [callback]);

	const renderProducts =
		products &&
		products.map(function (user) {
			return (
				<option value={user._id} key={user._id}>
					{user.name}
				</option>
			);
		});

	///////////////////////////////////////
	//*
	//*   Submit/cancel
	//*
	///////////////////////////////////////

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!product || !licensekey || !clientname) {
			return notify_error(
				'You must fill all required field in essentials'
			);
		}
		if (ip_cap === '0' || hwid_cap === '0') {
			return notify_error('HWID or IP-cap values cannot be zero.');
		}
		if (clientname.length < 3) {
			return notify_error(
				'Client name must be at least 3 characters long.'
			);
		}
		if (discordid !== '' && (discordid.length < 17 || discordid.length > 22)){
			return notify_error('Invalid DiscordID given.');
		}

		try {
			const res = await axios.post(
				'/api/users/createlicense',
				{ data, created_by: user.name, tags: tags, pre_ips: preIPs },
				{
					headers: { Authorization: token },
				}
			);
			setData(initialState);
			notify_success(res.data.msg);
			setTags([]);
			setPreIPs([]);
			setCallback(!callback);
		} catch (err) {
			err.response.data.msg && notify_error(err.response.data.msg);
		}
	};

	return (
		<>
			<HelmetHandler title="Create license - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<MainWrapper
				style={
					navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
				}
			>
				<PageTitleContainer>
					<PageTitleH4>Create license</PageTitleH4>
					<PageTitleNav>
						Management <PageTitleSpan>/</PageTitleSpan> Add new
					</PageTitleNav>
				</PageTitleContainer>

				<CreateLicenseWrapper>
					<CreateLicenseCol className="col1">
						<GlobalCardTitle>Essentials</GlobalCardTitle>
						<GlobalCardDesc>
							Here you need to provide basic data for your
							license!
						</GlobalCardDesc>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_product">
								Product
							</GlobalLabel>
							<GlobalSelect
								id="cl_product"
								name="product"
								onChange={handleChangeInput}
								value={product}
							>
								<option value="0" key="first">
									None
								</option>
								{products && renderProducts}
							</GlobalSelect>
						</CreateLicenseInputContainer>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_licensekey">
								Licensekey
							</GlobalLabel>
							<CreateLicenseAdvancedGroup>
								<GlobalInput
									name="licensekey"
									value={licensekey}
									readOnly={customLicense ? false : true}
									onChange={handleChangeInput}
									placeholder="Press autofill"
									id="cl_licensekey"
									disabled={product === '0' ? true : false}
								/>
								<SmallBtn
									text={<AiOutlineEdit />}
									color="#32394E"
									onClick={() =>
										setCustomLicense(!customLicense)
									}
									disabled={product === '0' ? true : false}
								/>
								<SmallBtn
									text="Autofill"
									onClick={autofill}
									disabled={product === '0' ? true : false}
								/>
							</CreateLicenseAdvancedGroup>
						</CreateLicenseInputContainer>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_clientname">
								Client name
							</GlobalLabel>
							<GlobalInput
								name="clientname"
								placeholder="Enter client name"
								value={clientname}
								onChange={handleChangeInput}
								id="cl_clientname"
								disabled={product === '0' ? true : false}
							/>
						</CreateLicenseInputContainer>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_email">
								Client Email
								<GlobalLabelOptional>
									(opt.)
								</GlobalLabelOptional>
							</GlobalLabel>
							<GlobalInput
								name="email"
								placeholder="Enter email address"
								value={email}
								onChange={handleChangeInput}
								id="cl_email"
								disabled={product === '0' ? true : false}
							/>
						</CreateLicenseInputContainer>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_discordid">
								Discord ID{' '}
								<GlobalLabelOptional>
									(opt.)
								</GlobalLabelOptional>
							</GlobalLabel>
							<GlobalInput
								name="discordid"
								placeholder="Enter DiscordID"
								value={discordid}
								type="number"
								onChange={handleChangeInput}
								id="cl_discordid"
								disabled={product === '0' ? true : false}
							/>
						</CreateLicenseInputContainer>
						{discordid.length >= 17 && discordid.length < 20 ? (
							<CreateLicenseInputContainer>
								<GlobalLabel htmlFor="cl_preference">
									Preferred name
									<GlobalLabelOptional>
										(opt.)
									</GlobalLabelOptional>
								</GlobalLabel>
								<GlobalSelect
									name="prefer_discord"
									onChange={handleChangeInput}
									value={prefer_discord}
								>
									<option value={false}>Client name</option>
									<option value={true}>
										Discord username
									</option>
								</GlobalSelect>
							</CreateLicenseInputContainer>
						) : null}
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_tags">
								Tags
								<GlobalLabelOptional>
									(opt.)
								</GlobalLabelOptional>
							</GlobalLabel>

							<TagsInput
								id="cl_tags"
								selectedTags={setTags}
								tags={tags}
								disabled={product}
							/>
						</CreateLicenseInputContainer>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_desc">
								Description
								<GlobalLabelOptional>
									(opt.)
								</GlobalLabelOptional>
							</GlobalLabel>

							<GlobalTextarea
								name="description"
								placeholder="Enter description"
								value={description}
								rows="1"
								maxLength="400"
								onChange={handleChangeInput}
								id="cl_description"
								disabled={product === '0' ? true : false}
							/>
						</CreateLicenseInputContainer>
					</CreateLicenseCol>
					<CreateLicenseCol className="col2">
						<GlobalCardTitle>Lifespan</GlobalCardTitle>
						<GlobalCardDesc>
							Here you need to give details about lifespan of your
							license. To make never expering license, set expires
							to false.
						</GlobalCardDesc>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_expires">
								Expires
							</GlobalLabel>
							<GlobalSelect
								name="expires"
								onChange={handleChangeInput}
								value={expires}
								id="cl_expires"
								disabled={product === '0' ? true : false}
							>
								<option value={false}>False</option>
								<option value={true}>True</option>
							</GlobalSelect>
						</CreateLicenseInputContainer>
						{expires === 'false' ? null : (
							<>
								<CreateLicenseInputContainer>
									<GlobalLabel htmlFor="cl_expires_type">
										Delete when expired
									</GlobalLabel>
									<GlobalSelect
										name="expires_delete_after"
										value={expires_delete_after}
										onChange={handleChangeInput}
										id="expires_delete_after"
										disabled={
											product === '0' ? true : false
										}
									>
										<option value={false}>False</option>
										<option value={true}>True</option>
									</GlobalSelect>
								</CreateLicenseInputContainer>
								<CreateLicenseInputContainer>
									<GlobalLabel htmlFor="cl_expires_type">
										Expiry type
									</GlobalLabel>
									<GlobalSelect
										name="expires_type"
										value={expires_type}
										onChange={handleChangeInput}
										id="cl_expires_type"
										disabled={
											product === '0' ? true : false
										}
									>
										<option value="1">Days</option>
										<option value="2">Date</option>
										<option value="3">Times</option>
									</GlobalSelect>
								</CreateLicenseInputContainer>
								{/* Expire type = days */}
								{expires_type === 1 || expires_type === '1' ? (
									<>
										<CreateLicenseInputContainer>
											<GlobalLabel htmlFor="cl_expires_days">
												Days
											</GlobalLabel>
											<CreateLicenseAdvancedGroup>
												<SmallBtn
													text="-"
													name="expires_days"
													value="dec"
													onClick={handleBtn}
													disabled={
														product === '0'
															? true
															: false
													}
												/>
												<GlobalInput
													name="expires_days"
													value={expires_days}
													onChange={handleChangeInput}
													disabled={
														product === '0'
															? true
															: false
													}
													type="number"
													min="1"
													id="cl_expires_days"
												/>
												<SmallBtn
													text="+"
													name="expires_days"
													value="inc"
													onClick={handleBtn}
													disabled={
														product === '0'
															? true
															: false
													}
												/>
											</CreateLicenseAdvancedGroup>
										</CreateLicenseInputContainer>
										<CreateLicenseInputContainer>
											<GlobalLabel htmlFor="cl_expires_start_on_first">
												Start expiring first start
											</GlobalLabel>
											<GlobalSelect
												name="expires_start_on_first"
												value={expires_start_on_first}
												onChange={handleChangeInput}
												id="cl_expires_start_on_first"
												disabled={
													product === '0'
														? true
														: false
												}
											>
												<option value={true}>
													True
												</option>
												<option value={false}>
													False
												</option>
											</GlobalSelect>
										</CreateLicenseInputContainer>
									</>
								) : null}
								{/* Expire type = date */}
								{expires_type === 2 || expires_type === '2' ? (
									<CreateLicenseInputContainer>
										<GlobalLabel htmlFor="cl_expires_date">
											Expiry date
										</GlobalLabel>
										<DatePicker
											selected={expires_date}
											minDate={new Date().setDate(
												new Date().getDate() + 1
											)}
											onChange={(date) =>
												setData({
													...data,
													expires_date: date,
												})
											}
										/>
									</CreateLicenseInputContainer>
								) : null}
								{/* Expire type = date */}
								{expires_type === 3 || expires_type === '3' ? (
									<CreateLicenseInputContainer>
										<GlobalLabel htmlFor="cl_expires_times">
											Times
										</GlobalLabel>
										<CreateLicenseAdvancedGroup>
											<SmallBtn
												text="-"
												name="expires_times"
												value="dec"
												onClick={handleBtn}
												disabled={
													product === '0'
														? true
														: false
												}
											/>

											<GlobalInput
												name="expires_times"
												value={expires_times}
												onChange={handleChangeInput}
												disabled={
													product === '0'
														? true
														: false
												}
												type="number"
												min="1"
												id="cl_expires_times"
											/>
											<SmallBtn
												text="+"
												name="expires_times"
												value="inc"
												onClick={handleBtn}
												disabled={
													product === '0'
														? true
														: false
												}
											/>
										</CreateLicenseAdvancedGroup>
									</CreateLicenseInputContainer>
								) : null}
							</>
						)}
					</CreateLicenseCol>
					<CreateLicenseCol className="col3">
						<GlobalCardTitle>IP-Settings</GlobalCardTitle>
						<GlobalCardDesc>
							Here you need to provide basic data for your
							license!
						</GlobalCardDesc>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_ip_cap">
								IP-Cap
							</GlobalLabel>
							<CreateLicenseAdvancedGroup>
								<SmallBtn
									text="-"
									name="ip_cap"
									value="dec"
									onClick={handleBtn}
									disabled={product === '0' ? true : false}
								/>

								{ip_cap === '∞' ? (
									<GlobalInput
										value={ip_cap}
										name="ip_cap"
										readOnly={true}
										id="cl_ip_cap"
									/>
								) : (
									<GlobalInput
										value={ip_cap}
										name="ip_cap"
										onChange={handleChangeInput}
										type="number"
										disabled={
											product === '0' ? true : false
										}
										min="1"
										id="cl_ip_cap"
									/>
								)}
								<SmallBtn
									text="∞"
									name="ip_cap"
									value="inf"
									onClick={handleBtn}
									disabled={product === '0' ? true : false}
									color="#32394E"
								/>

								<SmallBtn
									text="+"
									name="ip_cap"
									value="inc"
									onClick={handleBtn}
									disabled={product === '0' ? true : false}
								/>
							</CreateLicenseAdvancedGroup>
						</CreateLicenseInputContainer>
						{ip_cap === '∞' ? null : (
							<>
								<CreateLicenseInputContainer>
									<GlobalLabel htmlFor="cl_ip_expires">
										Days before IP expires
									</GlobalLabel>
									<CreateLicenseAdvancedGroup>
										<SmallBtn
											text="-"
											name="ip_expires"
											value="dec"
											onClick={handleBtn}
											disabled={
												product === '0' ? true : false
											}
										/>

										{ip_expires === '∞' ? (
											<GlobalInput
												value={ip_expires}
												name="ip_expires"
												readOnly={true}
												id="cl_ip_expires"
											/>
										) : (
											<GlobalInput
												value={ip_expires}
												name="ip_expires"
												onChange={handleChangeInput}
												type="number"
												disabled={
													product === '0'
														? true
														: false
												}
												min="1"
											/>
										)}
										<SmallBtn
											text="∞"
											name="ip_expires"
											value="inf"
											onClick={handleBtn}
											disabled={
												product === '0' ? true : false
											}
											color="#32394E"
										/>

										<SmallBtn
											text="+"
											name="ip_expires"
											value="inc"
											onClick={handleBtn}
											disabled={
												product === '0' ? true : false
											}
										/>
									</CreateLicenseAdvancedGroup>
								</CreateLicenseInputContainer>

								<CreateLicenseInputContainer>
									<GlobalLabel htmlFor="cl_pre_ips">
										Pre-defined IPs{' '}
										<GlobalLabelOptional>
											(opt.)
										</GlobalLabelOptional>
									</GlobalLabel>
									<TagsInput
										isIP={true}
										id="cl_pre_ips"
										name="preIPs"
										selectedTags={setPreIPs}
										tags={preIPs}
										disabled={product}
									/>
								</CreateLicenseInputContainer>
							</>
						)}
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_geo_lock">
								Geo localtion lock{' '}
								<GlobalLabelOptional>
									(opt.)
								</GlobalLabelOptional>
							</GlobalLabel>
							<GlobalSelect
								id="cl_geo_lock"
								name="ip_geo_lock"
								onChange={handleChangeInput}
								value={ip_geo_lock}
								disabled={product === '0' ? true : false}
							>
								<option value="None">None</option>
								<Countires />
							</GlobalSelect>
						</CreateLicenseInputContainer>
					</CreateLicenseCol>
					<CreateLicenseCol className="col4">
						<GlobalCardTitle>HWID-Settings</GlobalCardTitle>
						<GlobalCardDesc>
							Here you need to provide basic data for your
							license!
						</GlobalCardDesc>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_hwid_cap">
								HWID-Cap
							</GlobalLabel>
							<CreateLicenseAdvancedGroup>
								<SmallBtn
									text="-"
									name="hwid_cap"
									value="dec"
									onClick={handleBtn}
									disabled={product === '0' ? true : false}
								/>

								{hwid_cap === '∞' ? (
									<GlobalInput
										value={hwid_cap}
										name="hwid_cap"
										readOnly={true}
										id="cl_hwid_cap"
									/>
								) : (
									<GlobalInput
										value={hwid_cap}
										name="hwid_cap"
										onChange={handleChangeInput}
										type="number"
										disabled={
											product === '0' ? true : false
										}
										min="1"
										id="cl_hwid_cap"
									/>
								)}
								<SmallBtn
									text="∞"
									name="hwid_cap"
									value="inf"
									onClick={handleBtn}
									color="#32394E"
									disabled={product === '0' ? true : false}
								/>

								<SmallBtn
									text="+"
									name="hwid_cap"
									value="inc"
									onClick={handleBtn}
									disabled={product === '0' ? true : false}
								/>
							</CreateLicenseAdvancedGroup>
						</CreateLicenseInputContainer>
						{hwid_cap === '∞' ? null : (
							<CreateLicenseInputContainer>
								<GlobalLabel htmlFor="cl_hwid_expires">
									Days before HWID expires
								</GlobalLabel>
								<CreateLicenseAdvancedGroup>
									<SmallBtn
										text="-"
										name="hwid_expires"
										value="dec"
										onClick={handleBtn}
										disabled={
											product === '0' ? true : false
										}
									/>

									{hwid_expires === '∞' ? (
										<GlobalInput
											name="hwid_expires"
											value={hwid_expires}
											readOnly={true}
											id="cl_hwid_expires"
										/>
									) : (
										<GlobalInput
											name="hwid_expires"
											value={hwid_expires}
											onChange={handleChangeInput}
											type="number"
											disabled={
												product === '0' ? true : false
											}
											min="1"
											id="cl_hwid_expires"
										/>
									)}
									<SmallBtn
										text="∞"
										name="hwid_expires"
										value="inf"
										onClick={handleBtn}
										disabled={
											product === '0' ? true : false
										}
										color="#32394E"
									/>

									<SmallBtn
										text="+"
										name="hwid_expires"
										value="inc"
										onClick={handleBtn}
										disabled={
											product === '0' ? true : false
										}
									/>
								</CreateLicenseAdvancedGroup>
							</CreateLicenseInputContainer>
						)}
					</CreateLicenseCol>

					<CreateLicenseCol className="col5">
						<GlobalCardTitle>Alert settings</GlobalCardTitle>
						<GlobalCardDesc>
							Here you can modify alert settings for this license
							key!
						</GlobalCardDesc>
						<CreateLicenseInputContainer>
							<GlobalLabel htmlFor="cl_receive_webhooks">
								Receive webhooks
							</GlobalLabel>
							<GlobalSelect
								id="cl_receive_webhooks"
								name="receive_webhooks"
								onChange={handleChangeInput}
								value={receive_webhooks}
								disabled={product === '0' ? true : false}
							>
								<option value={true}>True</option>
								<option value={false}>False</option>
							</GlobalSelect>
						</CreateLicenseInputContainer>
					</CreateLicenseCol>

					<CreateLicenseCol className="col6">
						<GlobalCardTitle>Submit license</GlobalCardTitle>
						<GlobalCardDesc>
							Double check your license details before submitting!
						</GlobalCardDesc>
						<CreateLicenseAdvancedGroup style={{ gap: '10px' }}>
							<SmallBtn
								text="Submit"
								disabled={product === '0' ? true : false}
								id="cl_submit"
								type="submit"
								onClick={handleSubmit}
							/>

							<SmallBtn
								text="Cancel"
								disabled={product === '0' ? true : false}
								id="cl_cancel"
								onClick={() => {
									setData(initialState);
									setTags([]);
									setPreIPs([]);
									setCallback(!callback);
								}}
								txtcolor="black"
								color="#a6b0cf"
							/>
						</CreateLicenseAdvancedGroup>
					</CreateLicenseCol>
				</CreateLicenseWrapper>

				<Footer />
			</MainWrapper>
		</>
	);
}

const CreateLicenseWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);
`;
const CreateLicenseCol = styled.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
`;

const CreateLicenseInputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 1rem;
	@media screen and (max-width: 1200px) {
		gap: 5px;
		align-items: flex-start;
		flex-direction: column;
	}
`;

const CreateLicenseAdvancedGroup = styled.div`
	display: flex;
	width: 100%;
`;

export default CreateLicense;
