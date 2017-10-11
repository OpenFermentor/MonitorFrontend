import React from 'react'
import * as SemanticUI from 'semantic-ui-react'
import './styles.css'

let ButtonOverride = ({ children, ...props }) => {
  const content = props.content && props.content.toUpperCase()
  return (
    <div className='button'>
      <SemanticUI.Button {...props} {...{ content }}>{children && children.toUpperCase()}</SemanticUI.Button>
    </div>
  )
}

export default ButtonOverride
