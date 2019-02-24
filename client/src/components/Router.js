// packages
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// components
import Home from 'components/views/Home'
import HowItWorks from 'components/views/HowItWorks'
import Login from 'components/views/Login'
import NotFound from 'components/views/NotFound'
import Plans from 'components/views/Plans'
import Profile from 'components/views/Profile'
import Signup from 'components/views/Signup'


// TESTS
import Checkout from 'components/views/Profile/Checkout'
import InmateSearch from 'components/views/Profile/InmateSearch'

// actions
import { userLogin } from 'actions/user'

class Router extends React.Component {
	componentDidMount () {
		const { dispatch, isLoggedIn } = this.props

		if (!isLoggedIn) {
			// fire on page load to check for cookie
			dispatch(userLogin())
		}
	}

	render() {
		return (
			<Switch>
				<Route path='/' component={Home} exact />
				<Route path='/how-it-works' component={HowItWorks} />
				<Route path='/login' component={Login} />
				<Route path='/plans' component={Plans} />
				<Route path='/profile' component={Profile} />
				<Route path='/signup' component={Signup} />
				<Route path='/test' component={InmateSearch} />
				<Route component={NotFound} />
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

export default withRouter(connect(mapStateToProps)(Router))
