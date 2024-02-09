import styled from 'styled-components';

export const showErrMsg = (msg) => {
	return (
		<ErrorWrapper>
			<ErrorText>{msg}</ErrorText>
		</ErrorWrapper>
	);
};

const ErrorWrapper = styled.div`
	width: 100%;
	background-color: #556ee6;
	padding: 6px;
	border-radius: 0.25rem;
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 1rem;
	justify-content: center;
`;

const ErrorText = styled.span`
	color: #f6f6f6;
	font-size: 0.8125rem;
	font-weight: 400;
`;
