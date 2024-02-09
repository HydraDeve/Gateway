/* 

This is used to share navigation state between 
verticalbar & navbar since they are separate
components!

*/

import React, { useState } from 'react';

export const Context = React.createContext();

const NavState = ({ children }) => {
	const [navState, setNavState] = useState(false);
	return (
		<Context.Provider value={[navState, setNavState]}>
			{children}
		</Context.Provider>
	);
};

export default NavState;
