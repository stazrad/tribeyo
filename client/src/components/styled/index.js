import styled from 'styled-components'

export const Input = styled.input`
	display: block;
	border-radius: 5px;
	color: ${props => props.theme.alt};
	border: 3px solid
		${props => props.error ? props.theme.error : props.theme.neutral};
	outline: none;
	font-size: 16px;
	margin: auto;
	margin-top: 16px;
	width: 100%;
	max-width: 350px;
	height: 20px;
	padding: 10px;
	transition: all 0.2s;
`

export const Loader = styled.div`
	display: ${props => props.loading ? 'block' : 'none'};
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	z-index: 998;
	background-color: rgb(0, 0, 0, 0.8);
	&:after {
		position: absolute;
		display: block;
		content: url(images/spinner.svg);
		z-index: 999;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		padding-top: 50%;
		margin: auto;
	}
`

export const Main = styled.main`
	text-align: center;
	display: flex;
	flex-direction: column;
	.row {
		display: flex;
		width: 100%;
		height: 250px;
		margin-bottom: 50px;
		img {
			height: 100%;
			flex: 1;
		}
		.step {
			flex: 3;
			.number {
				font-size: 35px;
				color: ${props => props.theme.primary};
				font-weight: bold;
				text-align: left;
				margin-bottom: 0px;
			}
		}
	}
	h3 {
		color: ${props => props.theme.alt};
	    font-weight: 100;
	    font-size: 18px;
	    text-align: left;
	    margin-top: 2px;
	    margin-bottom: 14px;
	    cursor: default;
	}
`

export const Title = styled.h1`
	font-size: 35px;
	flex: 1;
	color: ${props => props.theme.alt}
	line-height: normal;
    text-align: left;
    margin-bottom: 90px;
    text-transform: uppercase;
    font-weight: bold;
`
