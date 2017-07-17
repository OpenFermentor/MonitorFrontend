import _ from 'lodash'

const normalizeErrorMessage = error => {
  if (_.isEmpty(error)) {
    return normalizeEmptyError()
  }
  if (_.isPlainObject(error)) {
    return normalizeObjectError(error)
  }
  if (_.isString(error)) {
    return normalizeStringError(error)
  }
  if (_.isArray(error)) {
    return normalizeArrayError(error)
  }
}

const normalizeObjectError = error => {
  if (isRootErrorObject(error)) {
    return normalizeErrorMessage(error[getFirstKey(error)])
  }
  return {
    message: normalizeErrorMessage(error[getFirstKey(error)]).message,
    type: 'Object',
    errors: _.mapValues(error, normalizeErrorMessage)
  }
}

const isRootErrorObject = error => {
  const keys = _.keys(error)
  return keys[0] === 'error' || keys[0] === 'errors'
}

const getFirstKey = error => {
  return _.keys(error)[0]
}

const normalizeArrayError = error => ({
  message: error[0],
  type: 'Array',
  errors: error
})

const normalizeStringError = error => ({
  message: error,
  type: 'String',
  errors: error
})

const normalizeEmptyError = () => {
  return {
    message: null,
    type: 'Empty',
    errors: null
  }
}

export default normalizeErrorMessage
