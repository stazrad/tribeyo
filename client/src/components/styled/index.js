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
	position: ${props => props.inline ? 'absolute' : 'fixed'};
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	z-index: 998;
	background-color: ${props => props.inline ? 'unset' : 'rgb(0, 0, 0, 0.8)'};
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
		padding-top: ${props => props.inline ? '0px' : '50%'};
		margin: auto;
	}
`

export const Main = styled.main`
	text-align: center;
	display: flex;
	flex-direction: column;
	flex-flow: column wrap;
	.row {
		display: flex;
		text-align: center;
		flex: 1;
		flex-wrap: wrap;
		height: 250px;
		margin-bottom: 50px;
		img {
			height: 100%;
			display: flex;
			flex: 1;
		}
		.step {
			flex: 3;
			margin-top: 70px;
			min-width: 100px;
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
	    margin-top: 2px;
	    margin-bottom: 14px;
	    cursor: default;
	}

	@media (max-width: 520px) {
		h1 {
			text-align: center;
		}
		.step {
			display: inline-block;
			width: 100%;
		}
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
