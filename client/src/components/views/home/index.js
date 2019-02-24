// packages
import React from 'react'
import { Link } from 'react-router-dom'

// imports
import View from 'components/View'

class Home extends React.Component {
	render() {
		return (
			<View>
				<div className="text-block">
					<h1>
						A cheaper way to <span>reconnect</span>
					</h1>
					<p className="blurb">
						Tribeyo is a communcation app for people that are tired of paying
						long distance fees.
					</p>
					<Link to="/signup">
						<button>Get Started</button>
					</Link>
				</div>
				<div className="image-block">
					<img id="chat-bubbles" src="/images/tribeyo_mark_chat_bubbles.png" />
				</div>
			</View>
		)
	}
}

export default Home
