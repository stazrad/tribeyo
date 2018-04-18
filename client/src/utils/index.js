export const getAuthHeader = () => `${getToken().type} ${getToken().accessToken}`

export const getToken = () => JSON.parse(localStorage.token)
