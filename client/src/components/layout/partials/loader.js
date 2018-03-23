import React from 'react'

const Loader = loading =>
	loading ? (
		<div>
			<img className="spinner" src="/images/spinner.svg" />
			<div className="spinner-background" />
		</div>
	) : null

export default Loader
