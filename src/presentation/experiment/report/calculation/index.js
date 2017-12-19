import React from 'react'
import './styles.css'

import Chart from './chart'
import Container from '../../../common/container'

const MAGNITUDE_COLORS = {
  temp: '#DB9439',
  ph: '#8DB5B2',
  product: '#C6625B',
  substratum: '#739E53',
  biomass: '#A37EA0'
}

const CALCULATION_NAMES = {
  specificProductVelocity: 'Velocidad Específica de Producto',
  productVolumetricPerformance: 'Rendimiento volumétrico de Producto',
  productPerformance: 'Rendimiento de Producto',
  maxProductVolumetricPerformance: 'Máximo rendmiento de Producto volumétrico',
  maxProductVelocity: 'Máxima velocidad de producto',

  productBiomassPerformance: 'Rendimiento de Producto Biomasa',

  specificBiomassVelocity: 'Velocidad Específica de Biomasa',
  biomassVolumetricPerformance: 'Rendimiento volumétrico de Biomasa',
  biomassPerformance: 'Rendimiento de Biomasa',
  maxBiomassVolumetricPerformance: 'Máxima rendimiento de Biomasa volumétrica',
  maxBiomassVelocity: 'Máxima velocidad de Biomasa',

  specificPhVelocity: 'Velocidad Específica de pH',
  maxPhVelocity: 'Máxima velocidad de pH'
}

const getMagnitudeName = calculationName =>
  Object.keys(MAGNITUDE_COLORS).find(m => calculationName.toLowerCase().includes(m))

const Calculation = ({ routine, calculation, max }) => {
  return (
    <Container className='calculation'>
      <Container noPadding row>
        <h4>{CALCULATION_NAMES[calculation]}</h4>
        { routine.calculations[max] &&
          <h4 className='maximum'>Máximo {routine.calculations[max].y}</h4>
        }
      </Container>
      <Chart
        calculation={routine.calculations[calculation]}
        color={MAGNITUDE_COLORS[getMagnitudeName(calculation)]}
      />
    </Container>
  )
}

export default Calculation
