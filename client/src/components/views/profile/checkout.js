// PACKAGES //
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// COMPONENTS //
import Loader from 'components/layout/partials/loader'

// ACTIONS //
import { autocomplete, searchByCity } from 'actions/search'

class Checkout extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    render() {
        const spinner = Loader(this.state.loading)

        return (
            <div id='checkout'>
                <h1>Checkout</h1>
                <div>
                    <span className='area-code'>{this.props.areaCode} XXX-XXX</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        areaCode: state.search.areaCode.display
    }
}

export default connect(mapStateToProps)(Checkout)
