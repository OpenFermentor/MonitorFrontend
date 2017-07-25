import Immutable from 'seamless-immutable'

const INITIAL_STATE = Immutable({
  fetching: null,
  error: null
})

const buildActionStatusReducer = ({ namespace, prefix, pluralPrefix, index, get, update, create, remove, extraActions }) => (state = INITIAL_STATE, action) => {
  const baseActionTypes = buildBaseActionTypes({ namespace, prefix, pluralPrefix, index, get, update, create, remove, extraActions })

  if (action.type === 'BOOTED' || action.type === 'RESET') {
    return state.merge({ fetching: null, error: null })
  }

  if (baseActionTypes.map(action => `${action}_REQUEST`).includes(action.type)) {
    return state.merge({ fetching: true, error: null })
  }

  if (baseActionTypes.map(action => `${action}_FAILURE`).includes(action.type)) {
    return state.merge({ fetching: false, error: action.error })
  }

  if (baseActionTypes.map(action => `${action}_SUCCESS`).includes(action.type)) {
    return state.merge({ fetching: false, error: null })
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
