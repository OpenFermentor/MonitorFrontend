import React from 'react'
import './styles.css'

const phValueToOrderedInt = value => {
  switch (value) {
    case 7: return 1
    case 4: return 2
    case 10: return 3
    default: return null
  }
}

const classNameForValue = (value, position, baseClass) => {
  const orderedValue = phValueToOrderedInt(value)
  if (orderedValue < position) return baseClass
  else if (orderedValue === position) return baseClass + ' active'
  else return baseClass + ' done'
}

const CalibrationSteps = ({ value }) => (
  <div className='steps'>
    <div className={classNameForValue(value, 1, 'step')}><span>7</span></div>
    <span className={classNameForValue(value, 2, 'line')} />
    <div className={classNameForValue(value, 2, 'step')}><span>4</span></div>
    <span className={classNameForValue(value, 3, 'line')} />
    <div className={classNameForValue(value, 3, 'step')}><span>10</span></div>
  </div>
)

export default CalibrationSteps
