// packages
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// responsive sidebar
const mql = window.matchMedia('(max-width: 800px)')

class Header extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			responsive: mql.matches,
			mql
		}
	}

	mouseEnter = e => {
		const src = e.target.src
		const hover = src.replace('white', 'alt')
		e.target.src = hover
	}

	mouseOut = e => {
		const src = e.target.src
		const white = src.replace('alt', 'white')
		e.target.src = white
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged)
		this.setState({ mql, responsive: mql.matches })
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged)
	}

	mediaQueryChanged = change => {
		this.setState({ responsive: this.state.mql.matches })
	}

	render() {
		const { toggleSidebar } = this.props
		const { hiddenClass, responsive } = this.state
		const navRightFull = (
			<div className="nav-button-container">
				<span onClick={toggleSidebar} className="nav-button">
					MENU
				</span>
				<Link to="/login">
					<span className="nav-button">LOGIN</span>
				</Link>
			</div>
		)
		const navRightResponsive = (
			<div id="hamburger" onClick={toggleSidebar}>
				&#9776;
			</div>
		)

		return (
			<nav>
				<div id="logo-container">
					<Link to="/">
						<img
							id="logo"
							src="/images/tribeyo_logo_white.png"
							alt="Tribeyo"
							className={hiddenClass}
							onMouseEnter={this.mouseEnter}
							onMouseOut={this.mouseOut}
						/>
					</Link>
				</div>
				<div id="nav-right">
					{responsive ? navRightResponsive : navRightFull}
				</div>
			</nav>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Header)
