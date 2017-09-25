import React from 'react'
import './styles.css'

import Card from '../../../common/card'
import { Loader, Button } from 'semantic-ui-react'

const currentValueToPh = value => {
  switch (value) {
    case 'neutral': return 7
    case 'acid': return 4
    case 'base': return 10
    default: return null
  }
}

const Calibration = ({ inProgress, error, finished, onStart, onFinish, currentValue }) => (
  <div className='calibration'>
    <Card>
      { finished &&
        <div className='content'>
          <h1>Calibración exitosa</h1>
          <Button disabled={inProgress} fluid primary onClick={onFinish}>Volver a inicio</Button>
        </div>
      }
      { !finished &&
        <div className='content'>
          <h1>Buffer {currentValueToPh(currentValue)}</h1>
          { error &&
            <p>{error}</p>
          }
          { inProgress &&
            <div className='loader'>
              <Loader inline active={inProgress} content='Comenzó la calibración, no quite el sensor de la solución' />
            </div>
          }

          { !inProgress &&
            <div className='action'>
              <Button fluid primary onClick={onStart}>Calibrar</Button>
            </div>
          }
        </div>
      }
    </Card>
  </div>
)

export default Calibration
