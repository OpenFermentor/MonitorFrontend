import React from 'react'
import { Line } from 'react-chartjs'

const LineChart = ({ height, labels, datasets, showYAxis = true }) => {
  const lineData = {
    labels,
    datasets: datasets.map(({ data, label, stroke }) => ({
      label,
      data,
      fillColor: 'transparent',
      strokeColor: stroke
    }))
  }
  return (
    <div>
      <Line
        height={height}
        data={lineData}
        options={{
          responsive: true,
          scaleShowLabels: showYAxis
        }}
      />
    </div>
  )
}

export default LineChart
