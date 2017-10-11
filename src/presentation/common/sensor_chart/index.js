import React from 'react'
import './styles.css'
import Container from '../../common/container'
import LineChart from '../../common/chart/line'

const MAGNITUDE_COLORS = {
  temp: '#F27C21',
  ph: '#9D5BDB',
  co2: '#6DE6AC',
  density: '#50AEF5'
}

const SensorChart = ({ timeline, magnitudes, height = 60 }) => {
  return (
    <Container>
      <div className='sensorChart'>
        { (!timeline || timeline.labels.length === 0) &&
          <p>No hay datos</p>
        }
        {
          timeline && timeline.labels.length > 0 &&
          <LineChart
            height={height}
            labels={timeline.labels}
            datasets={magnitudes.map(magnitude => ({ data: timeline[magnitude], stroke: MAGNITUDE_COLORS[magnitude] }))}
          />
        }
      </div>
    </Container>

  )
}

export default SensorChart
