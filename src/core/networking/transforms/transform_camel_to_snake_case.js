import humps from 'humps'

const transformCamelToSnakeCase = data => humps.decamelizeKeys(data)

export default transformCamelToSnakeCase
