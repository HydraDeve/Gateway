import { Menu, MenuItem, withStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useContext } from 'react';
import { BiBell } from 'react-icons/bi';
/* React-icons */
import { FiMenu, FiSettings } from 'react-icons/fi';
import { MdCenterFocusWeak } from 'react-icons/md';
import { RiArrowDropDownLine, RiShieldKeyholeLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../../utils/NavState';

function NavbarHeader({ sendNavStatus, NavStatus }) {
	const [navState, setNavState] = useContext(Context);
	let elem = document.documentElement;

	const auth = useSelector((state) => state.auth);
	const { user } = auth;

	// Material UI profile popup
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const CustomMenu = withStyles({
		paper: {
			border: '1px solid var(--ul-main)',
			backgroundColor: 'var(--ul-second)',
			color: '#a6b0cf',
		},
	})((props) => (
		<Menu
			elevation={0}
			getContentAnchorEl={null}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			{...props}
		/>
	));
	const CustomMenuItem = withStyles((theme) => ({
		root: {
			fontSize: '0.9125rem',
			color: '#a6b0cf',
		},
	}))(MenuItem);

	// Handle logout
	const handleLogout = async () => {
		try {
			await axios.get('/api/users/logout');
			localStorage.removeItem('firstLogin');
			window.location.href = '/';
		} catch (err) {
			window.location.href = '/';
		}
	};

	/* Open fullscreen */
	function openFullscreen() {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE11 */
			elem.msRequestFullscreen();
		}
	}
	/* Close fullscreen */
	function closeFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			/* Safari */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE11 */
			document.msExitFullscreen();
		}
	}
	/* Toggle fullscreen */
	function toggleFullscreen() {
		if (
			(document.fullScreenElement !== undefined &&
				document.fullScreenElement === null) ||
			(document.msFullscreenElement !== undefined &&
				document.msFullscreenElement === null) ||
			(document.mozFullScreen !== undefined && !document.mozFullScreen) ||
			(document.webkitIsFullScreen !== undefined &&
				!document.webkitIsFullScreen)
		) {
			openFullscreen();
		} else {
			closeFullscreen();
		}
	}
	return (
		<NavbarTop>
			<NavbarWrapper>
				<NavbarElement>
					{navState ? (
						<BrandingBox style={{ width: '70px' }}>
							<RiShieldKeyholeLine />
						</BrandingBox>
					) : (
						<BrandingBox>
							<RiShieldKeyholeLine />
							<BrandingTitle>GateWay</BrandingTitle>
						</BrandingBox>
					)}
					<NavbarMenuBtn
						onClick={() => {
							setNavState(!NavStatus);
						}}
					>
						<FiMenu />
					</NavbarMenuBtn>
				</NavbarElement>
				<NavbarElement>
					<NavbarMenuBtn onClick={toggleFullscreen}>
						<MdCenterFocusWeak />
					</NavbarMenuBtn>
					<NavbarMenuBtn>
						<BiBell />
					</NavbarMenuBtn>
					<NavbarMenuBtn onClick={handleClick}>
						<NavbarUserImg
							src={
								user.image
									? `/images/${user.image}`
									: `/images/default.png`
							}
						/>
						<NavbarUserLabel>{user.name}</NavbarUserLabel>
						<RiArrowDropDownLine />
					</NavbarMenuBtn>
					<CustomMenu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<Link to="settings">
							<CustomMenuItem>Settings</CustomMenuItem>
						</Link>
						<CustomMenuItem onClick={handleLogout}>
							Logout
						</CustomMenuItem>
					</CustomMenu>
					<NavbarMenuBtn>
						<Link
							to="settings"
							style={{
								display: 'flex',
								alignItems: 'center',
								TextDecoration: 'none',
								color: 'var(--ul-purple)',
							}}
						>
							<FiSettings />
						</Link>
					</NavbarMenuBtn>
				</NavbarElement>
			</NavbarWrapper>
		</NavbarTop>
	);
}

/* Navbar styling */
const NavbarTop = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	z-index: 1002;
	background-color: #262b3c;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
`;
const NavbarWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: var(--ul-third);
	height: 70px;
`;
const NavbarElement = styled.div`
	display: flex;
`;

/* Navbar left-side elements */
const BrandingBox = styled.div`
	background-color: var(--ul-second);
	width: 250px;
	display: flex;
	gap: 3px;
	justify-content: center;
	align-items: center;
	svg {
		font-size: 20px;
		color: var(--ul-highlight-main);
	}
	@media screen and (max-width: 992px) {
		width: 70px;
	}
`;
const BrandingTitle = styled.h1`
	color: #fff;
	font-size: 20px;
	@media screen and (max-width: 992px) {
		display: none;
	}
`;

const NavbarMenuBtn = styled.button`
	font-size: 20px;
	background-color: transparent;
	outline: none;
	border: none;
	color: var(--ul-purple);
	cursor: pointer;
	padding: 0 16px;

	display: flex;
	align-items: center;
	/* Hiden focus button for mobile */
	@media screen and (max-width: 992px) {
		:nth-child(1) {
			display: none;
		}
	}
`;

/* Navbar right-side elements */

const NavbarUserLabel = styled.span`
	font-size: 0.8125rem;
	margin-left: 0.25rem;
`;
const NavbarUserImg = styled.img`
	border-radius: 50%;
	padding: 3px;
	background-color: #32394e;
	height: 36px;
`;

export default NavbarHeader;
