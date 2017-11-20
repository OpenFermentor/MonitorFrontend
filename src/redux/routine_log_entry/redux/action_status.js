import buildActionStatusReducer from '../../helper/action_status_builder'

const requestReducer = buildActionStatusReducer({
  namespace: 'ROUTINE_LOG_ENTRIES.',
  prefix: 'ROUTINE_LOG_ENTRIES',
  get: true
})

export default requestReducer
