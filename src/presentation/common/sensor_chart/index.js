import React, { Component } from "react";
import "./styles.css";
import Container from "../../common/container";
import LineChart from "../../common/chart/line";

const MAGNITUDE_COLORS = {
  temp: "#DB9439",
  ph: "#8DB5B2",
  product: "#C6625B",
  substratum: "#739E53",
  biomass: "#A37EA0"
};

class SensorChart extends Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { timeline, magnitudes, height } = this.props;
    // console.log(timeline);
    return (
      <Container>
        <div className="sensorChart">
          {(!timeline || timeline.labels.length === 0) && <p>No hay datos</p>}
          {timeline &&
            timeline.labels.length > 0 && (
              <LineChart
                height={height}
                labels={timeline.labels}
                datasets={magnitudes.map(magnitude => ({
                  data: timeline[magnitude], //.map(m => m.toFixed(2)),
                  stroke: MAGNITUDE_COLORS[magnitude]
                }))}
              />
            )}
        </div>
      </Container>
    );
  }
}

export default SensorChart;
