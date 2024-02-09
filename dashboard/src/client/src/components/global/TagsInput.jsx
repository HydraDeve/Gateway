///////////////////////////////////////
//*
//*   Tags input
//*
///////////////////////////////////////

import React from 'react';
import styled from 'styled-components';
import { notify_error } from '../../utils/Notifications';

export const TagsInput = (props) => {
	const removeTags = (indexToRemove) => {
		props.selectedTags([
			...props.tags.filter((_, index) => index !== indexToRemove),
		]);
	};
	const addTags = (event) => {
		if (event.target.value !== '') {
			if (props.isIP) {
				if (props.tags.length >= 8) {
					return notify_error('Maximum pre-defined IPs reached');
				}
				const isIPv4 =
					/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
				if (!isIPv4.test(event.target.value)) {
					return notify_error('Invalid IP address');
				}

				props.selectedTags([...props.tags, event.target.value]);
				event.target.value = '';
			} else {
				if (event.target.value.length > 10) {
					return notify_error('Tag is too long');
				}

				props.selectedTags([...props.tags, event.target.value]);
				event.target.value = '';
			}
		}
	};
	return (
		<TagsContainer style={{ width: '100%' }}>
			{' '}
			<div
				className="tags-input"
				style={
					props.disabled === '0'
						? { backgroundColor: '#2d3245' }
						: { backgroundColor: '#2e3446' }
				}
			>
				<ul id="tags">
					{props.tags.map((tag, index) => (
						<li key={index} className="tag">
							<span className="tag-title">{tag}</span>
							<span
								className="tag-close-icon"
								onClick={() => removeTags(index)}
							>
								x
							</span>
						</li>
					))}
				</ul>
				<input
					disabled={props.disabled === '0' ? true : false}
					type="text"
					name="tags"
					onKeyUp={(event) =>
						event.key === 'Enter' ? addTags(event) : null
					}
					placeholder={
						props.isIP
							? 'Press enter to add IPs'
							: 'Press enter to add tags'
					}
				/>
			</div>
		</TagsContainer>
	);
};

const TagsContainer = styled.div`
	//* Tags input
	.tags-input {
		display: flex;
		align-items: center;
		width: 100%;
		outline: none;
		padding: 0px 0.75rem;
		min-height: 36px;
		font-size: 0.8125rem;
		font-weight: 400;
		line-height: 1.5;
		color: #bfc8e2;
		background-clip: padding-box;
		border: 1px solid #32394e;
		appearance: none;
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		input {
			flex: 1;
			border: none;
			background-color: transparent;
			color: #bfc8e2;
			&:focus {
				outline: transparent;
			}
		}
	}

	#tags {
		display: flex;
		flex-wrap: wrap;
		padding: 0;
	}

	.tag {
		width: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 0.8125rem;
		padding: 0 8px;
		list-style: none;
		border-radius: 6px;
		background: #556ee6;
		margin: 5px;
		margin-left: 0px;
		.tag-title {
			margin-top: 2px;
			margin-bottom: 2px;
		}
		.tag-close-icon {
			display: block;
			width: 16px;
			height: 16px;
			line-height: 16px;
			text-align: center;
			font-size: 14px;
			margin-left: 8px;
			color: #556ee6;
			border-radius: 50%;
			background: #fff;
			cursor: pointer;
		}
	}
`;
