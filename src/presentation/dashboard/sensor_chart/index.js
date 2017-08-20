import React from 'react'
import './styles.css'
import Card from '../card'
import LineChart from '../../common/chart/line'

const SensorChart = ({ title, valueUnit, currentValue, data }) => {
  return (
    <Card>
      <div className='sensorChart'>
        <div className='header'>
          <h2>{title}</h2>
          <h2>{currentValue}{valueUnit}</h2>
        </div>
        { data.labels.length === 0 &&
          <p>No hay datos</p>
        }
        {
          data.labels.length > 0 &&
          <LineChart
            height={60}
            labels={data.labels}
            datasets={[{ data: data.values, stroke: '#F27C21' }]}
          />
        }
      </div>
    </Card>

  )
}

export default SensorChart
