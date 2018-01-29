// PACKAGES //
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash';

// COMPONENTS //
import Loader from '../../layout/partials/loader'

// ACTIONS //
import { autocomplete, searchByCity } from '../../../actions/search'

class CitySearch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            areaCode: undefined,
            cityValue: '',
            loading: false,
            predictions: false,
            searchError: false,
            selected: false
        }

        this.onChange = this.onChange.bind(this)
        this.onFocus = this.onFocus.bind(this)
        this.onSearch = _.debounce(this.onSearch, 300)
        this.onSelect = this.onSelect.bind(this)
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
            selected: false
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
            predictions: false,
            selected: true
        })
        dispatch(searchByCity(cityValue))
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
        const spinner = Loader(this.state.loading)
        const inputClass = this.state.searchError ? 'error-border' : null || this.state.selected ? 'selected' : null
        const predictionsDropdown = [
            <h3 key={0}>Select One:</h3>,
            <ul key={1}>
                {
                    this.props.predictions.map((city, i) => (
                        <li key={i}
                            className='prediction'
                            onClick={this.onSelect}>{city}
                        </li>
                    ))
                }
            </ul>
        ]
        const areaCode = [
            <h2 key={0}>Area Code:</h2>,
            <div key={1} className='area-code'>{this.state.areaCode}</div>
        ]

        return (
            <div id='city-search'>
                {spinner}
                <div className='image-container'>
                    <img className='bubbles' src="/images/tribeyo_mark_chat_bubbles.png" />
                </div>
                {this.state.areaCode ? areaCode : <h2>Search by City</h2>}
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        type='text'
                        name='city'
                        placeholder='start typing city name'
                        className={inputClass}
                        value={this.state.cityValue}
                        onChange={this.onChange}
                        onFocus={this.onFocus} />
                </form>
                {this.state.predictions ? predictionsDropdown : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        areaCode: state.search.areaCode,
        predictions: state.search.predictions
    }
}

export default connect(mapStateToProps)(CitySearch)
