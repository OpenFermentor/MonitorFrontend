import React from 'react'
import moment from 'moment'
import './styles.css'

import Table from '../../common/table'
import Screen from '../../common/screen'
import Container from '../../common/container'
import Search from '../../common/search'
import Message from '../../common/message'
import ButtonLink from '../../common/button/link'

const ExperimentsPresenter = ({ routines, searchInProgress, error, onSelectRoutine, onSearch, onCancel }) => {
  const emptyRoutines = routines.length === 0 && !searchInProgress
  return (
    <Screen>

      <Container row>
        { !emptyRoutines &&
          <Search placeholder='Buscar experimento' onSearchChange={onSearch} open={false} />
        }
        <ButtonLink primary queryParams={{ showModal: 'true' }}>Crear experimento</ButtonLink>
      </Container>

      <Container>
        { routines.length > 0 &&
          <Table selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Microorganismo</Table.HeaderCell>
                <Table.HeaderCell>Fecha de ejecución</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              { routines.map(routine => (
                <Table.Row key={routine.id} onClick={() => onSelectRoutine(routine)}>
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
            title={error.message}
          />
        }

        { emptyRoutines &&
          <Message
            title='No hay experimentos'
          />
        }

        { routines.length === 0 && searchInProgress &&
          <Message
            title='Sin resultados'
            dimmed
          />
        }

      </Container>

    </Screen>
  )
}

export default ExperimentsPresenter
