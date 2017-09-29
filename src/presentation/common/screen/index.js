import React from 'react'
import './styles.css'
import classNames from 'classnames'

const Screen = ({ children, center = true }) => {
  return (
    <div className={classNames('screen', { center })}>
      {children}
    </div>
  )
}

export default Screen
