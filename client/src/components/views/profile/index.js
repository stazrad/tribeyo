// PACKAGES //
import React from 'react'

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

export default Profile
