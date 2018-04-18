// packages
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => {
	const authCheck = props => (
		isLoggedIn
		? <Component {...props} />
		: <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
	)

	return <Route {...rest} render={authCheck} />
}

export default AuthRoute
