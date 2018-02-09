import React from 'react'
import * as SemanticUI from 'semantic-ui-react'
import './styles.css'

let ButtonOverride = ({ children, icon, ...props }) => {
  const content = props.content && props.content.toUpperCase()
  return (
    <div className='ofButton'>
      <SemanticUI.Button {...props} {...{ content }}>
        { icon &&
          <SemanticUI.Icon name={icon} />
        }
        {children && children.toUpperCase()}
      </SemanticUI.Button>
    </div>
  )
}

export default ButtonOverride
