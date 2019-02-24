// packages
import React from 'react'
import { Link } from 'react-router-dom'

// imports
import View from 'components/View'

class HowItWorks extends React.Component {
	render() {
		return (
			<View title={'How it works'}>
				<div className='row'>
					<div className='step'>
						<div className='number'>1</div>
						<h5>Tribeyo sets up a phone number local to your remote contact.</h5>
					</div>
					<img src='images/how_it_works_step_1.gif' />
				</div>
				<div className='row'>
					<img src='images/how_it_works_step_2.gif' />
					<div className='step'>
						<div className='number'>2</div>
						<h5>When they dial this local number, Tribeyo bypasses the long distance fees and forwards the call to your phone.</h5>
					</div>
				</div>
				<div className='row'>
					<div className='step'>
						<div className='number'>3</div>
						<h5>Use up to 300 minutes on your Tribeyo number for just $20/month.</h5>
					</div>
					<img src='images/how_it_works_step_3.gif' />
				</div>
				<div className='row'>
					<h2>A cheaper way to reconnect.</h2>
					<Link to="/signup">
						<button>Create Profile</button>
					</Link>
				</div>
			</View>
		)
	}
}

export default HowItWorks
