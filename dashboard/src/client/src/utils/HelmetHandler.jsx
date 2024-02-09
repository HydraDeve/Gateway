import React from 'react';
import { Helmet } from 'react-helmet-async';
function HelmetHandler(props) {
	return (
		<React.Fragment>
			<Helmet>
				<title>{props.title}</title>
				<meta charset="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					name="description"
					content="GateWay makes it easy to license almost any application! Unique features, fair price point and fast support makes us an easy choice! Secure your application now!"
				/>
				<meta
					name="keywords"
					content="license, security, easy, powerful, software, application, plugin, protection"
				/>
				<meta name="author" content="GateWay | Development Team" />
			</Helmet>
		</React.Fragment>
	);
}

export default HelmetHandler;
