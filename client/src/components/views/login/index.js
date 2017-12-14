// PACKAGES //
import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            emailValue: '',
            passwordValue: ''
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(e) {
        let emailValue = e.target.value;
        this.setState({emailValue});
    }

    handleChangePassword(e) {
        let passwordValue = e.target.value;
        this.setState({passwordValue});
    }

    handleSubmit(e) {
        e.preventDefault();
        alert('submitted!');
    }

    render() {
        return (
            <div id='login'>
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
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.passwordValue}
                        onChange={this.handleChangePassword} />
                    <button type="submit">LOGIN</button>
                </form>
                {/* <h1><Link to='/profile/user_id'>Login</Link></h1> */}
            </div>
        )
    }
}

export default Login;
