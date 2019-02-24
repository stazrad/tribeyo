export const getAuthHeader = () => `${getAuthToken().type} ${getAuthToken().accessToken}`

export const getAuthToken = () => JSON.parse(localStorage.token)

export const storeAuthToken = token => localStorage.setItem('token', JSON.stringify(token))
