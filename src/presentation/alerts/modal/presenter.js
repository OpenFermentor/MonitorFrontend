import React from 'react'
import Modal from '../../common/modal'

const ModalAlertPresenter = ({ alert, onDismiss }) => {
  return (
    <Modal open title={alert.message} onClose={onDismiss}>
      <Modal.Content image>
        <Modal.Description>
          { !!alert.errors &&
            <ul>
              { alert.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          }
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default ModalAlertPresenter
