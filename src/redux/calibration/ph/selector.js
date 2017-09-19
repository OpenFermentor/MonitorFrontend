import { createSelector } from 'reselect'

export const selectActionStatus = createSelector(
  state => state.actionStatus.phCalibration,
  actionStatus => actionStatus
)
