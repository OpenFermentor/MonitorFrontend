import React from 'react'
import { Grid } from 'semantic-ui-react'
import classNames from 'classnames'
import './styles.css'

import Container from '../../../common/container'

const SECTIONS = [
  { section: 'details', title: 'Información básica' },
  { section: 'parameters', title: 'Configuar parámetros' }
]

const basicInfoFilled = routine => (routine.title && routine.strain && routine.medium)

const handleBreadcrumClick = (routine, section, setCurrentSection) => {
  if (section === 'details' || basicInfoFilled(routine)) setCurrentSection(section)
}

const UpsertExperimentBreadcrumb = ({ routine, currentSection, setCurrentSection }) => {
  const currentSectionIndex = SECTIONS.findIndex(({ section }) => section === currentSection)
  return (
    <div className='upsertExperimentBreadcrumb'>
      <Container row>
        <Grid centered={false}>
          { SECTIONS.map(({ section, title }, index) => (
            <Grid.Column width={4} key={index}>
              <a
                className={classNames({
                  active: index === currentSectionIndex,
                  dimmed: index > currentSectionIndex,
                  disabled: !basicInfoFilled(routine)
                })}
                onClick={() => handleBreadcrumClick(routine, section, setCurrentSection)}
              >
                {title}
              </a>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default UpsertExperimentBreadcrumb
