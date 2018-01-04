// PACKAGES //
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';

// RESPONSIVE //
const mql = window.matchMedia(`(min-width: 800px)`)

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sidebarOpen: false
        }

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
        this.mouseEnter = this.mouseEnter.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
        this.toggleSidebar = this.toggleSidebar.bind(this)
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

    render() {
        var sidebarContent = (
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/how-it-works'>How It Works</Link>
                </li>
                <li>
                    <Link to='/plans'>Plans</Link>
                </li>
                <li>
                    <Link to='/signup'>Signup</Link>
                </li>
            </ul>
        )

        return (
            <Sidebar sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    pullRight>
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
                        <span onClick={this.toggleSidebar} className='nav-button'>MENU</span>
                        <Link to='/login'>
                            <span className='nav-button'>LOGIN</span>
                        </Link>
                    </div>
                </nav>
            </Sidebar>
        )
    }
};

export default Header;
