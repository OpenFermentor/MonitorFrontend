import React from 'react'
import {
  Segment,
  List,
  Button
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const RoutineCollection = ({ routines, onClickStartRoutine, onClickDeleteRoutine }) => {
  if (routines.length === 0) {
    return (
      <Segment textAlign='center' padded='very'>
        <h1>No hay rutinas</h1>
        <p>Debes crear una rutina para usar el fermentador</p>
        <Link to='/routines/create'>Crear rutina</Link>
      </Segment>
    )
  }

  return (
    <List divided verticalAlign='middle'>
      { routines.map(routine => (
        <List.Item key={routine.id}>
          <List.Content floated='right'>
            <Link to={{ pathname: '/routines/edit', state: { routine } }}>Editar</Link>
            <Button onClick={() => onClickDeleteRoutine(routine)}>Eliminar</Button>
            <Button primary onClick={() => onClickStartRoutine(routine)}>Comenzar</Button>
          </List.Content>
          <List.Content>
            {routine.title}
          </List.Content>
        </List.Item>
      ))}
    </List>
  )
}

export default RoutineCollection
