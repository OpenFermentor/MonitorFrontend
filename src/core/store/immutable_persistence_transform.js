import { createTransform } from 'redux-persist'
import Immutable from 'seamless-immutable'

const isImmutable = state => state.asMutable
const convertToJs = state => state.asMutable({deep: true})
const toImmutable = raw => Immutable(raw)

export default createTransform(
  (inboundState, key) => {
    if (isImmutable(inboundState)) {
      if (key === 'actionStatus') {
        return convertToJs(Immutable({
          ...inboundState,
          boot: {
            booted: false
          }
        }))
      }
      return convertToJs(inboundState)
    }
    return inboundState
  },
  (outboundState, key) => {
    if (key === 'actionStatus') {
      return toImmutable({
        ...outboundState,
        boot: {
          booted: true
        }
      })
    }
    return toImmutable(outboundState)
  }
)
