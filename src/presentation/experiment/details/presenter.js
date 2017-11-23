import React from 'react'
import './styles.css'
import { Grid } from 'semantic-ui-react'
import moment from 'moment'

import Screen from '../../common/screen'
import Container from '../../common/container'
import SensorChart from '../../common/sensor_chart'
import Button from '../../common/button'
import ButtonLink from '../../common/button/link'

import Network from '../../../networking'

import TagsList from './tags'

const ExperimentPresenter = ({ routine, timeline, fetching, error, onAnalyzeData, onUpdate, onStart }) => {
  const loopDelayInMinutes = routine && moment.duration(routine.loopDelay).minutes()
  return (
    <Screen loading={fetching}>
      { routine &&
        <div className='routineDetails'>
          <Container row>
            <h2 className='title'>{routine.title}</h2>
            <Container row>
              { !routine.running &&
                <ButtonLink primary queryParams={{ showModal: 'true' }}>Editar</ButtonLink>
              }
              { !routine.started &&
                <Button primary onClick={onStart}>Comenzar</Button>
              }
            </Container>
          </Container>

          <TagsList tags={routine.tags} />

          <Container>
            <h3>Información básica</h3>
            <Grid>
              <Grid.Column width={4}>
                <h5>Microorganismo</h5>
                <p>{routine.strain}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <h5>Medio</h5>
                <p>{routine.medium}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <h5>Tiempo estimado</h5>
                <p>
                  {moment.duration(routine.estimatedTimeSeconds).hours() + ':' + moment.duration(routine.estimatedTimeSeconds).minutes()}
                </p>
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
              <h3>Ejecución</h3>
              { routine.startedDate &&
                <Container row>
                  <ButtonLink primary pathname={`/experiments/${routine.id}/analysis`}>Analizar datos</ButtonLink>
                  <a href={Network.routineToCsvUrl(routine)}>
                    <Button primary>Exportar a csv</Button>
                  </a>
                </Container>
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

              <Grid.Column width={4}>
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
                <p>{routine.targetTemp} ºC Temperatura inicial</p>
                {routine.tempRanges.map(({temp, fromSecond}, index) => (
                  <p key={index}>
                    {temp} ºC, luego de {moment.duration(fromSecond, 'seconds').hours() + ':' + moment.duration(fromSecond, 'seconds').minutes()}
                  </p>
                ))}
                <h6>Tolerancia</h6>
                <p>{routine.tempTolerance} ºC</p>
              </Grid.Column>

              <Grid.Column width={4}>
                <h5>pH Objetivo</h5>
                <p>Balanceo automático {routine.balancePh ? 'activado' : 'desactivado'}</p>
                <p>ph Objetivo: {routine.targetPh}</p>
                <h6>Tolerancia</h6>
                <p>{routine.phTolerance} pH</p>
                <h6>Bombas peristálticas</h6>
                <p>Encender luego de: {moment.duration(routine.triggerAfter, 'seconds').hours() + ':' + moment.duration(routine.triggerAfter, 'seconds').minutes()}</p>
                <p>Tiempo de encendido: {moment.duration(routine.triggerFor, 'seconds').hours() + ':' + moment.duration(routine.triggerFor, 'seconds').minutes()}</p>
              </Grid.Column>

            </Grid>

            { routine.readings.length > 0 &&
              <SensorChart
                magnitudes={['temp', 'ph']}
                timeline={timeline}
              />
            }

          </Container>

        </div>
      }

    </Screen>
  )
}

export default ExperimentPresenter
