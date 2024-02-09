import styled from 'styled-components';

/* Main wrapper for every page */
export const MainWrapper = styled.div`
	margin-left: 250px;
	padding: 94px 12px 60px;
	position: relative;
	min-height: 100vh;

	// Material UI
	.MuiTypography-body1 {
		color: #a6b0cf;
		font-weight: 400;
		font-size: 0.8125rem;
		font-family: 'Poppins', sans-serif;
	}
	.MuiSwitch-track {
		background-color: #15161a;
	}

	.MuiPaginationItem-root {
		color: #a6b0cf;
	}

	.MuiSkeleton-root {
		background-color: #32394e;
	}

	@media screen and (max-width: 992px) {
		margin-left: 0px !important;
	}

	// Disabled inputs
	input:disabled,
	select:disabled,
	textarea:disabled {
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

/* Main title for every page */
export const PageTitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: 12px;
	margin-right: 12px;
	padding-bottom: 12px;
`;
export const PageTitleH4 = styled.h4`
	text-transform: uppercase;
	font-weight: 600;
	font-size: 16px;
	color: #fff;
`;
export const PageTitleNav = styled.p`
	color: #f6f6f6;
	font-size: 0.8125rem;
	font-weight: 400;
`;
export const PageTitleSpan = styled.span`
	color: gray;
	font-size: 0.6125rem;
	font-weight: 400;
`;

// Global card styling
export const GlobalCardTitle = styled.h4`
	font-size: 15px;
	margin: 0 0 7px;
	font-weight: 600;
	color: #f6f6f6;
`;
export const GlobalCardDesc = styled.p`
	color: #a6b0cf;
	margin-bottom: 24px;
	font-size: 0.8125rem;
	font-weight: 400;
`;

export const GlobalSelect = styled.select`
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

	&:disabled {
		cursor: not-allowed;
	}
`;

export const GlobalInput = styled.input`
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

export const GlobalLabel = styled.label`
	color: #a6b0cf;
	font-weight: 500;
	font-size: 0.8125rem;
	margin-top: 10px;
	width: 200px;
	@media screen and (max-width: 1200px) {
		width: auto;
	}
`;

export const GlobalLabelOptional = styled.span`
	color: #8c909b;
	font-weight: 500;
	font-size: 0.6125rem;
	font-style: italic;
`;

export const GlobalBtn = styled.button`
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

export const GlobalPaginationContainer = styled.div`
	position: absolute;
	right: 16px;
	bottom: 16px;
	@media screen and (max-width: 450px) {
		right: 0;
		bottom: 0;
		position: relative;
		display: flex;
		justify-content: center;
	}
`;

export const GlobalSearchInput = styled.input`
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

export const GlobalTextarea = styled.textarea`
	display: block;
	width: 100%;
	padding: 0.47rem 0.75rem;
	font-size: 0.8125rem;
	font-weight: 400;
	line-height: 1.5;
	color: #bfc8e2;
	max-height: 150px;
	background-color: #2e3446;
	background-clip: padding-box;
	border: 1px solid #32394e;
	resize: vertical;
	-webkit-appearance: none;
	appearance: none;
	border-radius: 0.25rem;
	outline: none;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
