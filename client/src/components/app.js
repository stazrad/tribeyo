// PACKAGES //
import React from 'react';
import { Route } from 'react-router-dom';

// COMPONENTS //
import Header from './layout/header';
import Main   from './layout/main';
import Footer from './layout/footer';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main />
                <Footer />
            </div>
        )
    }
}

export default App;
