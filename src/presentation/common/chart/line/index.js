import React, { Component } from "react";
import { Line } from "react-chartjs-2";

class LineChart extends Component {
  render() {
    const { datasets, labels, height, showYAxis } = this.props;
    const lineData = {
      labels,
      datasets: datasets.map(({ data, label, stroke }) => ({
        label,
        data,
        backgroundColor: "transparent",
        borderColor: stroke
      }))
    };
    return (
      <Line
        height={height}
        data={lineData}
        options={{
          responsive: true,
          scaleShowLabels: showYAxis,
          legend: {
            display: false
          }
        }}
      />
    );
  }
}

export default LineChart;
