import buildActionStatusReducer from '../../../library/action_status_reducer_builder'

export default buildActionStatusReducer({
  extraActions: ['READINGS.FETCH_ROUTINE_READINGS']
})
