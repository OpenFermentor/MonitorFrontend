import React from 'react'
import * as SemanticUI from 'semantic-ui-react'
import './styles.css'

let Search = props => {
  return (
    <div className='search'>
      <SemanticUI.Search {...props} />
    </div>
  )
}

export default Search
