import React from 'react'

const attributeData = {
  temp: {
    name: 'Temperatura',
    unit: 'ºC',
    labelColor: '#D38A4A'
  }
}

const Card = ({ attribute, value }) => {
  const containerStyle = {
    padding: 15,
    backgroundColor: 'white',
    border: '1px solid #979797'
  }
  const valueStyle = {
    fontSize: 60,
    textAlign: 'center'
  }
  const noValueStyle = {
    fontSize: 40,
    opacity: 0.5,
    textAlign: 'center'
  }

  const labelStyle = {
    height: 10,
    backgroundColor: attributeData[attribute].labelColor
  }
  return (
    <div style={containerStyle}>
      <h2>{attributeData[attribute].name}</h2>

      { value &&
        <h1 style={valueStyle}>{value}{attributeData[attribute].unit}</h1>
      }

      { !value &&
        <h1 style={noValueStyle}>No hay datos</h1>
      }

      <div style={labelStyle} />

    </div>
  )
}

export default Card
