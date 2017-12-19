import React from 'react'
import './styles.css'

import Card from '../../../common/card'
import ProgressBar from '../../../common/progress_bar'
import { Button } from 'semantic-ui-react'
import CalibrationSteps from './calibration_steps'

const currentValueToPh = value => {
  switch (value) {
    case 'neutral': return 7
    case 'acid': return 4
    case 'base': return 10
    default: return null
  }
}

const Calibration = ({ inProgress, error, finished, onCancel, onStart, onFinish, currentValue }) => (
  <div className='calibration'>
    { !finished &&
      <Card title='Calibrar pH-metro' description='Antes de poder usar el pH-metro, deberá calibrarlo. Siga las instrucciones para hacerlo.'>
        <div>
          <CalibrationSteps value={currentValueToPh(currentValue)} />
          { error &&
            <p>{error}</p>
          }
          { inProgress &&
            <div className='loader'>
              <p className='warning'>Calibrando buffer {currentValueToPh(currentValue)}<br />NO retire el pH-metro de la solución</p>
              <ProgressBar duration='91s' />
            </div>
          }
          { !inProgress &&
            <div>
              <h2>Calibrar con buffer {currentValueToPh(currentValue)}</h2>
              <ol className='instructions'>
                <li>Coloque la solución del buffer {currentValueToPh(currentValue)} en un recipiente</li>
                <li>Asegurese que la cantidad de solución es suficiente para cubrir toda la punta del pH-metro.</li>
                <li>Coloque la punta en el recipiente</li>
                <li>Haga click en 'Calibrar' y mantenga la punta del pH-metro en el recipiente hasta que se le indique</li>
              </ol>
              <div className='action'>
                <Button fluid primary onClick={onStart}>Iniciar calibración con buffer {currentValueToPh(currentValue)}</Button>
              </div>
            </div>
          }
          <br />
          <Button fluid onClick={onCancel}>Cancelar</Button>
        </div>
      </Card>
    }
    { finished &&
      <Card>
        <div className='loader'>
          <h1 className='success'>Calibración exitosa</h1>
          <Button disabled={inProgress} fluid primary onClick={onFinish}>Volver a inicio</Button>
          <Button onClick={onCancel}>Cancelar</Button>
        </div>
      </Card>
    }
  </div>
)

export default Calibration
