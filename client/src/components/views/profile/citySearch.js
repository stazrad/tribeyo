// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

// components
import { Input } from 'components/styled'
import View from 'components/View'

// actions
import { autocomplete, searchByCity } from 'actions/search'

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

		this.onSearch = debounce(this.onSearch, 400).bind(this)
	}

	onChange = e => {
		const { value: cityValue } = e.target
		this.setState({
			areaCode: undefined,
			cityValue
		})
		this.onSearch(cityValue)
	}

	onFocus = () => {
		this.setState({
			areaCode: undefined,
			focused: true,
			selected: false
		})
	}

	onBlur = () => {
		this.setState({
			focused: false,
			searchError: !!this.state.cityValue
		})
	}

	onSearch (cityValue) {
		const { dispatch } = this.props
		dispatch(autocomplete(cityValue))
	}

	onSelect = ({ target }) => {
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

	toCheckout = () => {
		//TODO add redirect
	}

	componentWillReceiveProps(props) {
		const { areaCode, predictions } = props
		this.setState({
			areaCode,
			predictions: !!predictions.length,
			searchError: !predictions.length && !this.state.cityValue
		})
	}

	render() {
		const {
			areaCode,
			cityValue,
			focused,
			loading,
			predictions,
			searchError,
			selected
		} = this.state
		const inputClass = searchError
			? 'error-border'
			: null || selected ? 'selected' : null
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
		const areaCodeElement = [
			<h4 key={0}>Area Code:</h4>,
			<div key={1} className="area-code">
				{areaCode}
			</div>
		]
		const toCheckout = (
			<button onClick={this.toCheckout}>Proceed to checkout</button>
		)

		return (
			<View loading={loading}>
				<div className="image-container">
					<img
						className="bubbles"
						src="/images/tribeyo_mark_chat_bubbles.png"
					/>
				</div>
				{areaCode ? areaCodeElement : <h2>Search by City</h2>}
				<Input
					type="text"
					name="city"
					placeholder={focused ? '' : 'start typing city name'}
					onBlur={this.onBlur}
					className={inputClass}
					value={cityValue}
					onChange={this.onChange}
					onFocus={this.onFocus}
				/>
				{predictions && !areaCode ? predictionsDropdown : null}
				{areaCode ? toCheckout : null}
			</View>
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
