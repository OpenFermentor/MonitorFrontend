import humps from 'humps'

const transformSnakeToCamelCase = data => humps.camelizeKeys(data)

export default transformSnakeToCamelCase
