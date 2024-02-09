import axios from 'axios';
import React, { useContext } from 'react';
/* React-icons */
import {
	BiAddToQueue,
	BiBlock,
	BiHomeCircle,
	BiUserPlus,
} from 'react-icons/bi';
import { GoSettings } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiShutDownLine, RiStackLine } from 'react-icons/ri';
import { VscDebugConsole } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../../utils/NavState';

function VerticalMenu() {
	const [navState, setNavState] = useContext(Context);

	const handleLogout = async () => {
		try {
			await axios.get('/api/users/logout');
			localStorage.removeItem('firstLogin');
			window.location.href = '/';
		} catch (err) {
			window.location.href = '/';
		}
	};

	const mobileClick = async () => {
		try {
			if (window.innerWidth < 1200) {
				setNavState(!navState);
			}
		} catch (error) {

		}
	};

	return (
		<>
			{navState ? (
				<VerticalMenuWrapper style={{ width: '70px' }}>
					<VerticalMenuList>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/dashboard"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<BiHomeCircle />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/licenses"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<GoSettings />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/add-new"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<BiAddToQueue />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/blacklist"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<BiBlock />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/users"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<BiUserPlus />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/products"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<RiStackLine />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/console"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<VscDebugConsole />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement>
							<VerticalMenuLink
								exact
								to="/settings"
								activeStyle={{}}
								onClick={mobileClick}
							>
								<IoSettingsOutline />
							</VerticalMenuLink>
						</VerticalMenuListElement>
						<VerticalMenuListElement onClick={handleLogout}>
							<VerticalMenuLink exact to="/">
								<RiShutDownLine />
							</VerticalMenuLink>
						</VerticalMenuListElement>
					</VerticalMenuList>
				</VerticalMenuWrapper>
			) : (
				<VerticalMenuDisplay>
					<VerticalMenuWrapper className="vertical-big">
						<VerticalMenuList>
							<VerticalMenuListElement>
								<VerticalMenuTitle>Home</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/dashboard"
									activeStyle={{}}
								>
									<BiHomeCircle />
									<VerticalMenuLinkText>
										Dashboard
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuTitle>
									Management
								</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/licenses"
									activeStyle={{}}
								>
									<GoSettings />
									<VerticalMenuLinkText>
										Licenses
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/add-new"
									activeStyle={{}}
								>
									<BiAddToQueue />
									<VerticalMenuLinkText>
										Add new
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/blacklist"
									activeStyle={{}}
								>
									<BiBlock />
									<VerticalMenuLinkText>
										Blacklist
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/users"
									activeStyle={{}}
								>
									<BiUserPlus />
									<VerticalMenuLinkText>
										Users
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuTitle>Team</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/products"
									activeStyle={{}}
								>
									<RiStackLine />
									<VerticalMenuLinkText>
										Products
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/console"
									activeStyle={{}}
								>
									<VscDebugConsole />
									<VerticalMenuLinkText>
										Console
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>

							<VerticalMenuListElement>
								<VerticalMenuTitle>Profile</VerticalMenuTitle>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									exact
									to="/settings"
									activeStyle={{}}
								>
									<IoSettingsOutline />
									<VerticalMenuLinkText>
										Settings
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
							<VerticalMenuListElement>
								<VerticalMenuLink
									onClick={handleLogout}
									exact
									to="/"
								>
									<RiShutDownLine />
									<VerticalMenuLinkText>
										Logout
									</VerticalMenuLinkText>
								</VerticalMenuLink>
							</VerticalMenuListElement>
						</VerticalMenuList>
					</VerticalMenuWrapper>
				</VerticalMenuDisplay>
			)}
		</>
	);
}

/* VerticalMenu styling */
const VerticalMenuWrapper = styled.div`
	width: 250px;
	z-index: 1420;
	bottom: 0;
	margin-top: 0;
	position: fixed;
	top: 70px;
	box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
	background-color: var(--ul-second);
	padding: 10px 0 30px;
	@media screen and (max-width: 992px) {
		height: 100%;
	}
`;

const VerticalMenuDisplay = styled.div`
	@media screen and (max-width: 992px) {
		display: none;
	}
`;

const VerticalMenuTitle = styled.p`
	padding: 12px 20px;
	letter-spacing: 0.05em;
	pointer-events: none;
	cursor: default;
	font-size: 11px;
	text-transform: uppercase;
	color: #6a7187;
	font-weight: 600;
`;

const VerticalMenuList = styled.ul``;

const VerticalMenuListElement = styled.li`
	display: block;
	width: 100%;
	:hover {
		svg,
		span {
			color: #f6f6f6;
		}
	}
`;
const VerticalMenuLink = styled(NavLink)`
	display: flex;
	align-items: center;
	padding: 0.625rem 1.45rem;
	color: #a6b0cf;
	position: relative;
	font-size: 13px;
	transition: all 0.4s;
	svg {
		display: inline-block;
		min-width: 1.5rem;
		font-size: 1.5rem;
		line-height: 1.40625rem;
		vertical-align: middle;
		text-align: center;
		color: #6a7187;
		transition: all 0.4s;
		margin-right: 8px;
	}
	&.active {
		span,
		svg {
			color: #f6f6f6;
		}
	}
	@media screen and (max-width: 992px) {
		padding: 0.925rem 1.45rem;
	}
`;
const VerticalMenuLinkText = styled.span`
	color: var(--ul-purple);
	font-size: 13px;
	font-weight: 400;
	transition: all 0.4s;
`;

export default VerticalMenu;
