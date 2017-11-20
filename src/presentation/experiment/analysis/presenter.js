import React from 'react'
import './styles.css'

import Screen from '../../common/screen'
import Container from '../../common/container'
import SensorChart from '../../common/sensor_chart'

import NavigationChart from './navigation_chart'
import LogEntry from './log_entry'

const ExperimentAnalysisPresenter = ({ timeline, logEntries, fetching, error }) => {
  return (
    <Screen loading={fetching || timeline.labels.lenght === 0}>

      <div className='analysisContent'>
        <div className='data'>
          <Container>
            <h2>Temperatura</h2>
            <SensorChart
              magnitudes={['temp']}
              timeline={timeline}
            />
          </Container>

          <Container>
            <h2>pH</h2>
            <SensorChart
              magnitudes={['ph']}
              timeline={timeline}
            />
          </Container>
        </div>

        <div className='events'>
          <Container>
            <h2>Eventos</h2>
            { logEntries.map(logEntry =>
              <LogEntry key={logEntry.id} logEntry={logEntry} />
            )}

          </Container>
        </div>
      </div>

      <NavigationChart />
    </Screen>
  )
}

export default ExperimentAnalysisPresenter
