// PACKAGES //
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// IMPORTS //
import Sidebar from './sidebar'

// RESPONSIVE SIDEBAR //
const mql = window.matchMedia(`(max-width: 800px)`)

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            sidebarOpen: false,
            responsive: mql.matches,
            mql
        }

        this.mouseEnter = this.mouseEnter.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    }

    mouseEnter(e) {
        // this.setState({
        //     hiddenClass: null
        // })
        let src = e.target.src
        let hover = src.replace('white', 'alt')
        e.target.src = hover
    }

    mouseOut(e) {
        let src = e.target.src
        let white = src.replace('alt', 'white')
        e.target.src = white
        // setTimeout(() => {
        //     this.setState({
        //         hiddenClass: 'hidden'
        //     })
        // }, 1500)
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
        const navRightFull = (
            <div>
                <span onClick={Sidebar.toggleSidebar} className='nav-button'>MENU</span>
                <Link to='/login'>
                    <span className='nav-button'>LOGIN</span>
                </Link>
            </div>
        )
        const navRightResponsive = <div id='hamburger' onClick={Sidebar.toggleSidebar}>&#9776;</div>

        return (
            <nav>
                <div id='logo-container'>
                    <Link to='/'>
                        <img
                            id='logo'
                            src='/images/tribeyo_logo_white.png'
                            alt='Tribeyo'
                            className={this.state.hiddenClass}
                            onMouseEnter={this.mouseEnter}
                            onMouseOut={this.mouseOut} />
                    </Link>
                </div>
                <div id='nav-right'>
                    {
                        this.state.responsive ? navRightResponsive : navRightFull
                    }
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
