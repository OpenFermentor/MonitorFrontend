import normalizeErrorMessage from './normalize_error_message'
import transformSnakeToCamelCase from './transform_snake_to_camel_case'

const normalizeError = error => {
  let message
  let problem

  if (error.message === 'Network Error') {
    message = 'No se puede conectar a la red de OpenFermentor'
    problem = 'NETWORK'
  } else if (error.response.status >= 500) {
    message = 'Algo ha salido mal, inténtalo luego'
    problem = 'SERVER'
  } else if (error.response.status >= 400) {
    message = error.response.data || {}
    problem = 'CLIENT'
  }

  message = transformSnakeToCamelCase(message)

  return {
    problem,
    ...normalizeErrorMessage(message)
  }
}

export default normalizeError
