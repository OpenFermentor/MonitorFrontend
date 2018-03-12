import React from 'react'
import './styles.css'

import Container from '../../../common/container'

const MagnitudeCard = ({ title, currentValue, targetValue, valueUnit, onClick }) => {
  const displayValue = currentValue === null || currentValue === undefined ? 'N/A' : `${currentValue} ${valueUnit}`
  return (
    <div className='magnitudeChart' onClick={onClick}>
      <div className='header'>
        <Container row noPadding>
          <h4>{title}</h4>
          { !!targetValue &&
            <p>{targetValue} {valueUnit}</p>
          }
        </Container>
        <h1>{displayValue}</h1>
      </div>
    </div>
  )
}

export default MagnitudeCard
