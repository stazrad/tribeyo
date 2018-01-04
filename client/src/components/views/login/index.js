// PACKAGES //
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// COMPONENTS //
import Loader from '../../layout/partials/loader'

// ACTIONS //
import { userLogin } from '../../../actions/user'

class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emailError: null,
            passwordError: null,
            emailValue: '',
            passwordValue: '',
            authenticated: false,
            loading: false,
            uid: null
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeEmail(e) {
        let emailValue = e.target.value
        this.setState({emailValue})
    }

    handleChangePassword(e) {
        let passwordValue = e.target.value
        this.setState({passwordValue})
    }

    handleSubmit(e) {
        e.preventDefault()
        if(!this.state.emailValue || !this.state.passwordValue) {
            if(!this.state.emailValue) {
                this.setState({
                    emailError: 'Please enter a valid email'
                })
            }
            if(!this.state.passwordValue) {
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
            email: this.state.emailValue,
            password: this.state.passwordValue
        }
        return this.props.dispatch(userLogin(formData))
        fetch('/api/profile/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then((response) => {
            this.setState({loading:false})
            return response.json()
        })
        .then((result) => {
            if(result.status != 200) {
                let msg = result.message.toLowerCase()
                if(msg.includes('email')) {
                    this.setState({
                        emailError: result.message
                    })
                }
                if(msg.includes('password')) {
                    this.setState({
                        passwordError: 'This password is invalid'
                    })
                }
            } else {
                this.props.dispatch(login(result.user))
                this.setState({
                    authenticated: true,
                    uid: result.user.uid
                })
            }
        })
        .catch((err) => {
            console.log('ERROR',err)
        })
    }

    render() {
        const id = this.state.uid
        const redirect = this.state.authenticated ? <Redirect to={`/profile/${id}`} /> : null
        const spinner = Loader(this.state.loading)

        return (
            <div id='login'>
                {redirect}
                {spinner}
                <div className='image-container'>
                    <img className='bubbles' src="/images/tribeyo_mark_chat_bubbles.png" />
                </div>
                <h3>LOGIN WITH YOUR EMAIL</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='email'
                        name='email'
                        placeholder='email'
                        value={this.state.emailValue}
                        onChange={this.handleChangeEmail} />
                    <label htmlFor='email' id='email-error-login'>{this.state.emailError}</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.passwordValue}
                        onChange={this.handleChangePassword} />
                    <label htmlFor='password' id='password-error-login'>{this.state.passwordError}</label>
                    <button type="submit">LOGIN</button>
                </form>
                {/* <h1><Link to='/profile/user_id'>Login</Link></h1> */}
            </div>
        )
    }
}

export default connect()(Login)
