const actionStatus = state => state.actionStatus.session

export const selectFetchingStatus = state => actionStatus(state)

export const selectCurrentUser = state => actionStatus(state).currentUser

export const selectLoggedIn = state =>
  !!actionStatus(state).currentUser
