// PACKAGES //
import React from 'react';
import { Link } from 'react-router-dom';
import fetch from 'isomorphic-fetch';

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            emailValue: '',
            nameValue: '',
            passwordValue: ''
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(e) {
        let emailValue = e.target.value;
        this.setState({emailValue});
    }

    handleChangeName(e) {
        let nameValue = e.target.value;
        this.setState({nameValue});
    }

    handleChangePassword(e) {
        let passwordValue = e.target.value;
        this.setState({passwordValue});
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = {
            email: this.state.emailValue,
            name: this.state.nameValue,
            password: this.state.passwordValue
        };

        fetch('/api/profile', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('RESULT',result);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div id='sign-up'>
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
                    <input
                        type='text'
                        name='email'
                        placeholder='email'
                        value={this.state.emailValue}
                        onChange={this.handleChangeEmail} />
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.passwordValue}
                        onChange={this.handleChangePassword} />
                    <button type="submit">SIGN UP</button>
                </form>
                {/* <h1><Link to='/profile/user_id'>Login</Link></h1> */}
            </div>
        )
    }
}

export default SignUp;
