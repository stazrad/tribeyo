// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// components
import { Input } from 'components/styled'
import View from 'components/View'

// actions
import { userLogin } from 'actions/user'

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			emailError: null,
			passwordError: null,
			serverError: null,
			emailValue: '',
			passwordValue: '',
			authenticated: false,
			loading: false
		}
	}

	handleChangeEmail = e => {
		const emailValue = e.target.value
		this.setState({ emailValue, emailError: '' })
	}

	handleChangePassword = e => {
		const passwordValue = e.target.value
		this.setState({ passwordValue, passwordError: '' })
	}

	handleSubmit = e => {
		const { emailValue, passwordError, passwordValue } = this.state
		e.preventDefault()
		if (!emailValue || !passwordValue) {
			if (!emailValue) {
				this.setState({
					emailError: 'Please enter a valid email'
				})
			}
			if (!passwordValue) {
				this.setState({
					passwordError: 'Please enter your password'
				})
			}
			return
		}
		this.setState({
			emailError: null,
			passwordError: null,
			loading: true
		})
		const formData = {
			email: emailValue,
			password: passwordValue
		}
		return this.props.dispatch(userLogin(formData))
	}

	componentWillReceiveProps(props) {
		this.setState({ loading: false })
		let error = props.user.error
		if (error) {
			let type = error.type
			switch (type) {
				case 'email':
					return this.setState({
						emailError: error.message
					})
				case 'password':
					return this.setState({
						passwordError: error.message
					})
				default:
					return this.setState({
						serverError: error.message
					})
			}
		} else if (props.user.isLoggedIn) {
			this.setState({
				authenticated: true
			})
			return
		} else {
			this.setState({
				authenticated: false
			})
			return
		}
	}

	render() {
		const {
			authenticated,
			emailError,
			emailValue,
			loading,
			passwordError,
			passwordValue,
			serverError
		} = this.state
		const { uid } = this.props.user

		return (
			<View
				loading={loading}
				redirect={authenticated}
				redirectTo={`/profile/${uid}`}>
				<div className="image-container">
					<img
						className="bubbles"
						src="/images/tribeyo_mark_chat_bubbles.png"
					/>
				</div>
				<h3>Login with your email</h3>
				<form onSubmit={this.handleSubmit}>
					<Input
						type="email"
						name="email"
						placeholder="email"
						error={emailError}
						value={emailValue}
						onChange={this.handleChangeEmail}
					/>
					<label htmlFor="email" id="email-error-login">
						{emailError}
					</label>
					<Input
						type="password"
						name="password"
						placeholder="password"
						error={passwordError}
						value={passwordValue}
						onChange={this.handleChangePassword}
					/>
					<label htmlFor="password" id="password-error-login">
						{passwordError}
					</label>
					<label className="server-error" id="server-error-login">
						{serverError}
					</label>
					<button type="submit">LOGIN</button>
				</form>
				<div className="below-button">
					New user? <Link to="/signup">Create an account here.</Link>
				</div>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Login)
