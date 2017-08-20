import React from 'react'
import {
  Segment,
  List,
  Message
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Card from '../../card'

const RoutineSelection = ({ routines, onSelectRoutine, error }) => {
  return (
    <Card>
      <h1>Experimentos disponibles</h1>
      { error &&
        <Message
          error
          header={error.message}
        />
      }

      { routines.length === 0 &&
        <Segment textAlign='center' padded='very'>
          <h1>No hay experimentos</h1>
          <p>Debes crear un experimento para usar el fermentador</p>
          <Link to='/routines/create'>Crear experimento</Link>
        </Segment>
      }

      { routines.length > 0 &&
        <div>
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
        </div>
      }
    </Card>

  )
}

export default RoutineSelection
