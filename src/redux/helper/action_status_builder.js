import { merge } from './index'
const INITIAL_STATE = {
  fetching: null,
  error: null
}

const buildActionStatusReducer = ({ namespace, prefix, pluralPrefix, index, get, update, create, remove, extraActions }) => (state = INITIAL_STATE, action) => {
  const baseActionTypes = buildBaseActionTypes({ namespace, prefix, pluralPrefix, index, get, update, create, remove, extraActions })
  if (action.type === 'BOOTED' || action.type === 'RESET') {
    return merge(state, { fetching: null, error: null })
  }

  if (baseActionTypes.map(action => `${action}_REQUEST`).includes(action.type)) {
    return merge(state, { fetching: true, error: null })
  }

  if (baseActionTypes.map(action => `${action}_FAILURE`).includes(action.type)) {
    return merge(state, { fetching: false, error: action.error })
  }

  if (baseActionTypes.map(action => `${action}_SUCCESS`).includes(action.type)) {
    return merge(state, { fetching: false, error: null })
  }

  return state
}

const buildBaseActionTypes = ({ namespace, prefix, pluralPrefix, index, get, update, create, remove, extraActions }) => {
  let actionTypes = extraActions || []

  if (index) {
    actionTypes.push(`${namespace}FETCH_${pluralPrefix}`)
  }

  if (get) {
    actionTypes.push(`${namespace}FETCH_${prefix}`)
  }

  if (update) {
    actionTypes.push(`${namespace}UPDATE_${prefix}`)
  }

  if (create) {
    actionTypes.push(`${namespace}CREATE_${prefix}`)
  }

  if (remove) {
    actionTypes.push(`${namespace}DESTROY_${prefix}`)
  }

  return actionTypes
}

export default buildActionStatusReducer
