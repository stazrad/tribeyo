// PACKAGES //
import React from 'react'
import { Route } from 'react-router-dom'

// COMPONENTS //
import Header  from './layout/header'
import Main    from './layout/main'
import Footer  from './layout/footer'
import Sidebar from './layout/sidebar'

class App extends React.Component {
    render() {
        return (
            <div>
                <Sidebar>
                    <Header />
                    <Main />
                    <Footer />
                </Sidebar>
            </div>
        )
    }
}

export default App
