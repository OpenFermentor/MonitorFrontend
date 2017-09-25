export const merge = (from, into) =>
  Object.assign({}, from, into)

export const addByIdEntries = (state, entries) => {
  let newState = state
  entries.forEach(entry => {
    newState = merge(newState, {
      [entry.id]: entry
    })
  })
  return newState
}

export const updateByIdEntries = (state, entries) => {
  entries.forEach(entry => {
    state = merge(state, {
      [entry.id]: {
        ...(state[entry.id] || {}),
        ...entry
      }
    })
  })
  return state
}

export const replaceByIdEntries = (state, entries) => {
  let newState = {}
  entries.forEach(entry => {
    newState = merge(newState, {
      [entry.id]: entry
    })
  })
  return newState
}

export const addByIdEntry = (state, entry) => {
  return merge(state, {
    [entry.id]: entry
  })
}

export const updateByIdEntry = (state, entry) => {
  return merge(state, {
    [entry.id]: {
      ...state[entry.id],
      ...entry
    }
  })
}

export const addEntriesIds = (state, entries) =>
  [ ...new Set(state.concat(entries.map(entry => entry.id))) ]

export const replaceAllEntriesIds = (state, entries) =>
  entries.map(entry => entry.id)

export const addEntryId = (state, entry) =>
  [ ...new Set(state.concat([ entry.id ])) ]

export const removeEntryId = (state, entry) =>
    state.filter(entryId => entryId !== entry.id)
