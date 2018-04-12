import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ height, labels, datasets, showYAxis = true }) => {
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
    <div>
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
    </div>
  );
};

export default LineChart;
