import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Loader, Message } from 'semantic-ui-react'
import AttributeStatusCard from './attribute_status_card'
import RunningRoutineChart from './running_routine_chart'

import {
  selectRunningRoutineLastValue,
  selectRoutineFetchingStatus
} from '../../core/redux/routine/selector'

import {
  stopRunningRoutineRequest
} from '../../core/redux/routine/actions'

class RunningRoutine extends Component {
  render () {
    const containerStyle = {
      padding: 70,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '75%'
    }
    return (
      <div style={containerStyle}>

        <div style={{ marginBottom: 20 }}>
          <h1>Experimento en curso</h1>

          <Modal loading
            trigger={<Button primary style={{ marginTop: -50 }} floated='right' >Finalizar</Button>}
            header='¿Estás seguro que quieres finalizar el experimento?'

            onClose={e => console.log(e)}

            content={
              <div>
                <Loader active={this.props.fetching} />
                { this.props.error &&
                  <Message
                    error
                    content={this.props.error.message}
                  />
                }
              </div>
            }
            actions={[
              { key: 'no', content: 'No', color: 'red', triggerClose: true },
              { key: 'yes', content: 'Yes', color: 'green', triggerClose: false, onClick: this.props.requestRoutineStop }
            ]}
          />

        </div>
        <AttributeStatusCard attribute='temp' value={this.props.lastReading.temp} />
        <RunningRoutineChart />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { fetching, error } = selectRoutineFetchingStatus(state)
  return {
    lastReading: selectRunningRoutineLastValue(state),
    fetching,
    error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutineStop: () => dispatch(stopRunningRoutineRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningRoutine)
