import { createSelector } from 'reselect'

const actionStatus = state => state.actionStatus.boot

export const selectHasBootCompleted = createSelector(
  [actionStatus],
  actionStatus => actionStatus.booted
)
