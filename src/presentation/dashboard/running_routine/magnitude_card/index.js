import React from 'react'
import './styles.css'

import Container from '../../../common/container'

const MagnitudeCard = ({ title, currentValue, targetValue, valueUnit, onClick }) => {
  if (!currentValue) {
    return null
  }
  return (
    <div className='magnitudeChart' onClick={onClick}>
      <div className='header'>
        <Container row noPadding>
          <h4>{title}</h4>
          <p>{targetValue} {valueUnit}</p>
        </Container>
        { currentValue &&
          <h1>{currentValue} {valueUnit}</h1>
        }
      </div>
    </div>
  )
}

export default MagnitudeCard
