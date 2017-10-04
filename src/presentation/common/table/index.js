import React from 'react'
import * as SemanticUI from 'semantic-ui-react'
import './styles.css'

let Table = ({ children, ...props }) => {
  return (
    <div className='Table'>
      <SemanticUI.Table basic='very' {...props}>
        { children }
      </SemanticUI.Table>
    </div>
  )
}

export default Object.assign(Table, SemanticUI.Table)
