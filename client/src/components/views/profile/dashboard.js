// PACKAGES //
import React from 'react';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                {console.log('MATCH',this.props.match)}
                <h1>Dashboard: {this.props.match.params.id}</h1>
            </div>
        )
    }
}

export default Dashboard;
