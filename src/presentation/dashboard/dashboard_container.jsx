import React, { Component } from 'react'
import { connect } from 'react-redux'
import RoutineCollection from '../routine/routine_collection_container'
import RunningRoutine from '../running_routine/running_routine'
import {
  Container,
  Segment,
  Divider,
  Message
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {
  selectRunningRoutine,
  selectRoutineFetchingStatus
} from '../../core/redux/routine/selector'

class DashboardContainer extends Component {
  render () {
    console.log(this.props)
    if (!this.props.runningRoutine) {
      return (
        <Container text>
          <div>
            <h1>Seleccionar rutina</h1>
            <Link to={{ pathname: '/routines/create' }}>Crear rutina</Link>
            <Divider clearing />
          </div>
          {
            this.props.error &&
            <Message
              error
              header={this.props.error.message}
            />
          }

          <Segment raised fetching={this.props.fetching}>
            <RoutineCollection />
          </Segment>

        </Container>
      )
    }

    return (
      <RunningRoutine />
    )
  }
}

const mapStateToProps = state => {
  const { fetching, error } = selectRoutineFetchingStatus(state)
  return {
    fetching,
    error,
    runningRoutine: selectRunningRoutine(state)
  }
}

export default connect(mapStateToProps)(DashboardContainer)
