import React from 'react'
import './styles.css'
import classNames from 'classnames'

import Button from '../button'

const Message = ({ title, dimmed, action, onClickAction }) => {
  return (
    <div className='message'>
      <h1 className={classNames({ dimmed })}>{title}</h1>
      { action && onClickAction &&
        <Button onClick={onClickAction}>{action}</Button>
      }
    </div>
  )
}

export default Message
