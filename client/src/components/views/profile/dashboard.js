// packages
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// imports
import View from 'components/View'

class Dashboard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			redirect: false
		}

		this.onSubscribe = this.onSubscribe.bind(this)
	}

	onSubscribe() {
		this.setState({
			redirect: true
		})
		console.log('we gotta navigate, homes', this.props.match)
	}

	componentWillReceiveProps() {
		this.setState({redirect: false})
	}

	render() {
		const subscribeButton = <button className="subscribe">Subscribe Now</button>
		const { subscription } = this.props.user.stripe.subscription.subscribed
		const { number } = this.props.user.twilio
		const { user } = this.props
		const isSubscribed = (
			<div>
				<h2>Your Tribeyo Number:</h2>
				<h2 id="phone-number">{number.purchasedNumber.displayNumber}</h2>
				<h3 id="forwards-to">
					Forwards to:
					<span id="forwards-to-number">
						{number.forwardToNumber.displayNumber}
					</span>
				</h3>
			</div>
		)
		const isNotSubscribed = (
			<div>
				<h2 className="call-to-action">Subscribe to Get Your Number</h2>
				<button onClick={this.onSubscribe} className="subscribe">
					Subscribe Now
				</button>
				<button className="alt">
					<Link to="/plans">View Subscription Plans</Link>
				</button>
			</div>
		)

		return (
			<View
				title={'Dashboard'}
				redirect={this.state.redirect}
				redirectTo={`/profile/${user.uid}/search`}>
				{subscription ? isSubscribed : isNotSubscribed}
				{/* <button className='edit-profile'>Edit Profile</button> */}
				<div className="contact">
					Have questions?&nbsp;
					<Link to="/how-it-works" className="contact-us">
						Contact us.
					</Link>
				</div>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Dashboard)
