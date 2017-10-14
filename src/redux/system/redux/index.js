import buildActionStatusReducer from '../../helper/action_status_builder'

const reducer = buildActionStatusReducer({
  namespace: 'SYSTEM.',
  extraActions: ['SYSTEM.RESTART']
})

export default {
  actionStatus: reducer
}
