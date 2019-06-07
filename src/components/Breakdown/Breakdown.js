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
          <div className="stat-card">
            <p>Total Time Spent Commuting</p>
            <div className="stat">
              {this.convertToHoursAndMinutes(this.state.stats.total)}
            </div>
          </div>
          <div className="stat-card">
            <p>Average Trip</p>
            <div className="stat">{this.state.stats.avgTime.toFixed(1)} minutes</div>
          </div>
          <div className="stat-card">
            <p>Longest Trip</p>
            <div className="stat">{this.state.stats.maxTime} minutes</div>
          </div>
          <div className="stat-card">
            <p>Shortest Trip</p>
            <div className="stat">{this.state.stats.minTime} minutes</div>
          </div>
        </div>
      </div>
    ) : (
      <h1>Breakdown loading</h1>
    );
  }
}

export default Breakdown;
