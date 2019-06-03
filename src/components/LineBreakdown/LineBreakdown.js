import React, { Component } from "react";
import "./linebreakdown.css";

class LineBreakdown extends Component {
  state = { line: null, stats: null, trips: null };

  componentDidMount() {
    this.setState({ line: this.props.location.state.line });
    fetch(
      `https://transit-logger-server.herokuapp.com/api/breakdown/${
        this.props.location.state.line.id
      }`
    )
      .then(data => data.json())
      .then(transitStats => this.setState({ stats: transitStats }));
    fetch(
      `https://transit-logger-server.herokuapp.com/api/trips/${
        this.props.location.state.line.id
      }`
    )
      .then(data => data.json())
      .then(lineTrips => this.setState({ trips: lineTrips }));
  }

  convertToHoursAndMinutes = time => {
    let hours = Math.floor(time / 60);
    var minutes = time % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  formatDate = date => {
    return date.split("T")[0];
  };

  render() {
    return this.state.line && this.state.stats && this.state.trips ? (
      <div className="LineBreakdown">
        <h1>{this.state.line.name} Breakdown</h1>
        <div
          className="line-logo"
          style={{
            backgroundImage: `url(${require(`../../static/images/${
              this.state.line.id
            }.jpg`)})`
          }}
        />
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
        <div className="recent-trips">
          <h2>Recent Trips</h2>
          <table className="tg">
            <tbody>
              <tr>
                <th className="tg-0lax">Date</th>
                <th className="tg-0lax">Origin</th>
                <th className="tg-0lax">Destination</th>
                <th className="tg-0lax">Time</th>
              </tr>
              {this.state.trips.map((trip, i) => (
                <tr>
                  <td className="tg-0lax">{this.formatDate(trip.start)}</td>
                  <td className="tg-0lax">{trip.origin}</td>
                  <td className="tg-0lax">{trip.destination}</td>
                  <td className="tg-0lax">{trip.timeElapsed} minutes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <h1>Line Breakdown loading</h1>
    );
  }
}

export default LineBreakdown;
