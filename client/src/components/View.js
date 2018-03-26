// packages
import React from 'react'
import { Redirect } from 'react-router-dom'

// imports
import { Loader, Main, Title } from 'components/styled'

class View extends React.Component {
	render() {
		const { children, loading, redirect, redirectTo, title } = this.props
		return (
			<Main>
				<Loader loading={loading} />
				{redirect ? <Redirect to={redirectTo} /> : null}
				{title ? <Title>{title}</Title> : null}
				{children}
			</Main>
		)
	}
}

export default View
