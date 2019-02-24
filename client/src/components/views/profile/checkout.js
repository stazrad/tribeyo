// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// imports
import { Loader } from 'components/styled'
import { autocomplete, searchByCity } from 'actions/areaCodeSearch'
import View from 'components/View'

// stripe api
const stripe = Stripe('pk_test_EWFz9MTb5qG8TyFpIp2016II')
const elements = stripe.elements()

class Checkout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			card: undefined,
			cardError: '',
			loading: false
		}
	}

	onSubmit = e => {
		e.preventDefault()
		this.setState({ loading: true })
		stripe
			.createToken(this.state.card)
			.then(({ token }) => {
				const body = {
					areaCode: this.props.areaCode.code,
					token: token.id
				}
				const config = {
					method: 'post',
					headers: new Headers({
						'Content-Type': 'application/json'
					}),
					credentials: 'include',
					body: JSON.stringify(body)
				}
				return fetch(`/api/profile/${this.props.uid}/subscribe`, config) //TODO move this to an action
			})
			.then(res => {
				this.setState({ loading: false })
				if (res.status !== 200) throw new Error(res)
			})
			.catch(({ message: cardError }) => {
				this.setState({
					cardError,
					loading: false
				})
			})
	}

	componentDidMount() {
		const style = {
			base: {
				fontSize: '16px',
				color: '#32325d'
			}
		}
		const card = elements.create('card', { style })
		card.mount('#stripe-form')
		this.setState({ card })
		card.addEventListener('change', ({ error }) => {
			let cardError = ''
			if (error) cardError = error.message
			if (cardError !== this.state.cardError) this.setState({ cardError })
		})
	}

	render() {
		const { areaCode } = this.props
		const { cardError, loading } = this.state

		return (
			<View loading={loading} title={'Checkout'}>
				<div>
					<span className="area-code">{areaCode.display} XXX-XXX</span>
				</div>
				<form onSubmit={this.onSubmit} id="payment-form">
					<div className="form-row">
						<div id="stripe-form" />
						<div id="card-errors" role="alert">
							{cardError}
						</div>
					</div>

					<button>Submit Payment</button>
				</form>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		areaCode: state.search.areaCode,
		forwardToNumber: state.user.twilio.forwardToNumber,
		uid: 'JV9QtIIhfjNl4QruASVJTA9ay1v1' //state.user.uid
	}
}

export default connect(mapStateToProps)(Checkout)
