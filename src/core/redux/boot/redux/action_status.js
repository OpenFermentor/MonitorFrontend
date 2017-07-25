import Immutable from 'seamless-immutable'

const INITIAL_STATE = Immutable({
  booted: false
})

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'BOOTED': return booted(state, action)
    default: return state
  }
}

const booted = state =>
  state.merge({ booted: true })

export default reducer
