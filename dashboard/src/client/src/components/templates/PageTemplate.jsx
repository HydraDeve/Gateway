import React, { useContext } from 'react';
import { Context } from '../../utils/NavState';
import NavbarHeader from '../global/NavbarHeader';
import VerticalMenu from '../global/VerticalMenu';
import {
	MainWrapper,
	PageTitleContainer,
	PageTitleH4,
} from '../styles/GlobalStyles';

function PageTemplate() {
	const [navState] = useContext(Context);
	return (
		<>
			<NavbarHeader NavStatus={navState} />
			<VerticalMenu NavStatus={navState} />
			<MainWrapper
				style={
					navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
				}
			>
				<PageTitleContainer>
					<PageTitleH4>Blacklist</PageTitleH4>
				</PageTitleContainer>
			</MainWrapper>
		</>
	);
}

export default PageTemplate;
