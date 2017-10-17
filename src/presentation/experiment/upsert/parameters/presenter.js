import React from 'react'
import { Form, Grid, Checkbox } from 'semantic-ui-react'

import TextInput from '../../../common/text_input'
import TextInputTime from '../../../common/text_input/time'
import Button from '../../../common/button'
import ButtonIcon from '../../../common/button/icon'

const UpsertExperimentParameters = ({ routine, tempRanges, error, onAddTempRange, onSetTemperatureRange, onRemoveTemperatureRange, onUpdateRoutine }) => {
  return (
    <div>
      <h3>Configurar Paramétros</h3>

      <Form>

        <TextInput
          name='loopDelay'
          error={error}
          type='number'
          label='Intervalo de recolección de medidas'
          placeholder='Minutos'
          min={0}
          step={15}
          value={routine.loopDelay}
          onChange={loopDelay => onUpdateRoutine({ ...routine, loopDelay })}
        />

        <h4>Temperatura</h4>

        <TextInput
          name='targetTemp'
          error={error}
          required
          label='Temperatura inicial'
          placeholder='Temperatura (ºC)'
          type='number'
          value={routine.targetTemp}
          width={8}
          onChange={targetTemp => onUpdateRoutine({ ...routine, targetTemp })}
        />

        { tempRanges.map(tempRange => (
          <Grid>
            <TextInput
              label='Temperatura (ºC)'
              placeholder='Temperatura (ºC)'
              type='number'
              required
              value={tempRange.temp}
              width={6}
              min={0}
              onChange={temp => onSetTemperatureRange({ ...tempRange, temp })}
            />
            <TextInput
              label='Luego de'
              placeholder='Horas'
              type='number'
              value={tempRange.hours}
              width={4}
              min={0}
              onChange={hours => onSetTemperatureRange({ ...tempRange, hours })}
            />
            <TextInput
              className='inlineSecondField'
              placeholder='Minutos'
              type='number'
              value={tempRange.minutes}
              width={4}
              max={60}
              min={0}
              onChange={minutes => onSetTemperatureRange({ ...tempRange, minutes })}
            />

            <Grid.Column width={2}>
              <ButtonIcon
                className='inlineSecondField'
                icon='close'
                onClick={() => onRemoveTemperatureRange(tempRange)}
              />
            </Grid.Column>

          </Grid>
        ))}

        <Button icon='plus' onClick={onAddTempRange}>Programar cambio</Button>

        <TextInput
          name='tempTolerance'
          error={error}
          type='number'
          label='Tolerancia'
          placeholder='Temperatura (ºC)'
          className='inlineSecondField'
          value={routine.tempTolerance}
          width={8}
          onChange={tempTolerance => onUpdateRoutine({ ...routine, tempTolerance })}
        />

        <h4>pH</h4>

        <Checkbox
          defaultChecked={routine.balancePh}
          label='Balancear pH automáticamente'
          onChange={() => onUpdateRoutine({ ...routine, balancePh: !routine.balancePh })}
        />
        <Grid>
          <TextInput
            name='targetPh'
            error={error}
            label='pH'
            placeholder='Objetivo'
            type='number'
            required
            value={routine.targetPh}
            width={8}
            max={14}
            min={0}
            onChange={targetPh => onUpdateRoutine({ ...routine, targetPh })}
          />
          <TextInput
            name='phTolerance'
            error={error}
            placeholder='Tolerancia'
            className='inlineSecondField'
            type='number'
            value={routine.phTolerance}
            width={8}
            onChange={phTolerance => onUpdateRoutine({ ...routine, phTolerance })}
          />
        </Grid>

        <h5>Bombas peristálticas</h5>

        <TextInputTime
          label='Encender luego de'
          seconds={routine.triggerAfter}
          width={8}
          onChange={triggerAfter => onUpdateRoutine({ ...routine, triggerAfter })}
        />

        <TextInputTime
          label='Tiempo de encendido'
          seconds={routine.triggerFor}
          width={8}
          onChange={triggerFor => onUpdateRoutine({ ...routine, triggerFor })}
        />
      </Form>
    </div>
  )
}

export default UpsertExperimentParameters