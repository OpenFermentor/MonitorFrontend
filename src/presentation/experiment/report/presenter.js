import React from 'react'
import './styles.css'
import { isEmpty } from 'lodash'
import Network from '../../../networking'
import Button from '../../common/button'

import Screen from '../../common/screen'
import Container from '../../common/container'
import Calculation from './calculation'

const BIOMASS_CALCULATIONS = [
  'biomassPerformance',
  'biomassVolumetricPerformance',
  'specificBiomassVelocity'
]

const PRODUCT_CALCULATIONS = [
  'productPerformance',
  'biomassVolumetricPerformance',
  'specificBiomassVelocity'
]


const ExperimentReportPresenter = ({ routine = {}, fetching, error }) => {
  return (
    <Screen loading={fetching}>

      <Container row>
        <h1>{routine.title}</h1>
        <Container row end>
          <a href={Network.calculationsToCsv(routine)}>
            <Button primary>Exportar a csv</Button>
          </a>
          <Button primary onClick={() => window.print()}>Imprimir</Button>
        </Container>
      </Container>

      { !isEmpty(routine.calculations) &&
        <div className='experimentReport'>
          <div className='magnitudeCalculations'>

            <Container>
              <h2>Biomasa</h2>
            </Container>
            { hasCalculations(routine, BIOMASS_CALCULATIONS) ? (
              <div>
                <Calculation
                  routine={routine}
                  calculation='biomassPerformance'
                />
                <Calculation
                  routine={routine}
                  calculation='biomassVolumetricPerformance'
                  max='maxBiomassVolumetricPerformance'
                />
                <Calculation
                  routine={routine}
                  calculation='specificBiomassVelocity'
                  max='maxBiomassVelocity'
                />
              </div>
              ) : (
                <p>No hay cálculos de Biomasa disponibles</p>
              )
            }
          </div>

          <div className='magnitudeCalculations'>
            <Container>
              <h2>Producto</h2>
            </Container>
            { hasCalculations(routine, PRODUCT_CALCULATIONS) ? (
              <div>
                <Calculation
                  routine={routine}
                  calculation='productPerformance'
                />
                <Calculation
                  routine={routine}
                  calculation='productVolumetricPerformance'
                  max='maxProductVolumetricPerformance'
                />
                <Calculation
                  routine={routine}
                  calculation='specificProductVelocity'
                  max='maxProductVelocity'
                />
              </div>
              ) : (
                <p>No hay cálculos de Producto disponibles</p>
              )
            }
          </div>

          <div className='magnitudeCalculations'>
            <Container>
              <h2>pH</h2>
            </Container>
            <Calculation
              routine={routine}
              calculation='specificPhVelocity'
              max='maxPhVelocity'
            />
          </div>

        </div>
      }
    </Screen>
  )
}

const hasCalculations = (routine, calculationsCategory) =>
  !!calculationsCategory.find(calculation => !isEmpty(routine.calculations[calculation]))

export default ExperimentReportPresenter
