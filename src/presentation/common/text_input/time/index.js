import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import moment from 'moment'
import './styles.css'
import TextInput from '../../../common/text_input'

export default class TextInputTime extends Component {
  onChange (hours, minutes) {
    const hoursDuration = moment.duration(parseInt(hours), 'hours').asSeconds() || 0
    const minutesDuration = moment.duration(parseInt(minutes), 'minutes').asSeconds() || 0
    this.props.onChange(hoursDuration + minutesDuration)
  }
  render () {
    const secondsDuration = moment.duration(this.props.seconds, 'seconds')
    const hours = secondsDuration.hours()
    const minutes = secondsDuration.minutes()
    return (
      <Grid>
        <TextInput
          label={this.props.label}
          placeholder='Horas'
          type='number'
          value={!hours ? '' : hours}
          width={this.props.width || 4}
          min={0}
          onChange={changedHours => this.onChange(changedHours, minutes)}
        />
        <TextInput
          className='inlineSecondField'
          placeholder='Minutos'
          type='number'
          value={!minutes ? '' : minutes}
          width={this.props.width || 4}
          max={60}
          min={0}
          onChange={changedMinutes => this.onChange(hours, changedMinutes)}
        />
      </Grid>
    )
  }
}
