import React from 'react'
import './styles.css'
import LineChart from '../../../common/chart/line'

const SensorChart = ({ title, valueUnit, currentValue, data }) => {
  return (
    <div className='sensorChart'>
      {
        <h4>{title}</h4>
      }
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
  )
}

export default SensorChart
