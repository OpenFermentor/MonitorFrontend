import buildActionStatusReducer from '../../../helper/action_status_builder'

const reducer = buildActionStatusReducer({
  namespace: 'PUMP_CALIBRATION.',
  extraActions: [
    'PUMP_CALIBRATION.PUSH_ACID',
    'PUMP_CALIBRATION.TEST_ACID_DROP',
    'PUMP_CALIBRATION.PUSH_BASE',
    'PUMP_CALIBRATION.TEST_BASE_DROP'
  ]
})

export default {
  actionStatus: reducer
}
