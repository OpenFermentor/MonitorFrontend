import React from 'react'
import {
  Segment,
  Message
} from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import './styles.css'

import Table from '../../common/table'
import Screen from '../../common/screen'
import Container from '../../common/container'
import Button from '../../common/button'
import Search from '../../common/search'

const ExperimentsPresenter = ({ routines, onSelectRoutine, onCancel, error }) => {
  return (
    <Screen>

      <Container row>
        <Search placeholder='Buscar experimento' />
        <Button primary>Crear experimento</Button>
      </Container>

      <Container>
        { routines.length > 0 &&
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Microorganismo</Table.HeaderCell>
                <Table.HeaderCell>Fecha de ejecución</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { routines.map(routine => (
                <Table.Row key={routine.id}>
                  <Table.Cell>{routine.title}</Table.Cell>
                  <Table.Cell>{routine.strain}</Table.Cell>
                  <Table.Cell>{(routine.startedAt && (moment(routine.startedAt).format('DD/MM/YYYY HH:mm'))) || '-'}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        }
      </Container>

      <Container>
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
      </Container>

    </Screen>
  )
}

export default ExperimentsPresenter
