import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
	return (
		<FooterWrapper>
			<FooterContent>
				<FooterElement>GateWay &copy; 2023</FooterElement>
				<FooterLink
					to={{
						pathname: 'https://discord.gg/license',
					}}
					target="_blank"
				>
					Support Discord
				</FooterLink>
			</FooterContent>
		</FooterWrapper>
	);
}

/* Footer styling */
const FooterWrapper = styled.div`
	bottom: 0;
	padding: 20px 12px;
	position: absolute;
	right: 0;
	width: 100%;
	height: 60px;
	background-color: var(--ul-third);
	@media screen and (max-width: 992px) {
		left: 0;
	}
`;
const FooterContent = styled.div`
	display: flex;
	justify-content: space-between;
`;
const FooterElement = styled.p`
	color: var(--ul-purple);
	font-size: 13px;
`;
const FooterLink = styled(Link)`
	color: var(--ul-purple);
	font-size: 13px;
`;

export default Footer;
