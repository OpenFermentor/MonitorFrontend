import React from 'react'
import { Loader } from 'semantic-ui-react'
import './styles.css'
import classNames from 'classnames'

const Screen = ({ children, loading, center = true }) => {
  return (
    <div className={classNames('screen', { center })}>
      { loading &&
        <Loader active inline='centered' />
      }
      { !loading &&
        children
      }
    </div>
  )
}

export default Screen
