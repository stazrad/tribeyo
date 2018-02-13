// PACKAGES //
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// ACTIONS //
import { searchView } from 'actions/views'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.onSubscribe = this.onSubscribe.bind(this)
    }

    onSubscribe() {
        const { dispatch } = this.props
        dispatch(searchView(true))
    }

    render() {
        const subscribeButton = <button className='subscribe'>Subscribe Now</button>
        const { subscription } = this.props.user.stripe.subscription.subscribed
        const { number } = this.props.user.twilio
        const isSubscribed = (
            <div>
                <h2>Your Tribeyo Number:</h2>
                <h2 id='phone-number'>{number.purchasedNumber.displayNumber}</h2>
                <h3 id='forwards-to'>Forwards to:
                    <span id='forwards-to-number'>{number.forwardToNumber.displayNumber}</span>
                </h3>
            </div>
        )
        const isNotSubscribed = (
            <div>
                <h2 className='call-to-action'>Subscribe to Get Your Number</h2>
                <button onClick={this.onSubscribe} className='subscribe'>Subscribe Now</button>
                <button className='alt'>
                    <Link to='/plans'>View Subscription Plans</Link>
                </button>
            </div>
        )

        return (
            <div id='dashboard'>
                <h1>Dashboard</h1>
                {subscription ? isSubscribed : isNotSubscribed}
                {/* <button className='edit-profile'>Edit Profile</button> */}
                <div className='contact'>
                    Have questions?&nbsp;
                    <Link to='/how-it-works' className='contact-us'>
                        Contact us.
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Dashboard)
