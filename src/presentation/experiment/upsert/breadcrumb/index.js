import React from 'react'
import { connect } from 'react-redux'

import {
  upsertSetCurrentSection
} from '../../../../redux/routine/actions'

import {
  selectUpsertActionStatus
} from '../../../../redux/routine/selector'

import UpsertExperimentBreadcrumbPresenter from './presenter'

const UpsertExperimentBreadcrumb = ({ routine, currentSection, setCurrentSection }) => {
  return (
    <UpsertExperimentBreadcrumbPresenter
      routine={routine}
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
      />
  )
}

const mapStateToProps = state => ({
  ...selectUpsertActionStatus(state)
})

const mapDispatchToProps = dispatch => ({
  setCurrentSection: section => dispatch(upsertSetCurrentSection(section))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpsertExperimentBreadcrumb)
