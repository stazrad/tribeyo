// packages
import React from 'react'

// imports
import View from 'components/View'

class HowItWorks extends React.Component {
	render() {
		return (
			<View title={'How it works'}>
				<div class='row'>
					<div class='step'>
						<div class='number'>1</div>
						<h3>Tribeyo sets up a phone number local to your remote contact.</h3>
					</div>
					<img src='images/how_it_works_step_1.gif' />
				</div>
				<div class='row'>
					<img src='images/how_it_works_step_2.gif' />
					<div class='step'>
						<div class='number'>2</div>
						<h3>When they dial this local number, Tribeyo bypasses the long distance fees and forwards the call to your phone.</h3>
					</div>
				</div>
				<div class='row'>
					<div class='step'>
						<div class='number'>3</div>
						<h3>Use up to 300 minutes on your Tribeyo number for just $20/month.</h3>
					</div>
					<img src='images/how_it_works_step_3.gif' />
				</div>
			</View>
		)
	}
}

export default HowItWorks
