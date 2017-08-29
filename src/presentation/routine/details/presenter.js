import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import './styles.css'

import SensorChart from '../../common/sensor_chart'
import NavigationChart from './navigation_chart'
import Toolbar from '../../common/toolbar'

export default class RoutineDetails extends Component {
  render () {
    if (!this.props.routine) {
      return
    }
    return (

      <div className='routineDetails'>

        <Toolbar
          title={this.props.routine.title}
          rightTitle='Volver'
          onClickRight={this.props.onCancel}
        />

        <div className='content'>
          { this.props.routine.readings.length > 0 &&
            <div>
              <Button floated='right' onClick={this.props.onExportToCsv}>Exportar a CSV</Button>
            </div>
          }

          <SensorChart
            title='Temperatura'
            valueUnit='ºC'
            data={this.props.timeline}
            value='temp'
          />
          <SensorChart
            title='pH'
            value='ph'
            data={this.props.timeline}
          />
          <SensorChart
            title='Agitación'
            value='density'
            data={this.props.timeline}
          />

          <NavigationChart />

        </div>
      </div>
    )
  }
}
