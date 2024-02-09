import { Skeleton } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaSortAmountUp } from 'react-icons/fa';
import { ImBin, ImClipboard, ImPencil } from 'react-icons/im';
import { useSelector } from 'react-redux';
import { animated, config, useSpring } from 'react-spring';
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
	price: '',
	version: '',
};

function Products() {
	const [navState] = useContext(Context);
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	const [callback, setCallback] = useState(false);

	///////////////////////////////////////
	//*
	//*   States
	//*
	///////////////////////////////////////

	const [loading, setLoading] = useState(true);
	const skeletonamount = 5;

	const [data, setData] = useState(initialState);

	const [products, setProducts] = useState();
	const [latest, setLatest] = useState();
	const [editing, setEditing] = useState();

	const { name, price, version } = data;

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
	//*   Change input
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
	//*   Submit
	//*
	///////////////////////////////////////

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !price || !version)
			return notify_error('You must fill all fields');
		if (isNaN(price)) {
			return notify_error('Invalid price');
		}

		try {
			const res = await axios.post(
				'/api/users/createproduct',
				{ data, created_by: user.name },
				{
					headers: { Authorization: token },
				}
			);
			setData(initialState);
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
			editing.price === '' ||
			editing.discount === '' ||
			editing.version === ''
		)
			return notify_error('Edited fields cannot be empty');
		if (isNaN(editing.price)) {
			return notify_error('Invalid price');
		}

		try {
			const res = await axios.post(
				'/api/users/updateproduct',
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
					setLatest(res.data.latest);
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
	//*   Handle delete
	//*
	///////////////////////////////////////

	const handleDelete = async (product) => {
		try {
			const res = await axios.post(
				`/api/users/deleteproduct`,
				{
					product: product,
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

	const handleEdit = async (product) => {
		if (editing) {
			return setEditing(null);
		} else {
			setEditing(product);
		}
	};

	///////////////////////////////////////
	//*
	//*   Pagination
	//*
	///////////////////////////////////////

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(8);

	const handlePageChange = async (event, page) => {
		event.preventDefault();
		setCurrentPage(page);
	};

	const renderProductsFull = () => {
		if (!products) {
			return null;
		}
		if (products.length === 0) {
			return (
				<p style={{ color: '#a6b0cf', padding: '12px' }}>
					No results...
				</p>
			);
		}
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOFirstPost = indexOfLastPost - postsPerPage;
		const currentPosts = products.slice(indexOFirstPost, indexOfLastPost);

		return currentPosts.map((product) => (
			<div className="keygroup" key={product._id}>
				{editing?._id === product._id ? (
					<ProductsListElement>
						<EditingContainer>
							<EditingInput
								value={editing.name}
								name="name"
								onChange={handleEditChange}
							/>
						</EditingContainer>
						<EditingContainer>
							<EditingInput
								value={editing.price}
								type="number"
								name="price"
								onChange={handleEditChange}
							/>
						</EditingContainer>
						<EditingContainer>
							<EditingInput
								value={editing.version}
								name="version"
								onChange={handleEditChange}
							/>
						</EditingContainer>
						<EditingContainer>
							<EditingInput
								value={editing.discount}
								type="number"
								name="discount"
								onChange={handleEditChange}
							/>
						</EditingContainer>
						<ProductsListText>
							{product.total_purchases}
						</ProductsListText>
						<ProductsListText>
							€{product.total_gross.toFixed(2)}
						</ProductsListText>
						<ProductsListBtnContainer>
							<ImPencil onClick={() => handleEdit(product)} />
							<ImBin onClick={() => handleDelete(product._id)} />
							<ImClipboard onClick={handleEditSubmit} />
						</ProductsListBtnContainer>
					</ProductsListElement>
				) : (
					<ProductsListElement>
						<ProductsListText>{product.name}</ProductsListText>
						<ProductsListText>
							€{product.price.toFixed(2)}
						</ProductsListText>
						<ProductsListText>{product.version}</ProductsListText>
						<ProductsListText>
							{product.discount.toFixed(2)}%
						</ProductsListText>
						<ProductsListText>
							{product.total_purchases}
						</ProductsListText>
						<ProductsListText>
							€{product.total_gross.toFixed(2)}
						</ProductsListText>
						<ProductsListBtnContainer>
							<ImPencil onClick={() => handleEdit(product)} />
							<ImBin onClick={() => handleDelete(product._id)} />
						</ProductsListBtnContainer>
					</ProductsListElement>
				)}
			</div>
		));
	};

	const renderProductsMobile = () => {
		if (!products) {
			return null;
		}
		if (products.length === 0) {
			return (
				<p style={{ color: '#a6b0cf', padding: '12px' }}>
					No results...
				</p>
			);
		}
		const indexOfLastPost = currentPage * postsPerPage;
		const indexOFirstPost = indexOfLastPost - postsPerPage;
		const currentPosts = products.slice(indexOFirstPost, indexOfLastPost);

		return currentPosts.map((product) => (
			<div className="keygroup" key={`${product._id}-mobile`}>
				{editing?._id === product._id ? (
					<div className="mobile-margin" key={product._id}>
						<ProductsListElementEditing
							style={{
								backgroundColor: '#32394e',
								fontWeight: '600',
							}}
						>
							<EditingInput
								value={editing.name}
								name="name"
								onChange={handleEditChange}
							/>
						</ProductsListElementEditing>
						<ProductsListElementEditing>
							<ProductsListTextMobile>
								Price
							</ProductsListTextMobile>
							<EditingInput
								value={editing.price}
								type="number"
								name="price"
								onChange={handleEditChange}
							/>
						</ProductsListElementEditing>
						<ProductsListElementEditing>
							<ProductsListTextMobile>
								Version
							</ProductsListTextMobile>
							<EditingInput
								value={editing.version}
								name="version"
								onChange={handleEditChange}
							/>
						</ProductsListElementEditing>
						<ProductsListElementEditing>
							<ProductsListTextMobile>
								Discount
							</ProductsListTextMobile>
							<EditingInput
								value={editing.discount}
								type="number"
								name="discount"
								onChange={handleEditChange}
							/>
						</ProductsListElementEditing>
						<ProductsListElement>
							<ProductsListTextMobile>
								Total sales
							</ProductsListTextMobile>
							<ProductsListTextMobile>
								{product.total_purchases}
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Profit
							</ProductsListTextMobile>
							<ProductsListTextMobile>
								€{product.total_gross.toFixed(2)}
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Manage
							</ProductsListTextMobile>
							<ProductsListBtnContainer>
								<ImPencil onClick={() => handleEdit(product)} />
								<ImBin
									onClick={() => handleDelete(product._id)}
								/>
								<ImClipboard onClick={handleEditSubmit} />
							</ProductsListBtnContainer>
						</ProductsListElement>
					</div>
				) : (
					<div className="mobile-margin" key={product._id}>
						<ProductsListElement
							style={{
								backgroundColor: '#32394e',
								fontWeight: '600',
							}}
						>
							<ProductsListTextMobile>
								{product.name}
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Price
							</ProductsListTextMobile>
							<ProductsListTextMobile>
								€{product.price.toFixed(2)}
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Version
							</ProductsListTextMobile>
							<ProductsListTextMobile>
								{product.version}
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Discount
							</ProductsListTextMobile>
							<ProductsListTextMobile>
								{product.discount.toFixed(2)}%
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Total sales
							</ProductsListTextMobile>
							<ProductsListTextMobile>
								{product.total_purchases}
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Profit
							</ProductsListTextMobile>
							<ProductsListTextMobile>
								€{product.total_gross.toFixed(2)}
							</ProductsListTextMobile>
						</ProductsListElement>
						<ProductsListElement>
							<ProductsListTextMobile>
								Manage
							</ProductsListTextMobile>
							<ProductsListBtnContainer>
								<ImPencil onClick={() => handleEdit(product)} />
								<ImBin
									onClick={() => handleDelete(product._id)}
								/>
							</ProductsListBtnContainer>
						</ProductsListElement>
					</div>
				)}
			</div>
		));
	};
	return (
		<>
			<HelmetHandler title="Products - GateWay" />
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<MainWrapper
				style={
					navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
				}
			>
				<PageTitleContainer>
					<PageTitleH4>Products</PageTitleH4>
					<PageTitleNav>
						Management <PageTitleSpan>/</PageTitleSpan> Products
					</PageTitleNav>
				</PageTitleContainer>
				<ProductsWrapper>
					<ProductsCol className="col1">
						<ProductsCardTitle>Create new</ProductsCardTitle>
						<ProductsCardDesc>
							Here you can create a new product!
						</ProductsCardDesc>
						<ProductsInputWrapper>
							<ProductsInput
								name="name"
								onChange={handleChangeInput}
								value={name}
								placeholder="Name"
							/>

							<ProductsInput
								name="version"
								onChange={handleChangeInput}
								value={version}
								placeholder="Version"
							/>
							<ProductsInputContainer>
								<ProductsSpan>€</ProductsSpan>
								<ProductsInput
									name="price"
									onChange={handleChangeInput}
									value={price}
									type="number"
									placeholder="Price"
								/>
							</ProductsInputContainer>
							<ProductsBtn onClick={handleSubmit}>
								Submit
							</ProductsBtn>
						</ProductsInputWrapper>
					</ProductsCol>
					<ProductsCol className="col2">
						<SmallCardContainer>
							<SmallCardElement>
								<SmallCardTitle>Latest product</SmallCardTitle>
								<SmallCardH4>
									{loading ? (
										<>
											<animated.div style={fadeLoader}>
												<Skeleton
													animation="wave"
													width={'100%'}
													height={'30px'}
												/>
											</animated.div>
										</>
									) : (
										<animated.div style={fadeElement}>
											{latest || 'No products'}
										</animated.div>
									)}
								</SmallCardH4>
							</SmallCardElement>
							<SmallCardElement>
								<SmallCardSpan>
									<FaSortAmountUp />
								</SmallCardSpan>
							</SmallCardElement>
						</SmallCardContainer>
					</ProductsCol>
					<ProductsCol className="col3">
						<ProductsCardTitle>Products</ProductsCardTitle>
						<ProductsCardDesc>
							Here are your current products!
						</ProductsCardDesc>
						<ProductsListWrapper className="products-desktop">
							<ProductsListElement
								style={{
									backgroundColor: '#32394e',
									fontWeight: '600',
								}}
							>
								<ProductsListText>Product</ProductsListText>
								<ProductsListText>Price</ProductsListText>
								<ProductsListText>Version</ProductsListText>
								<ProductsListText>Discount</ProductsListText>
								<ProductsListText>Total sales</ProductsListText>
								<ProductsListText>Profit</ProductsListText>
								<ProductsListText>Manage</ProductsListText>
							</ProductsListElement>

							{loading ? (
								<>
									<animated.div style={fadeLoader}>
										{[...Array(skeletonamount)].map(
											(elementInArray, index) => (
												<ProductsListElement
													key={index}
												>
													<ProductsListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'90%'}
														/>
													</ProductsListText>
													<ProductsListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'90%'}
														/>
													</ProductsListText>
													<ProductsListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'90%'}
														/>
													</ProductsListText>
													<ProductsListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'90%'}
														/>
													</ProductsListText>
													<ProductsListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'90%'}
														/>
													</ProductsListText>
													<ProductsListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'90%'}
														/>
													</ProductsListText>
													<ProductsListText>
														<Skeleton
															animation="wave"
															width={'90%'}
															height={'90%'}
														/>
													</ProductsListText>
												</ProductsListElement>
											)
										)}
									</animated.div>
								</>
							) : (
								<animated.div style={fadeElement}>
									{renderProductsFull()}
								</animated.div>
							)}
						</ProductsListWrapper>

						<ProductsListWrapper className="products-mobile">
							{renderProductsMobile()}
						</ProductsListWrapper>
						<PaginationContainer>
							{products ? (
								<Pagination
									size={
										window.innerWidth < 450
											? 'small'
											: 'medium'
									}
									count={Math.ceil(products.length / 8)}
									onChange={handlePageChange}
									page={currentPage}
									color="primary"
								/>
							) : null}
						</PaginationContainer>
					</ProductsCol>
				</ProductsWrapper>
				<Footer />
			</MainWrapper>
		</>
	);
}

const ProductsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	padding: 12px 12px 24px 12px;
	grid-gap: 24px;
	grid-auto-rows: minmax(120px, auto);

	.col3 {
		min-height: calc(100vh - 400px);
	}

	// Colums
	.col1 {
		grid-column: 1/5;
		@media screen and (max-width: 1200px) {
			grid-column: 1/6;
		}
	}
	.col2 {
		grid-column: 5/6;
		@media screen and (max-width: 1200px) {
			grid-column: 1/6;
		}
	}
`;
const ProductsCol = styled.div`
	background-color: var(--ul-second);
	border-radius: 0.25rem;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	grid-column: 1/6;
	padding: 16px;
	overflow-x: hidden;

	.MuiPaginationItem-root {
		color: #a6b0cf;
	}

	.products-mobile {
		display: none;
	}
	.products-desktop {
		height: calc(100% - 130px);
	}
	.mobile-margin {
		&:not(:first-child) {
			margin-top: 20px;
		}
	}
	@media screen and (max-width: 996px) {
		.products-desktop {
			display: none;
		}
		.products-mobile {
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

const ProductsCardTitle = styled.h4`
	font-size: 15px;
	margin: 0 0 7px;
	font-weight: 600;
	color: #f6f6f6;
`;
const ProductsCardDesc = styled.p`
	color: #a6b0cf;
	margin-bottom: 24px;
	font-size: 0.8125rem;
	font-weight: 400;
`;

const ProductsInput = styled.input`
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
	width: 14.2857%;
`;

const ProductsBtn = styled.button`
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

const ProductsSpan = styled.span`
	display: flex;
	align-items: center;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	text-align: center;
	white-space: nowrap;
	background-color: #32394e;
	border: 1px solid #32394e;
	border-radius: 0.25rem;
`;
const ProductsInputContainer = styled.div`
	position: relative;
	display: flex;
	width: 100%;
`;

const ProductsInputWrapper = styled.div`
	display: flex;
	width: 100%;
	max-width: 1000px;
	gap: 20px;
	@media screen and (max-width: 1200px) {
		flex-direction: column;
	}
`;
const ProductsListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.8125rem;
	font-weight: 400;
`;

const ProductsListElement = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 12px;
	border-bottom: 1px solid #32394e;
	@media screen and (max-width: 996px) {
		justify-content: space-between;
	}
`;

const ProductsListElementEditing = styled.div`
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

const ProductsListTextMobile = styled.p`
	color: #a6b0cf;
`;

const ProductsListText = styled.p`
	color: #a6b0cf;
	width: 14.2857%;
`;

const ProductsListBtnContainer = styled.div`
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

export default Products;
