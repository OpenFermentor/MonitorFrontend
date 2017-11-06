import React, { Component } from 'react'
import { connect } from 'react-redux'

import ExperimentsPresenter from './presenter'

import {
  selectRoutines,
  selectSearchInProgress,
  selectRoutineFetchingStatus,
  selectRoutinePagination
} from '../../../redux/routine/selector'
import {
  fetchRoutinesRequest,
  setSelectedRoutine,
  clearSearchTerm,
  setSearchTerm
} from '../../../redux/routine/actions'

class Experiments extends Component {
  componentWillMount () {
    this.props.requestRoutines()
  }

  onSelectRoutine (routine) {
    this.props.setSelectedRoutine(routine)
    this.props.history.push(`/experiments/${routine.id}`)
  }

  onSearch (event, { value }) {
    if (!value) {
      this.props.clearSearchTerm()
    } else {
      this.props.setSearchTerm(value)
    }
  }

  render () {
    return (
      <ExperimentsPresenter
        routines={this.props.routines}
        searchInProgress={this.props.searchInProgress}
        pagination={this.props.pagination}

        onSelectRoutine={this.onSelectRoutine.bind(this)}
        onNavigateToPage={this.props.requestRoutines}
        onSearch={this.onSearch.bind(this)}
        onCancel={this.props.history.goBack}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    ...selectRoutineFetchingStatus(state),
    searchInProgress: selectSearchInProgress(state),
    pagination: selectRoutinePagination(state),
    routines: selectRoutines(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRoutines: page => dispatch(fetchRoutinesRequest(page)),
    setSelectedRoutine: routine => dispatch(setSelectedRoutine(routine)),
    clearSearchTerm: () => dispatch(clearSearchTerm()),
    setSearchTerm: searchTerm => dispatch(setSearchTerm(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiments)
