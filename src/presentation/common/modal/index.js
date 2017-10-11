import React from 'react'
import * as SemanticUI from 'semantic-ui-react'
import './styles.css'

import Container from '../container'

let Modal = ({ children, ...props }) => {
  return (
    <div className='modal'>
      <SemanticUI.Modal {...props}>
        <SemanticUI.Modal.Header>
          <Container row noPadding>
            <h4 className='light'>{props.title}</h4>
            <SemanticUI.Icon onClick={props.onClose} name='close' />
          </Container>
        </SemanticUI.Modal.Header>
        { children }
      </SemanticUI.Modal>
    </div>
  )
}

export default Object.assign(Modal, SemanticUI.Modal)
