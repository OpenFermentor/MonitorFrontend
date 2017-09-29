import React from 'react'
import * as SemanticUI from 'semantic-ui-react'
import './styles.css'

let Table = ({ children }) => {
  return (
    <div className='Table'>
      <SemanticUI.Table basic='very'>
        { children }
      </SemanticUI.Table>
    </div>
  )
}

export default Object.assign(Table, SemanticUI.Table)
