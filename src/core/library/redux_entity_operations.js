import Immutable from 'seamless-immutable'

export const addByIdEntries = (state, entries) => {
  let newState = state
  entries.forEach(entry => {
    newState = newState.merge({
      [entry.id]: Immutable(entry)
    })
  })
  return newState
}

export const updateByIdEntries = (state, entries) => {
  entries.forEach(entry => {
    state = state.merge({
      [entry.id]: Immutable({
        ...(state[entry.id] || {}),
        ...entry
      })
    })
  })
  return state
}

export const replaceByIdEntries = (state, entries) => {
  let newState = Immutable({})
  entries.forEach(entry => {
    newState = newState.merge({
      [entry.id]: Immutable(entry)
    })
  })
  return newState
}

export const addByIdEntry = (state, entry) => {
  return state.merge({
    [entry.id]: Immutable(entry)
  })
}

export const updateByIdEntry = (state, entry) => {
  return state.merge({
    [entry.id]: Immutable({
      ...state[entry.id],
      ...entry
    })
  })
}

export const addEntriesIds = (state, entries) =>
  Immutable([ ...new Set(state.concat(entries.map(entry => entry.id))) ])

export const replaceAllEntriesIds = (state, entries) =>
  Immutable(entries.map(entry => entry.id))

export const addEntryId = (state, entry) =>
  Immutable([ ...new Set(state.concat([ entry.id ])) ])

export const removeEntryId = (state, entry) =>
    state.filter(entryId => entryId !== entry.id)
