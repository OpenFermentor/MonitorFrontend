import React, { Component } from 'react'

import NavigationChart from './navigation_chart'
import SensorChart from './sensor_chart'
import Toolbar from '../common/toolbar'

export default class DashboardContainer extends Component {
  render () {
    return (
      <div className='dashboard'>

        <Toolbar
          title='Experimento en curso'
          rightIcon='settings'
          onPressRight={() => {}}
        />

        <div className='sensorChartRow'>
          <SensorChart
            title='Temperatura'
            valueUnit='ºC'
            currentValue={this.props.lastValue.temp}
            data={this.props.temperatureTimeline}
          />
        </div>
        <div className='sensorChartRow'>
          <SensorChart
            title='pH'
            valueUnit=''
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels }}
          />
          <SensorChart
            title='Agitación'
            valueUnit='rpm'
            currentValue={0}
            data={{ labels: this.props.temperatureTimeline.labels }}
          />
        </div>

        <NavigationChart
          data={{
            labels: this.props.temperatureTimeline.labels,
            datasets: [{ data: this.props.temperatureTimeline.data }]
          }}
        />
      </div>
    )
  }
}
