import React from 'react'
import './styles.css'

const Card = ({ children, title, description, styles }) => {
  return (
    <div className='card'>
      { (title || description) &&
        <div className='cardHeader'>
          { title && <h1>{title}</h1> }
          { description && <p>{description}</p> }
        </div>
      }
      <div className='cardInner' style={styles}>
        { children }
      </div>
    </div>
  )
}

export default Card
