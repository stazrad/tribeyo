// packages
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Sidebar from 'react-sidebar'
import { connect } from 'react-redux'

// components
import Header from './header'
import Main from './main'
import Footer from './footer'

// responsive sidebar
const mql = window.matchMedia('(max-width: 800px)')

class Layout extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			sidebarOpen: false,
			responsive: mql.matches,
			mql
		}
	}

	onSetSidebarOpen = open => {
		this.setState({ sidebarOpen: open })
	}

	toggleSidebar = () => {
		this.setState({ sidebarOpen: !this.state.sidebarOpen })
	}

	mediaQueryChanged = change => {
		this.setState({ responsive: this.state.mql.matches })
	}

	componentWillMount() {
		mql.addListener(this.mediaQueryChanged)
		this.setState({ mql, responsive: mql.matches })
	}

	componentWillUnmount() {
		this.state.mql.removeListener(this.mediaQueryChanged)
	}

	render() {
		const sidebarContent = (
			<ul>
				<img className="sidebar-logo" src="images/tribeyo_logo.png" />
				<div className="sidebar-exit" onClick={this.toggleSidebar}>
					&times;
				</div>
				{this.props.user.isLoggedIn ? (
					<li className="profile" onClick={this.toggleSidebar}>
						<Link to={`/profile/${this.props.user.uid}`}>Profile</Link>
					</li>
				) : (
					<li className="profile" onClick={this.toggleSidebar}>
						<Link to="/login">Login</Link>
					</li>
				)}
				<li onClick={this.toggleSidebar}>
					<Link to="/">Home</Link>
				</li>
				<li onClick={this.toggleSidebar}>
					<Link to="/how-it-works">How It Works</Link>
				</li>
				<li onClick={this.toggleSidebar}>
					<Link to="/plans">Plans</Link>
				</li>
				{!this.props.user.isLoggedIn ? (
					<li onClick={this.toggleSidebar}>
						<Link to="/signup">Signup</Link>
					</li>
				) : null}
			</ul>
		)
		const styles = {
			sidebar: {
				background: 'linear-gradient(rgb(242, 242, 242), rgb(212, 212, 212))',
				width: '80%',
				maxWidth: '500px'
			}
		}
		return (
			<Sidebar
				sidebarClassName="sidebar"
				sidebar={sidebarContent}
				open={this.state.sidebarOpen}
				onSetOpen={this.onSetSidebarOpen}
				pullRight
				styles={styles}>
				<Header toggleSidebar={this.toggleSidebar} />
				<Main />
				<Footer />
			</Sidebar>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default withRouter(connect(mapStateToProps, {})(Layout))
