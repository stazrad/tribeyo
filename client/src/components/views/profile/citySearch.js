// PACKAGES //
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash';

// COMPONENTS //
import Loader from '../../layout/partials/loader'

// ACTIONS //
import { autocomplete } from '../../../actions/search'

class CitySearch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            cityValue: '',
            loading: false,
            searchError: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSearch = _.debounce(this.onSearch, 300)
    }

    onChange(e) {
        const { value: cityValue } = e.target
        this.setState({cityValue})
        this.onSearch(cityValue)
    }

    onSearch(cityValue) {
        const { dispatch } = this.props
        dispatch(autocomplete(cityValue))
    }

    componentWillReceiveProps(props) {
        const { predictions } = props
        this.setState({searchError: !predictions.length && !!this.state.cityValue})
    }

    render() {
        const spinner = Loader(this.state.loading)

        return (
            <div id='city-search'>
                {spinner}
                <div className='image-container'>
                    <img className='bubbles' src="/images/tribeyo_mark_chat_bubbles.png" />
                </div>
                <h2>Search by City</h2>
                <form>
                    <input
                        type='text'
                        name='city'
                        placeholder='start typing city name'
                        className={this.state.searchError ? 'error-border' : null }
                        value={this.state.cityValue}
                        onChange={this.onChange} />
                </form>
                <h3>Select One:</h3>
                <ul>
                    {
                        this.props.predictions.map((city, i) => (
                            <li key={i}
                                className='prediction'>{city}</li>
                        ))
                    }
                </ul>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        predictions: state.search.predictions
    }
}

export default connect(mapStateToProps)(CitySearch)
