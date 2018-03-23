// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'

// components
import { Input, Loader } from 'components/styled'

// actions
import { userSignup } from 'actions/user'

class Signup extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			emailError: null,
			nameError: null,
			passwordError: null,
			serverError: null,
			emailValue: '',
			nameValue: '',
			passwordValue: '',
			loading: false,
			profileCreated: false,
			uid: null
		}
	}

	handleChangeEmail = e => {
		const emailValue = e.target.value
		this.setState({ emailValue, emailError: '' })
	}

	handleChangeName = e => {
		const nameValue = e.target.value
		this.setState({ nameValue, nameError: '' })
	}

	handleChangePassword = e => {
		const passwordValue = e.target.value
		this.setState({ passwordValue, passwordError: '' })
	}

	handleSubmit = e => {
        const { emailValue, nameValue, passwordValue } = this.state
		e.preventDefault()
		if (
			!nameValue ||
			!emailValue ||
			!passwordValue
		) {
			if (!nameValue) {
				this.setState({
					nameError: 'Please enter your name'
				})
			}
			if (!emailValue) {
				this.setState({
					emailError: 'Please enter your email'
				})
			}
			if (!passwordValue) {
				this.setState({
					passwordError: 'Please choose a password'
				})
			}
			return
		}
		this.setState({
			emailError: null,
			nameError: null,
			passwordError: null,
			loading: true
		})
		const formData = {
			email: emailValue,
			name: nameValue,
			password: passwordValue
		}
		return this.props.dispatch(userSignup(formData))
	}

	componentWillReceiveProps(props) {
		this.setState({ loading: false })
		const error = props.user.error
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
		} else {
			this.setState({
				profileCreated: true,
				uid: props.user.uid
			})
			return
		}
	}

	render() {
		const {
            emailError,
            emailValue,
            loading,
            nameError,
            nameValue,
            passwordError,
            passwordValue,
            uid
        } = this.state
		const redirect = this.state.profileCreated ? (
			<Redirect to={`/profile/${uid}`} />
		) : null

		return (
			<div id="sign-up">
				{redirect}
				<Loader loading={loading} />
                <div className="image-container">
					<img
						className="bubbles"
						src="/images/tribeyo_mark_chat_bubbles.png" />
				</div>
				<h3>Sign Up with your Email</h3>
				<form onSubmit={this.handleSubmit}>
					<Input
						type="text"
						name="name"
						placeholder="first name"
						error={nameError}
						value={nameValue}
						onChange={this.handleChangeName} />
					<label htmlFor="name" id="name-error-signup">
						{nameError}
					</label>
					<Input
						type="text"
						name="email"
						placeholder="email"
						error={emailError}
						value={emailValue}
						onChange={this.handleChangeEmail} />
					<label htmlFor="email" id="email-error-signup">
						{emailError}
					</label>
					<Input
						type="password"
						name="password"
						placeholder="password"
						error={passwordError}
						value={passwordValue}
						onChange={this.handleChangePassword} />
					<label htmlFor="password">
						{passwordError}
					</label>
					<button type="submit">Sign Up</button>
				</form>
				<div className="below-button">
					Already have an account? <Link to="/login">Login here.</Link>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Signup)
