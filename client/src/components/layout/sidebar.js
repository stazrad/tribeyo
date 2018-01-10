// PACKAGES //
import React from 'react'
import { Link } from 'react-router-dom'
import { default as ReactSidebar } from 'react-sidebar'
import { connect } from 'react-redux'

// RESPONSIVE SIDEBAR //
const mql = window.matchMedia(`(max-width: 800px)`)

class Sidebar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sidebarOpen: false,
            responsive: mql.matches,
            mql
        }

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
        this.toggleSidebar = this.toggleSidebar.bind(this)
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open})
    }

    toggleSidebar() {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged)
        this.setState({mql, responsive: mql.matches})
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged)
    }

    mediaQueryChanged(change) {
        this.setState({responsive: this.state.mql.matches})
    }

    render() {
        const sidebarContent = (
            <ul>
                <img className='sidebar-logo' src='images/tribeyo_logo.png' />
                <div className='sidebar-exit' onClick={this.toggleSidebar}>&times;</div>
                {
                    this.props.user.isLoggedIn ? (
                        <li className='profile' onClick={this.toggleSidebar}>
                            <Link to={`/profile/${this.props.user.uid}`}>Profile</Link>
                        </li>
                    ) : null
                }
                <li onClick={this.toggleSidebar}>
                    <Link to='/'>Home</Link>
                </li>
                <li onClick={this.toggleSidebar}>
                    <Link to='/how-it-works'>How It Works</Link>
                </li>
                <li onClick={this.toggleSidebar}>
                    <Link to='/plans'>Plans</Link>
                </li>
                {
                    !this.props.user.isLoggedIn ? ([
                        <li key='1' onClick={this.toggleSidebar}>
                            <Link to='/signup'>Signup</Link>
                        </li>,
                        <li key='2' onClick={this.toggleSidebar}>
                            <Link to='/login'>Login</Link>
                        </li>
                    ]) : null
                }
            </ul>
        )
        const styles = {
            sidebar: {
                background: 'linear-gradient(#f2f2f2, #bfbfbf)',
                width: '80%',
                maxWidth: '500px'
            }
        }
        return (
            <ReactSidebar sidebarClassName='sidebar'
                    sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    pullRight
                    styles={styles}>
            </ReactSidebar>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Sidebar)
