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
    padding: 30,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: 8
  }
  const valueStyle = {
    fontSize: 70,
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 10
  }
  const noValueStyle = {
    fontSize: 40,
    opacity: 0.5,
    textAlign: 'center'
  }
  return (
    <div style={containerStyle}>
      <h2>{attributeData[attribute].name}</h2>

      { value &&
        <h6 style={valueStyle}>{value}{attributeData[attribute].unit}</h6>
      }

      { !value &&
        <h1 style={noValueStyle}>No hay datos</h1>
      }

    </div>
  )
}

export default Card
