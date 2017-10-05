import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import './styles.css'

import SensorChart from '../../common/sensor_chart'
import Alerts from '../alerts'
import Toolbar from '../../common/toolbar'
import Screen from '../../common/screen'
import Container from '../../common/container'

import MagnitudeCard from './magnitude_card'
import ExpandedMagnitudeModal from './expanded_magnitude_modal'

const magnitudeTitle = magnitude => {
  switch (magnitude) {
    case 'temp': return 'Temperatura'
    case 'ph': return 'pH'
    case 'density': return 'Transmitancia'
  }
}

export default class SensorsDashboardPresenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedMagnitude: false
    }
  }

  onClickMagnitude (magnitude) {
    this.setState({ expandedMagnitude: magnitude })
  }

  clearExpandedMagnitude () {
    this.setState({ expandedMagnitude: null })
  }

  render () {
    return (
      <Screen>

        <Toolbar
          title={this.props.routine.title}
          rightActionTitle='Finalizar'
          onClickRightAction={this.props.onRoutineStop}
        />

        { this.state.expandedMagnitude &&
          <ExpandedMagnitudeModal
            title={magnitudeTitle(this.state.expandedMagnitude)}
            magnitude={this.state.expandedMagnitude}
            timeline={this.props.timeline}
            onClose={this.clearExpandedMagnitude.bind(this)}
          />
        }

        <Alerts />

        <Container>
          <Grid>
            <Grid.Column width={5}>
              <MagnitudeCard
                title={magnitudeTitle('temp')}
                valueUnit='ºC'
                targetValue={this.props.routine.targetTemp}
                currentValue={this.props.currentValue.temp}
                onClick={() => this.onClickMagnitude('temp')}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <MagnitudeCard
                title={magnitudeTitle('ph')}
                valueUnit='pH'
                targetValue={this.props.routine.targetPh}
                currentValue={this.props.currentValue.ph}
                onClick={() => this.onClickMagnitude('ph')}
                />
            </Grid.Column>
            <Grid.Column width={5}>
              <MagnitudeCard
                title={magnitudeTitle('density')}
                valueUnit='NTU'
                targetValue={this.props.routine.targetDensity}
                currentValue={this.props.currentValue.density}
                onClick={() => this.onClickMagnitude('density')}
                />
            </Grid.Column>
          </Grid>
        </Container>

        { this.props.timeline &&
          <SensorChart
            magnitudes={['temp', 'ph', 'density']}
            timeline={this.props.timeline}
            height={140}
          />
        }

      </Screen>
    )
  }
}
