import React from 'react'
import './styles.css'
import Card from '../../common/card'
import LineChart from '../../common/chart/line'

const VALUE_COLORS = {
  temp: '#F27C21',
  ph: '#9D5BDB',
  co2: '#6DE6AC',
  density: '#50AEF5'
}

const SensorChart = ({ title, valueUnit, value, currentValue, data }) => {
  return (
    <Card>
      <div className='sensorChart'>
        <div className='header'>
          <h2>{title}</h2>
          { currentValue &&
            <h2>{currentValue}{valueUnit}</h2>
          }
        </div>
        { data.labels.length === 0 &&
          <p>No hay datos</p>
        }
        {
          data.labels.length > 0 &&
          <LineChart
            height={60}
            labels={data.labels}
            datasets={[{ data: data[value], stroke: VALUE_COLORS[value] }]}
          />
        }
      </div>
    </Card>

  )
}

export default SensorChart
