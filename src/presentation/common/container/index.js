import React from 'react'
import './styles.css'
import classNames from 'classnames'

const Container = ({ row, children, center, noPadding, end }) => {
  return (
    <div className={classNames('container', { center, row, noPadding, end })}>
      {children}
    </div>
  )
}

export default Container
