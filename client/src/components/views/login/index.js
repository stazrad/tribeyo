// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// components
import { Input, Loader } from 'components/styled'

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
    let emailValue = e.target.value
    this.setState({ emailValue, emailError: '' })
  }

  handleChangePassword = e => {
    let passwordValue = e.target.value
    this.setState({ passwordValue, passwordError: '' })
  }

  handleSubmit = e => {
    const { emailValue, passwordError } = this.state
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
    const id = this.props.user.uid
    const redirect = this.state.authenticated ? (
      <Redirect to={`/profile/${id}`} />
    ) : null

    return (
      <div id="login">
        {redirect}
        <Loader loading={this.state.loading} />
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
            error={this.state.emailError}
            value={this.state.emailValue}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="email" id="email-error-login">
            {this.state.emailError}
          </label>
          <Input
            type="password"
            name="password"
            placeholder="password"
            error={this.state.passwordError}
            value={this.state.passwordValue}
            onChange={this.handleChangePassword}
          />
          <label htmlFor="password" id="password-error-login">
            {this.state.passwordError}
          </label>
          <label className="server-error" id="server-error-login">
            {this.state.serverError}
          </label>
          <button type="submit">LOGIN</button>
        </form>
        <div className="below-button">
          New user? <Link to="/signup">Create an account here.</Link>
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

export default connect(mapStateToProps)(Login)
