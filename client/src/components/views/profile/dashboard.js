// PACKAGES //
import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            displayNumber: '(636) 878-9999',
            number: '1'
        }
    }

    render() {
        let callToAction = 'SUBSCRIBE TO GET YOUR NUMBER';
        let subscribeButton = (<button className='subscribe'>SUSBSCRIBE NOW</button>);

        return (
            <div id='dashboard'>
                {/* <h1>Dashboard: {this.props.match.params.id}</h1> */}
                <h2>YOUR NUMBER:</h2>
                <h2 id='phone-number'>{this.state.displayNumber}</h2>
                <h2 className='call-to-action'>{!this.state.number ? callToAction : null}</h2>
                {!this.state.number ? subscribeButton : null}
                <button className='update-profile'>UPDATE PROFILE</button>
                <div className="contact">
                    Have questions?&nbsp;
                    <Link to="/how-it-works" className='contact-us'>
                        Contact us.
                    </Link>
                </div>
            </div>
        )
    }
}

export default Dashboard;
