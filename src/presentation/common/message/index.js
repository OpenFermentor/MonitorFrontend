import React from 'react'
import './styles.css'
import classNames from 'classnames'

import Button from '../button'

const Message = ({ title, subtitle, centerVertical, dimmed, action, onClickAction }) => {
  return (
    <div className={classNames('message', { centerVertical })}>
      <div className='body'>
        <h1 className={classNames({ dimmed })}>{title}</h1>
        { subtitle &&
          <p>{ subtitle }</p>
        }
        { action && onClickAction &&
          <Button onClick={onClickAction}>{action}</Button>
        }
      </div>
    </div>
  )
}

export default Message
