// PACKAGES //
import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// COMPONENTS //
import Loader from '../../layout/partials/loader'

// ACTIONS //
import { autocomplete } from '../../../actions/search'

class CitySearch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            cityValue: '',
            loading: false
        }

        this.handleChangeCitySearch = this.handleChangeCitySearch.bind(this)
    }

    handleChangeCitySearch(e) {
        const cityValue = e.target.value
        this.setState({cityValue})
        return this.props.dispatch(autocomplete(cityValue))
    }

    componentWillReceiveProps(props) {
        console.log(props.predictions)
    }

    render() {
        const spinner = Loader(this.state.loading)

        return (
            <div id='city-search'>
                {spinner}
                <div className='image-container'>
                    <img className='bubbles' src="/images/tribeyo_mark_chat_bubbles.png" />
                </div>
                <h3>Type city</h3>
                <form>
                    <input
                        type='text'
                        name='city'
                        placeholder='type city'
                        className={this.state.emailError ? 'error-border' : null }
                        value={this.state.cityValue}
                        onChange={this.handleChangeCitySearch} />
                </form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        predictions: state.predictions
    }
}

export default connect(mapStateToProps)(CitySearch)
