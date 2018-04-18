// packages
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AuthRoute = ({ component: Component, isLoggedIn, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				isLoggedIn ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	)
}

export default AuthRoute
