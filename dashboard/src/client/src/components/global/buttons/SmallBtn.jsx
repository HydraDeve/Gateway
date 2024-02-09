import { ButtonBase } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

function SmallBtn(props) {
	const background = {
		background: props.color ? props.color : 'primary',
	};
	const color = {
		color: props.txtcolor ? props.txtcolor : '',
	};

	return (
		<ButtonBase component="div">
			<SmallButton
				style={{ ...color, ...background }}
				name={props.name}
				value={props.value}
				onClick={(e) => props.onClick(e)}
				disabled={props.disabled}
			>
				{props.text}
			</SmallButton>
		</ButtonBase>
	);
}

const SmallButton = styled.button`
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
	@media screen and (max-width: 996px) {
		width: 100%;
	}
`;

export default SmallBtn;
