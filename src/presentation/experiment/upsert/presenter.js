import React, { Component } from 'react'
import { Message, Grid, Form, Divider } from 'semantic-ui-react'
import moment from 'moment'
import './styles.css'

import TextInput from '../../common/text_input'
import TextArea from '../../common/text_area'
import Button from '../../common/button'
import Container from '../../common/container'
import Modal from '../../common/modal'

export default class UpsertRoutine extends Component {
  constructor (props) {
    super(props)
    const { estimatedTimeSeconds, ...routine } = this.props.routine || {}
    const hours = estimatedTimeSeconds && moment.duration(estimatedTimeSeconds).hours()
    const minutes = estimatedTimeSeconds && moment.duration(estimatedTimeSeconds).minutes()
    this.state = {
      ...routine,
      hours,
      minutes
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.routine !== newProps.routine) {
      const { estimatedTimeSeconds, ...routine } = this.props.routine || {}
      const hours = estimatedTimeSeconds && moment.duration(estimatedTimeSeconds).hours()
      const minutes = estimatedTimeSeconds && moment.duration(estimatedTimeSeconds).minutes()
      this.setState({ ...routine, hours, minutes })
    }
  }

  onSubmit () {
    const hoursDuration = moment.duration(this.state.hours, 'hours').seconds() || 0
    const minutesDuration = moment.duration(this.state.minutes, 'minutes').seconds() || 0
    this.props.onSubmit({ ...this.state, estimatedTimeSeconds: hoursDuration + minutesDuration })
  }

  render () {
    return (
      <Modal
        open
        onClose={this.props.onCancel}
        size='large'
        title={this.props.routine ? 'Editar rutina' : 'Crear Rutina'}
      >
        <Modal.Content scrolling>
          <Modal.Description>
            { this.props.error && this.props.error.type === 'String' &&
              <Message
                error
                content={this.props.error.message}
              />
            }

            <Form loading={this.props.fetching}>

              <TextInput
                name='title'
                error={this.props.error}
                label='Título'
                required
                value={this.state.title}
                onChange={title => this.setState({ title })}
              />

              <Grid>
                <TextInput
                  name='strain'
                  error={this.props.error}
                  label='Microorganismo'
                  required
                  value={this.state.strain}
                  width={8}
                  onChange={strain => this.setState({ strain })}
                />

                <TextInput
                  name='medium'
                  error={this.props.error}
                  label='Medio'
                  required
                  value={this.state.medium}
                  width={8}
                  onChange={medium => this.setState({ medium })}
                />
              </Grid>

              <TextArea
                name='extraNotes'
                error={this.props.error}
                label='Notas adicionales'
                value={this.state.extraNotes || ''}
                onChange={extraNotes => this.setState({ extraNotes })}
              />

              <Divider section />
              <Grid>
                <TextInput
                  name='estimatedTimeSeconds'
                  error={this.props.error}
                  label='Tiempo estimado'
                  placeholder='Horas'
                  type='number'
                  width={8}
                  min={0}
                  value={this.state.hours}
                  onChange={hours => this.setState({ hours })}
                />
                <TextInput
                  type='number'
                  placeholder='Minutos'
                  className='inlineSecondField'
                  width={8}
                  max={60}
                  min={0}
                  step={15}
                  value={this.state.minutes}
                  onChange={minutes => this.setState({ minutes })}
                />
              </Grid>

              <TextInput
                name='loopDelay'
                error={this.props.error}
                type='number'
                label='Intervalo de recolección de medidas'
                placeholder='Minutos'
                min={0}
                step={15}
                value={this.state.loopDelay}
                onChange={loopDelay => this.setState({ loopDelay })}
              />

              <Grid>
                <TextInput
                  name='targetTemp'
                  error={this.props.error}
                  label='Temperatura'
                  required
                  placeholder='Objetivo'
                  type='number'
                  value={this.state.targetTemp}
                  width={8}
                  onChange={targetTemp => this.setState({ targetTemp })}
                />
                <TextInput
                  name='tempTolerance'
                  error={this.props.error}
                  type='number'
                  placeholder='Tolerancia'
                  className='inlineSecondField'
                  value={this.state.tempTolerance}
                  width={8}
                  onChange={tempTolerance => this.setState({ tempTolerance })}
                />
              </Grid>

              <Grid>
                <TextInput
                  name='targetPh'
                  error={this.props.error}
                  label='pH'
                  placeholder='Objetivo'
                  type='number'
                  required
                  value={this.state.targetPh}
                  width={8}
                  max={14}
                  min={0}
                  onChange={targetPh => this.setState({ targetPh })}
                />
                <TextInput
                  name='phTolerance'
                  error={this.props.error}
                  placeholder='Tolerancia'
                  className='inlineSecondField'
                  type='number'
                  value={this.state.phTolerance}
                  width={8}
                  onChange={phTolerance => this.setState({ phTolerance })}
                />
              </Grid>

              <Grid>
                <TextInput
                  name='targetDensity'
                  error={this.props.error}
                  label='Transmitancia'
                  placeholder='Objetivo'
                  type='number'
                  required
                  value={this.state.targetDensity}
                  width={8}
                  onChange={targetDensity => this.setState({ targetDensity })}
                />
                <TextInput
                  name='densityTolerance'
                  error={this.props.error}
                  className='inlineSecondField'
                  placeholder='Tolerancia'
                  type='number'
                  value={this.state.densityTolerance}
                  width={8}
                  onChange={densityTolerance => this.setState({ densityTolerance })}
                />
              </Grid>

            </Form>
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Container row end={!this.props.routine} noPadding>
            { this.props.routine &&
              <Button negative onClick={this.props.onDestroy}>Eliminar</Button>
            }
            <Button onClick={this.onSubmit.bind(this)} primary type='submit'>Guardar</Button>
          </Container>
        </Modal.Actions>
      </Modal>
    )
  }
}
