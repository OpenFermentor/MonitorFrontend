import React from 'react'
import './styles.css'
import { Grid } from 'semantic-ui-react'
import moment from 'moment'

import Screen from '../../common/screen'
import Container from '../../common/container'
import SensorChart from '../../common/sensor_chart'
import Button from '../../common/button'
import ButtonLink from '../../common/button/link'
import Message from '../../common/message'

const ExperimentPresenter = ({ routine, timeline, fetching, error, onAnalyzeData, onUpdate, onStart }) => {
  const loopDelayInMinutes = routine && moment.duration(routine.loopDelay).minutes()
  return (
    <Screen loading={fetching}>
      { routine &&
        <div>
          <Container row>
            <h1>{routine.title}</h1>
            <Container row>
              <ButtonLink primary to={`/experiments/${routine.id}`} queryParams={{ showModal: 'true' }}>Editar</ButtonLink>

              <Button primary onClick={onStart}>Comenzar</Button>
            </Container>
          </Container>

          <Container>
            <h2>Descripción</h2>
            <Grid>
              <Grid.Column width={4}>
                <h5>Microorganismo</h5>
                <p>{routine.strain}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <h5>Medio</h5>
                <p>{routine.medium}</p>
              </Grid.Column>
              { routine.extraNotes &&
                <Grid.Column width={8}>
                  <h5>Notas</h5>
                  <p>{routine.extraNotes}</p>
                </Grid.Column>
              }
            </Grid>
          </Container>

          <Container>

            <Container row>
              <h1>Ejecución</h1>
              { routine.startedDate &&
                <Button primary onClick={onAnalyzeData}>Analizar datos</Button>
              }
            </Container>

            <Grid>

              <Grid.Column width={4}>
                <h5>Fecha de ejecución</h5>
                <p>
                  { routine.startedDate &&
                    moment(routine.startedDate).format('DD/MM/YYYY HH:mm')
                  }
                  { !routine.startedDate &&
                    'Pendiente'
                  }
                </p>
              </Grid.Column>

              <Grid.Column width={12}>
                <h5>Intervalo de recolección de medidas</h5>
                <p>
                  { loopDelayInMinutes === 0 &&
                    `${moment.duration(routine.loopDelay).seconds()} segundos`
                  }
                  { loopDelayInMinutes > 0 &&
                    `${loopDelayInMinutes} minutos`
                  }
                </p>
              </Grid.Column>

              <Grid.Column width={4}>
                <h5>Temperatura objetivo</h5>
                <p>{routine.targetTemp} ºC</p>
                <h6>Tolerancia</h6>
                <p>{routine.tempTolerance} ºC</p>
              </Grid.Column>

              <Grid.Column width={4}>
                <h5>pH objetivo</h5>
                <p>{routine.targetPh} pH</p>
                <h6>Tolerancia</h6>
                <p>{routine.phTolerance} pH</p>
              </Grid.Column>

              <Grid.Column width={4}>
                <h5>Transmitancia objetivo</h5>
                <p>{routine.targetDensity}</p>
              </Grid.Column>

            </Grid>

            { routine.readings.length > 0 &&
              <SensorChart
                magnitudes={['temp', 'pH', 'density', 'co2']}
                timeline={timeline}
              />
            }

          </Container>

        </div>
      }

      <Container>
        { error &&
          <Message
            title={error.message}
          />
        }
      </Container>

    </Screen>
  )
}

export default ExperimentPresenter
