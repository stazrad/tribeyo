export const getAuthHeader = () => `${getToken().type} ${getToken().accessToken}`

export const getAuthToken = () => JSON.parse(localStorage.token)

export const setAuthToken = token => localStorage.setItem('token', JSON.stringify(token))
