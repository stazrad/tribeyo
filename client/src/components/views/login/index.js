// PACKAGES //
import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div>
                <h1><Link to='/profile/user_id'>Login</Link></h1>
            </div>
        )
    }
}

export default Login;
