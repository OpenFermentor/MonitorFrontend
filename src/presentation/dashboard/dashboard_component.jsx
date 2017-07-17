import React, { Component } from 'react'
import AttributeStatusCard from './attribute_status_card'
import LineChart from './line_chart'
import {
  Button,
  Modal,
  Loader,
  Message
} from 'semantic-ui-react'

export default class DashboardContainer extends Component {
  render () {
    const containerStyle = {
      padding: 70,
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%'
    }
    return (
      <div style={containerStyle}>

        <div style={{ marginBottom: 20 }}>
          { this.props.routine &&
            <div>
              <h1>Experimento en curso</h1>
              <Modal
                trigger={<Button primary style={{ marginTop: -65 }} floated='right' >Finalizar</Button>}
                header='¿Estás seguro que quieres finalizar el experimento?'
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
                 { key: 'yes', content: 'Yes', color: 'green', triggerClose: false, onClick: this.props.onRoutineStop }
                ]}
             />
            </div>
          }
          { !this.props.routine &&
            <div>
              <h1>Comenzar experimento</h1>
              <Button style={{ marginTop: -65 }} floated='right' primary onClick={this.props.onPressSelectRoutine}>Seleccionar</Button>
            </div>
          }

        </div>
        <AttributeStatusCard attribute='temp' value={this.props.lastValue.temp} />
        <LineChart temperatureTimeline={this.props.temperatureTimeline} />
      </div>
    )
  }
}
