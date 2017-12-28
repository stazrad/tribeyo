import React from 'react'

const Loader = (loading) => {
    if(loading) {
        return  <div><img className='spinner' src='/images/spinner.svg' /><div className='spinner-background'></div></div>
    } else {
        return null
    }
}

export default Loader
