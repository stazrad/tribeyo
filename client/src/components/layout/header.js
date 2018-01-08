// PACKAGES //
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';

// RESPONSIVE SIDEBAR //
const mql = window.matchMedia(`(max-width: 800px)`)

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarOpen: false,
            responsive: mql.matches,
            mql
        }

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
        this.mouseEnter = this.mouseEnter.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
        this.toggleSidebar = this.toggleSidebar.bind(this)
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    }

    mouseEnter(e) {
        // this.setState({
        //     hiddenClass: null
        // });
        let src = e.target.src;
        let hover = src.replace('white', 'alt');
        e.target.src = hover;
    }

    mouseOut(e) {
        let src = e.target.src;
        let white = src.replace('alt', 'white');
        e.target.src = white;
        // setTimeout(() => {
        //     this.setState({
        //         hiddenClass: 'hidden'
        //     });
        // }, 1500);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open})
    }

    toggleSidebar() {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql, responsive: mql.matches});
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged(change) {
        this.setState({responsive: this.state.mql.matches});
    }

    render() {
        const sidebarContent = (
            <ul>
                <li onClick={this.toggleSidebar}>
                    <Link to='/'>Home</Link>
                </li>
                <li onClick={this.toggleSidebar}>
                    <Link to='/how-it-works'>How It Works</Link>
                </li>
                <li onClick={this.toggleSidebar}>
                    <Link to='/plans'>Plans</Link>
                </li>
                <li onClick={this.toggleSidebar}>
                    <Link to='/signup'>Signup</Link>
                </li>
            </ul>
        )
        const navRightFull = (
            <div>
                <span onClick={this.toggleSidebar} className='nav-button'>MENU</span>
                <Link to='/login'>
                    <span className='nav-button'>LOGIN</span>
                </Link>
            </div>
        )
        const navRightResponsive = <div id='hamburger' onClick={this.toggleSidebar}>&#9776;</div>
        const styles = {
            sidebar: {
                background: 'linear-gradient(#f2f2f2, #bfbfbf)',
                width: '80%',
                maxWidth: '500px'
            }
        }

        return (
            <Sidebar sidebarClassName='sidebar'
                    sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    pullRight
                    styles={styles} >
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
            </Sidebar>
        )
    }
};

export default Header;
