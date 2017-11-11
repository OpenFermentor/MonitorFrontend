import React from 'react'
import moment from 'moment'

import TextInput from '../../../common/text_input'

const LoopDelay = ({ routine, onChange }) => {
  const onChangeInput = minutes => {
    const minutesDuration = moment.duration(parseInt(minutes), 'minutes').asMilliseconds() || 0
    onChange(minutesDuration)
  }
  const secondsDuration = moment.duration(routine.loopDelay, 'milliseconds')
  const minutes = secondsDuration.asMinutes()
  return (
    <TextInput
      label='Intervalo de recolección de medidas'
      placeholder='Minutos'
      type='number'
      value={minutes}
      min={0}
      step={15}
      onChange={newMinutes => onChangeInput(newMinutes)}
    />
  )
}

export default LoopDelay
