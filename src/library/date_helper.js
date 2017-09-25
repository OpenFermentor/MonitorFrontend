import moment from 'moment'

export const roundDatesOnRangeDifference = (start, end) => {
  const minutesDifference = end.diff(start, 'minutes')
  if (minutesDifference > 720) {
    return (date) => roundDateTo(date, 1, 'hours')
  }
  if (minutesDifference >= 240) {
    return (date) => roundDateTo(date, 30, 'minutes')
  }
  if (minutesDifference >= 120) {
    return (date) => roundDateTo(date, 20, 'minutes')
  }
  if (minutesDifference >= 60) {
    return (date) => roundDateTo(date, 10, 'minutes')
  }
  if (minutesDifference >= 30) {
    return (date) => roundDateTo(date, 5, 'minutes')
  }
  if (minutesDifference >= 20) {
    return (date) => roundDateTo(date, 2, 'minutes')
  }
  if (minutesDifference >= 3) {
    return (date) => roundDateTo(date, 1, 'minutes')
  }
  if (minutesDifference >= 2) {
    return (date) => roundDateTo(date, 30, 'seconds')
  }
  if (minutesDifference >= 1) {
    return (date) => roundDateTo(date, 15, 'seconds')
  }
  return (date) => moment(date).format('HH:mm:ss')
}

export const roundDateTo = (dateString, amount, parameter) => {
  const date = moment(dateString)
  switch (parameter) {
    case 'seconds':
      date.seconds(Math.round(date.seconds() / amount) * amount)
      return date.format('HH:mm:ss')
    case 'minutes':
      date.minutes(Math.round(date.minutes() / amount) * amount)
      return date.format('HH:mm')
    case 'hours':
      date.hours(Math.round(date.hours() / amount) * amount)
      return date.format('HH:mm')
    default:
      throw new Error(`Invalid normalization date format: ${parameter}`)
  }
}
