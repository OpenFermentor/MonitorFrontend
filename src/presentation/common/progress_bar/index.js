import React from 'react'
import './styles.css'

const ProgressBar = ({ children, duration }) => {
  return (
    <div className='progressBar'>
      <span className='fill' style={{animationDuration: duration}} />
    </div>
  )
}

export default ProgressBar
