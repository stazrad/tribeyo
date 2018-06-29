// packages
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import debounce from 'lodash.debounce'

// components
import { Input, Loader } from 'components/styled'
import View from 'components/View'

// actions
import { searchByFaclCode, searchByInmate } from 'actions/inmateSearch'

class InmateSearch extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			inmate: null,
			firstName: 'jake', // FIXME
			lastName: 'smith', // FIXME
			loading: false,
			results: false,
			firstNameError: false,
			lastNameError: false,
			searched: false,
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

		this.setState({
			loading: true,
			searched: true
		})
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

		if (!faclCode) {
			// TODO handle no faclCode
		}

		dispatch(searchByFaclCode(faclCode))
		console.log('onSelect', this.props)

		// TODO more info/dropdown?
	}

	toCheckout = () => {
		// TODO add redirect
	}

	renderResults = () => {
		const { results } = this.props
		const { loading } = this.state
		const resultsDropdown = [
			<h3 key={0}>Select One:</h3>,
			<ul key={1}>
				{results.map((inmate, i) => (
					<li key={i} className='inmate-result' onClick={this.onSelect.bind(this, inmate.faclCode)}>
						{console.log(inmate)}
						<h2>{inmate.nameFirst} {inmate.nameLast}</h2>
						<div>Race: {inmate.race} | Age: {inmate.age} | Facility: {inmate.faclName}</div>
					</li>
				))}
			</ul>
		]
		const noResults = <div>No results :(</div>

		console.log('loading', loading)

		if (loading) return <Loader loading={loading} inline={true} />

		return results && results.length > 0 ? resultsDropdown : noResults
	}

	componentWillReceiveProps(nextProps) {
		const { inmate, results } = nextProps
		this.setState({
			inmate,
			loading: false,
			results: results.length ? results : []
		})
	}

	render() {
		const {
			inmate,
			firstName,
			lastName,
			results,
			searched,
			firstNameError,
			lastNameError
		} = this.state
		const toCheckout = <button onClick={this.toCheckout}>Proceed to checkout</button>

		return (
			<View>
				<h2>Search for inmate by name:</h2>
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
				<div className='results-container'>
					{results && searched ? this.renderResults() : null}
				</div>
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
