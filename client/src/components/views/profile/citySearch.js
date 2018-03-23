// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

// components
import Loader from 'components/layout/partials/loader'

// actions
import { autocomplete, searchByCity } from 'actions/search'
import { checkoutView, searchView } from 'actions/views'

class CitySearch extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			areaCode: undefined,
			cityValue: '',
			focused: false,
			loading: false,
			predictions: false,
			searchError: false,
			selected: false
		}

		this.onBlur = this.onBlur.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onFocus = this.onFocus.bind(this)
		this.onSearch = _.debounce(this.onSearch, 300)
		this.onSelect = this.onSelect.bind(this)
		this.toCheckout = this.toCheckout.bind(this)
	}

	onChange(e) {
		const { value: cityValue } = e.target
		this.setState({
			areaCode: undefined,
			cityValue
		})
		this.onSearch(cityValue)
	}

	onFocus() {
		this.setState({
			areaCode: undefined,
			focused: true,
			selected: false
		})
	}

	onBlur() {
		this.setState({
			focused: false,
			searchError: !!this.state.cityValue
		})
	}

	onSearch(cityValue) {
		const { dispatch } = this.props
		dispatch(autocomplete(cityValue))
	}

	onSelect({ target }) {
		const { dispatch } = this.props
		const cityValue = target.innerText
		this.setState({
			cityValue,
			focused: false,
			predictions: false,
			selected: true
		})
		dispatch(searchByCity(cityValue))
	}

	toCheckout() {
		const { dispatch } = this.props
		dispatch(searchView(false))
		dispatch(checkoutView(true))
	}

	componentWillReceiveProps(props) {
		const { areaCode, predictions } = props
		this.setState({
			areaCode: areaCode,
			predictions: !!predictions.length,
			searchError: !predictions.length && !this.state.cityValue
		})
	}

	render() {
		const spinner = Loader(this.state.loading)
		const inputClass = this.state.searchError
			? 'error-border'
			: null || this.state.selected ? 'selected' : null
		const predictionsDropdown = [
			<h3 key={0}>Select One:</h3>,
			<ul key={1}>
				{this.props.predictions.map((city, i) => (
					<li key={i} className="prediction" onClick={this.onSelect}>
						{city}
					</li>
				))}
			</ul>
		]
		const areaCode = [
			<h4 key={0}>Area Code:</h4>,
			<div key={1} className="area-code">
				{this.state.areaCode}
			</div>
		]
		const toCheckout = (
			<button onClick={this.toCheckout}>Proceed to checkout</button>
		)

		return (
			<div id="city-search">
				{spinner}
				<div className="image-container">
					<img
						className="bubbles"
						src="/images/tribeyo_mark_chat_bubbles.png"
					/>
				</div>
				{this.state.areaCode ? areaCode : <h2>Search by City</h2>}
				<form onSubmit={e => e.preventDefault()}>
					<input
						type="text"
						name="city"
						placeholder={this.state.focused ? '' : 'start typing city name'}
						onBlur={this.onBlur}
						className={inputClass}
						value={this.state.cityValue}
						onChange={this.onChange}
						onFocus={this.onFocus}
					/>
				</form>
				{this.state.predictions && !this.state.areaCode
					? predictionsDropdown
					: null}
				{this.state.areaCode ? toCheckout : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		areaCode: state.search.areaCode.display,
		predictions: state.search.predictions
	}
}

export default connect(mapStateToProps)(CitySearch)
