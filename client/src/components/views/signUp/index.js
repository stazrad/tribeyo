// PACKAGES //
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import fetch from 'isomorphic-fetch'

// COMPONENTS //
import Loader from '../../layout/partials/loader'

class SignUp extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            emailError: null,
            nameError: null,
            passwordError: null,
            emailValue: '',
            nameValue: '',
            passwordValue: '',
            loading: false,
            profileCreated: false,
            uid: null
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeEmail(e) {
        let emailValue = e.target.value
        this.setState({emailValue})
    }

    handleChangeName(e) {
        let nameValue = e.target.value
        this.setState({nameValue})
    }

    handleChangePassword(e) {
        let passwordValue = e.target.value
        this.setState({passwordValue})
    }

    handleSubmit(e) {
        e.preventDefault()
        if(!this.state.nameValue || !this.state.emailValue || !this.state.passwordValue) {
            if(!this.state.nameValue) {
                this.setState({
                    nameError: 'Please enter your name'
                })
            }
            if(!this.state.emailValue) {
                this.setState({
                    emailError: 'Please enter your email'
                })
            }
            if(!this.state.passwordValue) {
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
            email: this.state.emailValue,
            name: this.state.nameValue,
            password: this.state.passwordValue
        }
        fetch('/api/profile', {
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
                        passwordError: result.message
                    })
                }
            } else {
                this.setState({
                    profileCreated: true,
                    uid: result.uid
                })
            }
            console.log('RESULT',result)
        })
        .catch((err) => {
            console.log('ERROR',err)
        })
    }

    render() {
        const id = this.state.uid
        const redirect = this.state.profileCreated ? <Redirect to={`/profile/${id}`} /> : null
        const spinner = Loader(this.state.loading)

        return (
            <div id='sign-up'>
                {redirect}
                {spinner}
                <div className='image-container'>
                    <img className='bubbles' src="/images/tribeyo_mark_chat_bubbles.png" />
                </div>
                <h3>SIGN UP WITH YOUR EMAIL</h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='name'
                        placeholder='first name'
                        value={this.state.nameValue}
                        onChange={this.handleChangeName} />
                    <label htmlFor='name' id='name-error'>{this.state.nameError}</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='email'
                        value={this.state.emailValue}
                        onChange={this.handleChangeEmail} />
                    <label htmlFor='email' id='email-error'>{this.state.emailError}</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.passwordValue}
                        onChange={this.handleChangePassword} />
                    <label htmlFor='password' id='password-error'>{this.state.passwordError}</label>
                    <button type="submit">SIGN UP</button>
                </form>
                {/* <h1><Link to='/profile/user_id'>Login</Link></h1> */}
            </div>
        )
    }
}

export default SignUp
