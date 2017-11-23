import React from 'react'
import './styles.css'
const TagList = ({ tags = [] }) => {
  return (
    <div className='tags'>
      { tags.map(({ value }, index) => (
        <div key={index} className='tag'>
          <p>{value}</p>
        </div>
      ))}
    </div>

  )
}

export default TagList
