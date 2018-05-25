// packages
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import Checkout from 'components/views/Profile/Checkout'
import Home from 'components/views/Home'
import HowItWorks from 'components/views/HowItWorks'
import Login from 'components/views/Login'
import NotFound from 'components/views/NotFound'
import Plans from 'components/views/Plans'
import Profile from 'components/views/Profile'
import Signup from 'components/views/Signup'

class Router extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/how-it-works" component={HowItWorks} />
				<Route path="/login" component={Login} />
				<Route path="/plans" component={Plans} />
				<Route path="/profile" component={Profile} />
				<Route path="/signup" component={Signup} />
				<Route path="/test" component={Checkout} />
				<Route component={NotFound} />
			</Switch>
		)
	}
}

export default Router
