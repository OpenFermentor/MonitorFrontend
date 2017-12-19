import React from 'react'
import moment from 'moment'
import './styles.css'

const typeToReadableName = type => {
  switch (type) {
    case 'reading_error': return 'Error de lectura'
    case 'base_cal': return 'Bombeo de base'
    case 'acid_cal': return 'Bombeo de ácido'
    case 'temp_change': return 'Cambio de temperatura'
    case 'system_error': return 'Error del sistema'

    default: return 'Evento'
  }
}

const LogEntry = ({ logEntry }) => {
  return (
    <div className='logEntry'>
      <div className='heading'>
        <p className='title'>{typeToReadableName(logEntry.type)}</p>
        <p className='date'>{moment(logEntry.insertedAt).format('DD/MM HH:mm:ss')}</p>
      </div>
      <p className='description'>{logEntry.description}</p>
    </div>
  )
}

export default LogEntry
