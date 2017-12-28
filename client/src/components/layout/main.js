// PACKAGES //
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// COMPONENTS //
import Home       from '../views/home';
import HowItWorks from '../views/HowItWorks';
import Login      from '../views/login';
import NotFound   from '../views/notFound';
import Plans      from '../views/plans';
import Profile    from '../views/profile';
import Signup     from '../views/signup';

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/how-it-works' component={HowItWorks} />
                    <Route path='/login' component={Login} />
                    <Route path='/plans' component={Plans} />
                    <Route path='/profile/:id' component={Profile} />
                    <Route path='/signup' component={Signup} />
                    <Route component={NotFound} />
                </Switch>
            </main>
        )
    }
}

export default Main;
