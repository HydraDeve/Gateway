import React from 'react';
import { Redirect } from 'react-router-dom';

function RedirectHandler() {
	return <Redirect to="/dashboard" />;
}

export default RedirectHandler;
