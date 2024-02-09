import React, { useContext } from 'react';
import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';
import '../components/global/popup.css';
import { Context } from './NavState';

function Popup(props) {
	const transition = useTransition(props.trigger, {
		from: { opacity: 0, transform: 'translateY(-40px)' },
		enter: { opacity: 1, transform: 'translateY(0px)' },
		leave: { opacity: 0, transform: 'translateY(-40px)' },
	});

	const [navState] = useContext(Context);

	return props.trigger ? (
		props.type === 'full' ? (
			<>
				<PopupWrapperFull>
					{transition((style, item) =>
						item ? (
							<animated.div style={style} className="item">
								<PopupInner>
									{props.children}
									<PopupCloseContainer>
										<PopupClose
											onClick={() =>
												props.setTrigger(false)
											}
										>
											Close
										</PopupClose>
									</PopupCloseContainer>
								</PopupInner>
							</animated.div>
						) : (
							''
						)
					)}
				</PopupWrapperFull>
			</>
		) : props.type === 'big' ? (
			<PopupWrapper
				style={
					navState ? { left: '70px', width: 'calc(100% - 70px)' } : {}
				}
			>
				{transition((style, item) =>
					item ? (
						<animated.div style={style} className="item">
							<PopupInnerBig>
								{props.children}
								<PopupCloseContainer>
									<PopupClose
										onClick={() => props.setTrigger(false)}
									>
										Close
									</PopupClose>
								</PopupCloseContainer>
							</PopupInnerBig>
						</animated.div>
					) : (
						''
					)
				)}
			</PopupWrapper>
		) : (
			<PopupWrapper
				style={
					navState ? { left: '70px', width: 'calc(100% - 70px)' } : {}
				}
			>
				{transition((style, item) =>
					item ? (
						<animated.div style={style} className="item">
							<PopupInner>
								{props.children}
								<PopupCloseContainer>
									<PopupClose
										onClick={() => props.setTrigger(false)}
									>
										Close
									</PopupClose>
								</PopupCloseContainer>
							</PopupInner>
						</animated.div>
					) : (
						''
					)
				)}
			</PopupWrapper>
		)
	) : null;
}

const PopupWrapper = styled.div`
	position: fixed;
	top: 70px;
	left: 250px;
	width: calc(100% - 250px);
	max-width: 100%;
	z-index: 100;
	height: calc(100vh - 70px);
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 992px) {
		left: 0px !important;
		width: 100% !important;
	}
`;

const PopupWrapperFull = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2000;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);

	display: flex;
	justify-content: center;
	align-items: center;
	width: 100% !important;
`;

const PopupInner = styled.div`
	position: relative;
	margin: auto;
	padding: 12px;
	width: 600px;
	background-color: #2a3042;
	border-radius: 0.25rem;
	@media screen and (max-width: 650px) {
		width: 90%;
	}
`;

const PopupInnerBig = styled.div`
	position: relative;
	margin: auto;
	padding: 12px;
	width: 1200px;
	background-color: #2a3042;
	border-radius: 0.25rem;
	@media screen and (max-width: 1500px) {
		width: 90%;
	}
`;

const PopupCloseContainer = styled.div`
	display: flex;
	width: 100%;
	gap: 12px;
	border-top: 1px solid #32394e;
	padding-top: 12px;
`;

const PopupClose = styled.button`
	background-color: #c3cbe4;
	outline: none;
	display: inline-block;
	font-weight: 400;
	line-height: 1.5;
	color: black;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;
	padding: 0.47rem 0.75rem;
	font-size: 0.9125rem;
	border-radius: 0.25rem;
	transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
		border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export default Popup;
