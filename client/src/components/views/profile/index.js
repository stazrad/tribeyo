// PACKAGES //
import React from 'react'
import { connect } from 'react-redux'

// COMPONENTS //
import Checkout   from './checkout'
import CitySearch from './citySearch'
import Dashboard  from './dashboard'

class Profile extends React.Component {
    render() {
        return (
            <div>
                <CitySearch />
                <Checkout />
                <Dashboard />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)
