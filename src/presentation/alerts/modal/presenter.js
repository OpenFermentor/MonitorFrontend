import React from 'react'
import Modal from '../../common/modal'

const ModalAlertPresenter = ({ alert, onDismiss }) => {
  return (
    <Modal open title={alert.status === 'system' ? 'Alerta' : 'Instrucción de operativa'} onClose={onDismiss}>
      <Modal.Content image>
        <Modal.Description>
          <p>{ alert.message}</p>
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
