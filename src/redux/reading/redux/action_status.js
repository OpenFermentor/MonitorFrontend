import buildActionStatusReducer from '../../helper/action_status_builder'

export default buildActionStatusReducer({
  extraActions: ['READINGS.FETCH_ROUTINE_READINGS', 'READINGS.CREATE_EXTERNAL_READING']
})
