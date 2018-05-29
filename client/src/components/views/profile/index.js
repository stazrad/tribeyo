// packages
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import AuthRoute from 'components/AuthRoute'
import Checkout from './Checkout'
import CitySearch from './CitySearch'
import Dashboard from './Dashboard'
import Login from 'components/views/Login'
import NotFound from 'components/views/NotFound'

class Profile extends React.Component {
	render () {
		const { isLoggedIn } = this.props

		return (
			<Switch>
				<AuthRoute
					exact
					path='/profile'
					component={Dashboard}
					isLoggedIn={isLoggedIn} />
				<AuthRoute
					exact
					path='/profile/:id'
					component={Dashboard}
					isLoggedIn={isLoggedIn} />
				<AuthRoute
					path='/profile/:id/search'
					component={CitySearch}
					isLoggedIn={isLoggedIn} />
				<AuthRoute
					path='/profile/:id/checkout'
					component={Checkout}
					isLoggedIn={isLoggedIn} />
				<Route
					path='profile/:id/*'
					component={NotFound} />
			</Switch>
		)
	}
}

const mapStateToProps = state => {
	return {
		isLoggedIn: state.user.isLoggedIn
	}
}

Profile.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired
}

export default withRouter(connect(mapStateToProps)(Profile))
