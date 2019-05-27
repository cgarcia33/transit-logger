import React, { Component } from "react";
import "./breakdown.css";

class Breakdown extends Component {
  state = {};

  render() {
    return (
      <div className="Breakdown">
        <h1>Breakdown</h1>
        <div className="stats">
          <h2>Total Time Spent Commuting</h2>
          <div className="stat">50 hours</div>
          <h2>Average Commute</h2>
          <div className="stat">1 hour 50 minutes</div>
          <h2>Longest Commute</h2>
          <div className="stat">2 hours 45 minutes</div>
          <h2>Shortest Commute</h2>
          <div className="stat">1 hour 10 minutes</div>
          <h2>Most Used Transit Line</h2>
          <div className="stat"> Purple Line</div>
          <h2>Least Used Transit Line</h2>
          <div className="stat">Pace 290 Touhy</div>
        </div>
      </div>
    );
  }
}

export default Breakdown;
