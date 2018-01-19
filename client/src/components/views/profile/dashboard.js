// PACKAGES //
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const subscribeButton = <button className='subscribe'>SUBSCRIBE NOW</button>
        const { subscription } = this.props.user.stripe
        const { number } = this.props.user.twilio
        const isSubscribed = (
            <div>
                <h2>YOUR TRIBEYO NUMBER:</h2>
                <h2 id='phone-number'>{number.purchasedNumber.displayNumber}</h2>
                <h3 id='forwards-to'>Forwards to:
                    <span id='forwards-to-number'>{number.forwardToNumber.displayNumber}</span>
                </h3>
            </div>
        )
        const isNotSubscribed = (
            <div>
                <h2 className='call-to-action'>SUBSCRIBE TO GET YOUR NUMBER</h2>
                <button className='alt'>
                    <Link to='/plans'>View Subscription Plans</Link>
                </button>
                <button className='subscribe'>SUBSCRIBE NOW</button>
            </div>
        )

        return (
            <div id='dashboard'>
                <h1>Dashboard</h1>
                {subscription ? isSubscribed : isNotSubscribed}
                <button className='edit-profile'>EDIT PROFILE</button>
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
