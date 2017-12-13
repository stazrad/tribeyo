// PACKAGES //
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// COMPONENTS //
import Dashboard from './dashboard';
import Login     from '../login';

class Profile extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/profile' component={Login}/>
                    <Route path='/profile/:id' component={Dashboard}/>
                </Switch>
            </div>
        )
    }
}

export default Profile;
