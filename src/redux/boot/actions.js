import {
  BOOTING,
  BOOTED,
  SESSION_LOADED
} from './action_types'

export const booting = () => ({ type: BOOTING })
export const booted = () => ({ type: BOOTED })
export const sessionLoaded = () => ({ type: SESSION_LOADED })
