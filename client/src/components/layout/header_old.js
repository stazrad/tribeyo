// packages
import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            hiddenClass: null
        };

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    }

    mouseEnter(e) {
        this.setState({
            hiddenClass: null
        });
        let src = e.target.src;
        let hover = src.replace('white', 'alt');
        e.target.src = hover;
    }

    mouseOut(e) {
        let src = e.target.src;
        let white = src.replace('alt', 'white');
        e.target.src = white;
        setTimeout(() => {
            this.setState({
                hiddenClass: 'hidden'
            });
        }, 1500);
    }

    render() {
        return (
            <nav className="navbar navbar-toggleable-md">
                <nav className="navbar navbar-static-top" role="navigation">
                    <div className="navbar-header">
                        {/* <div id='logo-hider'></div> */}
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
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <div id='nav-right'>
                            <span className='nav-button'>MENU</span>
                            <Link to='/login'>
                                 <span className='nav-button'>LOGIN</span>
                             </Link>
                        </div>
        			</div>
        		</nav>
            </nav>
        )
    }
}

export default Header;
