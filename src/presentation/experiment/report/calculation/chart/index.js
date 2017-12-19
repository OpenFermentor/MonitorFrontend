import React from 'react'

import LineChart from '../../../../common/chart/line'

const ReportChart = ({ calculation, color }) => {
  return (
    <LineChart
      datasets={[{
        data: calculation.map(({ x, y }) => y),
        label: calculation.map(({ x, y }) => x),
        stroke: color
      }]}
      height={60}
      labels={calculation.map(({ x, y }) => x)}
    />
  )
}

export default ReportChart
