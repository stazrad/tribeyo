// PACKAGES //
import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = {
            number: {
                purchasedNumber: {
                    displayNumber: '(636) 878-9999'
                },
                forwardToNumber: {
                    displayNumber: '(909) 877-1991'
                }
            }
        }
    }

    render() {
        let callToAction = 'SUBSCRIBE TO GET YOUR NUMBER';
        let subscribeButton = (<button className='subscribe'>SUSBSCRIBE NOW</button>);

        return (
            <div id='dashboard'>
                {/* <h1>Dashboard: {this.props.match.params.id}</h1> */}
                <h2>YOUR TRIBEYO NUMBER:</h2>
                <h2 id='phone-number'>{this.state.number.purchasedNumber.displayNumber}</h2>
                <h3 id='forwards-to'>Forwards to:
                    <span id='forwards-to-number'>{this.state.number.forwardToNumber.displayNumber}</span>
                </h3>
                <h2 className='call-to-action'>{!this.state.number ? callToAction : null}</h2>
                {!this.state.number ? subscribeButton : null}
                <button className='edit-profile'>EDIT PROFILE</button>
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
