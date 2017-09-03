import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import _ from 'lodash'
import TimelineNavigationChart from '../../common/timeline_navigation_chart'

import {
  selectRunningRoutineNavigationTimeline
} from '../../../core/redux/reading/selector'

import {
  setDataRange
} from '../../../core/redux/routine/actions'

class NavigationChart extends Component {
  onRangeChange ({ start, end }) {
    console.log(end)
    if (end === 1) {
      return this.props.setDataRange(this.convertRangeValueToTimelineDate(start))
    }
    this.props.setDataRange(
      this.convertRangeValueToTimelineDate(start),
      this.convertRangeValueToTimelineDate(end)
    )
  }

  convertRangeValueToTimelineDate (rangeValue) {
    const timelineTimeDifference = this.endTimelineValue() - this.startTimelineValue()
    const timelineRangeValue = this.startTimelineValue() + timelineTimeDifference * rangeValue
    return moment(timelineRangeValue).format()
  }

  startTimelineValue () {
    return moment(this.props.timeline.insertedAt[0]).valueOf()
  }

  endTimelineValue () {
    return moment(_.last(this.props.timeline.insertedAt)).valueOf()
  }

  render () {
    if (this.props.timeline.labels.length <= 2) {
      return null
    }
    return (
      <TimelineNavigationChart timeline={this.props.timeline} onRangeChange={this.onRangeChange.bind(this)} />
    )
  }
}

const mapStateToProps = state => ({
  timeline: selectRunningRoutineNavigationTimeline(state)
})

const mapDispatchToProps = dispatch => ({
  setDataRange: (start, end) => dispatch(setDataRange(start, end))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationChart)
