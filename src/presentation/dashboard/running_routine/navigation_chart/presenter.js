import React from 'react'
import './styles.css'

import TimelineNavigationChart from '../../../common/timeline_navigation_chart'

const NavigationChartPresenter = ({ timeline, onRangeChange }) => (
  <div className='navigationChart'>
    <div className='content'>
      <TimelineNavigationChart timeline={timeline} onRangeChange={onRangeChange} />
    </div>
  </div>
)

export default NavigationChartPresenter
