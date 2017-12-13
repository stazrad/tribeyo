// PACKAGES //
import React from 'react';
import { BrowserRouter, Route, browserHistory } from 'react-router-dom';

// COMPONENTS //
import Home from './views/home';

console.log('browserHistory',browserHistory);

class App extends React.Component {
    render() {
        return (
            <BrowserRouter history={browserHistory}>
                <Route path='/' component={Home} />
            </BrowserRouter>
        )
    }
}

export default App;
