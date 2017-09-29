import React from 'react'
import './styles.css'
import classNames from 'classnames'

const Container = ({ row, children, center, noPadding }) => {
  return (
    <div className={classNames('container', { center, row, noPadding })}>
      {children}
    </div>
  )
}

export default Container
