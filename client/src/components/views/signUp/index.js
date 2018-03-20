// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import fetch from 'isomorphic-fetch'

// components
import Loader from 'components/layout/partials/loader'

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

        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeEmail(e) {
        let emailValue = e.target.value
        this.setState({emailValue, emailError: ''})
    }

    handleChangeName(e) {
        let nameValue = e.target.value
        this.setState({nameValue, nameError: ''})
    }

    handleChangePassword(e) {
        let passwordValue = e.target.value
        this.setState({passwordValue, passwordError: ''})
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
        return this.props.dispatch(userSignup(formData))
    }

    componentWillReceiveProps(props) {
        this.setState({loading:false})
        let error = props.user.error
        if(error) {
            let type = error.type
            switch(type) {
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
                        className={this.state.nameError ? 'error-border' : null }
                        value={this.state.nameValue}
                        onChange={this.handleChangeName} />
                    <label htmlFor='name' id='name-error-signup'>{this.state.nameError}</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='email'
                        className={this.state.emailError ? 'error-border' : null }
                        value={this.state.emailValue}
                        onChange={this.handleChangeEmail} />
                    <label htmlFor='email' id='email-error-signup'>{this.state.emailError}</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        className={this.state.passwordError ? 'error-border' : null }
                        value={this.state.passwordValue}
                        onChange={this.handleChangePassword} />
                    <label htmlFor='password' id='password-error-signup'>{this.state.passwordError}</label>
                    <button type='submit'>SIGN UP</button>
                </form>
                <div className='below-button'>Already have an account? <Link to='/login'>Login here.</Link></div>
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
