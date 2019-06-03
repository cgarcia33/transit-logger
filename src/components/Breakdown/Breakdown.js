import React, { Component } from "react";
import "./breakdown.css";

class Breakdown extends Component {
  state = { stats: null };

  componentDidMount() {
    fetch("https://transit-logger-server.herokuapp.com/api/breakdown")
      .then(data => data.json())
      .then(transitStats => this.setState({ stats: transitStats }));
  }

  convertToHoursAndMinutes = time => {
    let hours = Math.floor(time / 60);
    var minutes = time % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  render() {
    return this.state.stats ? (
      <div className="Breakdown">
        <h1>Breakdown</h1>
        <div className="stats">
          <h2>Total Time Spent Commuting</h2>
          <div className="stat">
            {this.convertToHoursAndMinutes(this.state.stats.total)}
          </div>
          <h2>Average Trip Length</h2>
          <div className="stat">{this.state.stats.avgTime} minutes</div>
          <h2>Longest Trip Length</h2>
          <div className="stat">{this.state.stats.maxTime} minutes</div>
          <h2>Shortest Trip Length</h2>
          <div className="stat">{this.state.stats.minTime} minutes</div>
        </div>
      </div>
    ) : (
      <h1>Breakdown loading</h1>
    );
  }
}

export default Breakdown;
