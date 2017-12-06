import React, { Component } from 'react'
import './styles.css'

import SensorChart from '../../common/sensor_chart'
import Toolbar from '../../common/toolbar'
import Screen from '../../common/screen'
import Container from '../../common/container'

import MagnitudeCard from './magnitude_card'
import ExpandedMagnitudeModal from './expanded_magnitude_modal'
import AddExternalReadingModal from './add_external_reading'

const magnitudeTitle = magnitude => {
  switch (magnitude) {
    case 'temp': return 'Temperatura'
    case 'ph': return 'pH'
    case 'observancy': return 'Observancia'
    case 'substratum': return 'Sustrato'
    case 'biomass': return 'Biomasa'
  }
}

export default class SensorsDashboardPresenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expandedMagnitudeModal: null,
      addExternalReadingModal: null
    }
  }

  onClickMagnitude (magnitude) {
    this.setState({ expandedMagnitudeModal: magnitude })
  }

  clearExpandedMagnitude () {
    this.setState({ expandedMagnitudeModal: null })
  }

  showAddExternalReadingModal () {
    this.setState({ addExternalReadingModal: true, expandedMagnitudeModal: null })
  }

  hideExternalReadingModal () {
    this.setState({ addExternalReadingModal: false })
  }

  render () {
    return (
      <Screen>

        <Toolbar
          title={this.props.routine.title}
          rightActionTitle='Finalizar'
          onClickRightAction={this.props.onRoutineStop}
        />

        { this.state.expandedMagnitudeModal &&
          <ExpandedMagnitudeModal
            title={magnitudeTitle(this.state.expandedMagnitudeModal)}
            magnitude={this.state.expandedMagnitudeModal}
            timeline={this.props.timeline}
            onClose={this.clearExpandedMagnitude.bind(this)}
            onAddReadings={this.showAddExternalReadingModal.bind(this)}
          />
        }

        { this.state.addExternalReadingModal &&
          <AddExternalReadingModal
            onClose={this.hideExternalReadingModal.bind(this)}
          />
        }

        <Container row>
          <MagnitudeCard
            title={magnitudeTitle('temp')}
            valueUnit='ºC'
            targetValue={this.props.routine.targetTemp}
            currentValue={this.props.currentValue.temp}
            onClick={() => this.onClickMagnitude('temp')}
          />

          <MagnitudeCard
            title={magnitudeTitle('ph')}
            valueUnit='pH'
            targetValue={this.props.routine.targetPh}
            currentValue={this.props.currentValue.ph}
            onClick={() => this.onClickMagnitude('ph')}
            />

          <MagnitudeCard
            title={magnitudeTitle('observancy')}
            valueUnit='g/L'
            currentValue={this.props.currentValue.observancy}
            onClick={() => this.onClickMagnitude('observancy')}
            />

          <MagnitudeCard
            title={magnitudeTitle('substratum')}
            valueUnit='g/L'
            currentValue={this.props.currentValue.substratum}
            onClick={() => this.onClickMagnitude('substratum')}
            />

          <MagnitudeCard
            title={magnitudeTitle('biomass')}
            valueUnit='g/L'
            currentValue={this.props.currentValue.biomass}
            onClick={() => this.onClickMagnitude('biomass')}
            />
        </Container>

        { this.props.timeline &&
          <SensorChart
            magnitudes={['temp', 'ph', 'observancy', 'substratum', 'biomass']}
            timeline={this.props.timeline}
            height={140}
          />
        }

      </Screen>
    )
  }
}
