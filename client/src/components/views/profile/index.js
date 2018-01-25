// PACKAGES //
import React from 'react'

// COMPONENTS //
import CitySearch from './citySearch'
import Dashboard  from './dashboard'
import Login      from '../login'

class Profile extends React.Component {
    render() {
        return (
            <div>
                <CitySearch />
                <Dashboard />
            </div>
        )
    }
}

export default Profile
