import { merge } from '../../helper'

const INITIAL_STATE = {
  booted: false
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BOOTED': return booted(state, action)
    default: return state
  }
}

const booted = state =>
  merge(state, { booted: true })

export default reducer
