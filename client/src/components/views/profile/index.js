// PACKAGES //
import React from 'react'
import { connect } from 'react-redux'

// COMPONENTS //
import Checkout   from './checkout'
import CitySearch from './citySearch'
import Dashboard  from './dashboard'

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { checkoutView, searchView } = this.props

        return (
            <div>
                {!searchView && !checkoutView ? <Dashboard /> : null}
                {searchView ? <CitySearch /> : null}
                {checkoutView ? <Checkout /> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        checkoutView: state.views.checkout,
        searchView: state.views.search
    }
}

export default connect(mapStateToProps)(Profile)
