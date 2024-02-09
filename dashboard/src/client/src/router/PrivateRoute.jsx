import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ isLogged, loading, component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (loading && localStorage.key('firstLogin')) {
					return null;
				}
				if (isLogged) {
					return <Component />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/',
								state: { from: props.location },
							}}
						/>
					);
				}
			}}
		/>
	);
}

export default PrivateRoute;
