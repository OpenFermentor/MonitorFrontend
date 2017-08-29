import React from 'react'
import {
  Segment,
  List,
  Message
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './styles.css'
import Toolbar from '../common/toolbar'

const RoutinesPresenter = ({ routines, onSelectRoutine, onCancel, error }) => {
  return (
    <div className='routines'>

      <Toolbar
        title='Experimentos'
        rightTitle='Volver'
        onClickRight={onCancel}
      />

      <div className='content'>
        { error &&
          <Message
            error
            header={error.message}
          />
        }

        { routines.length === 0 &&
          <Segment textAlign='center' padded='very'>
            <h1>No hay experimentos</h1>
            <Link to='/routines/create'>Crear experimento</Link>
          </Segment>
        }

        { routines.length > 0 &&
          <Segment>
            <Link to='/routines/create'>Crear experimento</Link>
            <List divided verticalAlign='middle'>
              { routines.map(routine => (
                <List.Item key={routine.id} as='a' onClick={() => onSelectRoutine(routine)}>
                  <List.Content style={{ marginBottom: 10, marginTop: 10 }}>
                    {routine.title}
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Segment>
        }
      </div>

    </div>
  )
}

export default RoutinesPresenter
