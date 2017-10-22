import React from 'react'
import { Form, Grid } from 'semantic-ui-react'

import TextInput from '../../../common/text_input'
import TextArea from '../../../common/text_area'

const UpsertExperimentDetails = ({ routine, error, onUpdateRoutine }) => {
  return (
    <div>
      <h3>Información básica</h3>

      <Form>
        <TextInput
          name='title'
          error={error}
          label='Título'
          required
          value={routine.title}
          onChange={title => onUpdateRoutine({ ...routine, title })}
        />

        <Grid>
          <TextInput
            name='strain'
            error={error}
            label='Microorganismo'
            required
            value={routine.strain}
            width={8}
            onChange={strain => onUpdateRoutine({ ...routine, strain })}
          />
          <TextInput
            name='medium'
            error={error}
            label='Medio'
            required
            value={routine.medium}
            width={8}
            onChange={medium => onUpdateRoutine({ ...routine, medium })}
          />

          <TextInput
            name='estimatedTimeSeconds'
            error={error}
            label='Tiempo estimado del experimento'
            placeholder='Horas'
            type='number'
            width={8}
            min={0}
            value={routine.hours}
            onChange={hours => onUpdateRoutine({ ...routine, hours })}
          />
          <TextInput
            type='number'
            placeholder='Minutos'
            className='inlineSecondField'
            width={8}
            max={60}
            min={0}
            step={15}
            value={routine.minutes}
            onChange={minutes => onUpdateRoutine({ ...routine, minutes })}
          />
        </Grid>

        <TextArea
          name='extraNotes'
          error={error}
          label='Notas adicionales'
          value={routine.extraNotes || ''}
          onChange={extraNotes => onUpdateRoutine({ ...routine, extraNotes })}
        />

      </Form>

    </div>
  )
}

export default UpsertExperimentDetails
