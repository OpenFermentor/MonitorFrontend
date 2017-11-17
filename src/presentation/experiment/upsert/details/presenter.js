import React from 'react'
import { Form, Grid } from 'semantic-ui-react'

import TextInput from '../../../common/text_input'
import TextArea from '../../../common/text_area'
import TextInputTime from '../../../common/text_input/time'

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
        </Grid>

        <TextInputTime
          label='Tiempo estimado'
          seconds={routine.estimatedTimeSeconds}
          width={8}
          onChange={estimatedTimeSeconds => onUpdateRoutine({ ...routine, estimatedTimeSeconds })}
        />

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
