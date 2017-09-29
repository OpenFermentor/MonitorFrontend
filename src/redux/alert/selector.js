import { createSelector } from 'reselect'

const entity = state => state.entities.alert

export const selectPendingAlerts = createSelector(entity,
  alerts => alerts.filter(alert => !alert.dismissed)
)
