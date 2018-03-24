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
  clearSelectedRoutine,
  clearSearch,
  searchRequest
} from '../../../redux/routine/actions'

class Experiments extends Component {
  componentWillMount () {
    this.props.requestRoutines()
    this.props.clearSelectedRoutine()
  }

  onSelectRoutine (routine) {
    this.props.setSelectedRoutine(routine)
    this.props.history.push(`/experiments/${routine.id}`)
  }

  onSearch (event, { value }) {
    if (!value) {
      this.props.clearSearch()
    } else {
      this.props.searchRequest(value)
    }
  }

  render () {
    return (
      <ExperimentsPresenter
        fetching={this.props.fetching}
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
    clearSelectedRoutine: () => dispatch(clearSelectedRoutine()),
    clearSearch: () => dispatch(clearSearch()),
    searchRequest: searchTerm => dispatch(searchRequest(searchTerm))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiments)
