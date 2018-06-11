// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

// components
import { Input } from 'components/styled'
import View from 'components/View'

// actions
import { searchByFaclCode, searchByInmate } from 'actions/inmateSearch'

class InmateSearch extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			inmate: null,
			firstName: '',
			lastName: '',
			loading: false,
			results: false,
			firstNameError: false,
			lastNameError: false,
			selected: false
		}
	}

	onChangeFirst = e => {
		const { value: firstName } = e.target
		this.setState({
			firstName,
			firstNameError: false
		})
	}

	onChangeLast = e => {
		const { value: lastName } = e.target
		this.setState({
			lastName,
			lastNameError: false
		})
	}

	onSearch = () => {
		const { dispatch } = this.props
		const { firstName, lastName, firstNameError, lastNameError } = this.state
		const name = {
			first: firstName,
			last: lastName
		}

		if (!firstName || !lastName) {
			this.setState({
				firstNameError: !firstName,
				lastNameError: !lastName
			})

			return
		}

		dispatch(searchByInmate(name))
	}

	onSelect = faclCode => {
		const { dispatch } = this.props

		dispatch(searchByFaclCode(faclCode))
		console.log(this.props)

		// TODO more info/dropdown?
	}

	toCheckout = () => {
		//TODO add redirect
	}

	componentWillReceiveProps(props) {
		const { inmate, results } = props
		this.setState({
			inmate,
			results: !!results.length
		})
	}

	render() {
		const {
			inmate,
			firstName,
			lastName,
			loading,
			results,
			firstNameError,
			lastNameError
		} = this.state
		const resultsDropdown = [
			<h3 key={0}>Select One:</h3>,
			<ul key={1}>
				{this.props.results.map((inmate, i) => (
					<li key={i} className='prediction' onClick={this.onSelect.bind(this, inmate.faclCode)}>
						{console.log(inmate)}
						<div>
							<h2>{inmate.nameFirst} {inmate.nameLast}</h2>
							<div>Race: {inmate.race} | Age: {inmate.age} | Facility: {inmate.faclName}</div>
						</div>
					</li>
				))}
			</ul>
		]
		const toCheckout = (
			<button onClick={this.toCheckout}>Proceed to checkout</button>
		)

		return (
			<View loading={loading}>
				<div className='image-container'>
					<img
						className='bubbles'
						src='/images/tribeyo_mark_chat_bubbles.png'
					/>
				</div>
				<Input
					type='text'
					placeholder='first name'
					error={firstNameError}
					value={firstName}
					onChange={this.onChangeFirst}
				/>
				<Input
					type='text'
					placeholder='last name'
					error={lastNameError}
					value={lastName}
					onChange={this.onChangeLast}
				/>
				<button onClick={this.onSearch}>Search</button>
				{results ? resultsDropdown : null}
				{/* {inmate ? toCheckout : null} */}
			</View>
		)
	}
}

const mapStateToProps = state => {
	console.log(state)
	return {
		inmate: state.inmateSearch.inmate,
		results: state.inmateSearch.results
	}
}

export default connect(mapStateToProps)(InmateSearch)
