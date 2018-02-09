import React from 'react'
import { connect } from 'react-redux'

import {
  dismissAlert
} from '../../../redux/alert/actions'

import ModalAlertPresenter from './presenter'

const ModalAlert = ({ alert, dismissAlert }) => {
  return (
    <ModalAlertPresenter
      alert={alert}
      onDismiss={() => dismissAlert(alert)}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  dismissAlert: alert => dispatch(dismissAlert(alert))
})

export default connect(null, mapDispatchToProps)(ModalAlert)
