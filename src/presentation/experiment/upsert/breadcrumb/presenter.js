import React from 'react'
import { Grid } from 'semantic-ui-react'
import classNames from 'classnames'
import './styles.css'

import Container from '../../../common/container'

const SECTIONS = [
  { section: 'details', title: 'Información básica' },
  { section: 'parameters', title: 'Configuar parámetros' }
]

const UpsertExperimentBreadcrumb = ({ currentSection, setCurrentSection }) => {
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
                  dimmed: index > currentSectionIndex
                })}
                onClick={() => setCurrentSection(section)}
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
