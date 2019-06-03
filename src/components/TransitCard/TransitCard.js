import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./TransitCard.css";

class TransitCard extends Component {
  state = {
    showButtons: false,
    setupTrip: false,
    station: "",
    ongoingTrip: false,
    time: null
  };

  componentDidMount() {
    this.setState({ station: this.props.transitLine.stops[0] });
    fetch(`/api/status/${this.props.transitLine.id}`)
      .then(data => data.json())
      .then(status =>
        this.setState({ ongoingTrip: status.ongoing, time: status.toggleTime })
      );
  }

  handleCardClick = () => {
    this.setState({ showButtons: !this.state.showButtons });
    if (this.state.setupTrip) {
      this.setState({ setupTrip: false });
    }
  };

  renderButtons = () => {
    return this.state.showButtons ? (
      <div className="btn-row">
        {this.state.ongoingTrip ? (
          <button className="end-btn btn" onClick={this.setupTrip}>
            End Trip
          </button>
        ) : (
          <button className="btn" onClick={this.setupTrip}>
            New Trip
          </button>
        )}
        <Link
          to={{
            pathname: `/linebreakdown/${this.props.transitLine.id}`,
            state: { line: this.props.transitLine }
          }}
        >
          <button className="btn">Breakdown</button>
        </Link>
        {this.renderSetup()}
      </div>
    ) : null;
  };

  setupTrip = () => {
    this.setState({ setupTrip: true });
  };

  renderSetup = () => {
    return this.state.setupTrip ? (
      <div>
        <select
          className="stop-list"
          value={this.state.station}
          onChange={e => {
            this.setState({ station: e.target.value });
          }}
        >
          {this.props.transitLine.stops.map((stop, i) => (
            <option value={stop} key={i}>
              {stop}
            </option>
          ))}
        </select>
        {this.state.ongoingTrip ? (
          <button onClick={this.endTrip}>End Trip</button>
        ) : (
          <button onClick={this.startTrip}>Start Trip</button>
        )}
      </div>
    ) : null;
  };

  startTrip = () => {
    axios
      .patch(`/api/status/${this.props.transitLine.id}`, {
        ongoing: "true",
        toggleTime: Date.now()
      })
      .then(
        axios.post("/api/trips", {
          line: this.props.transitLine.id,
          origin: this.state.station
        })
      )
      .then(this.setState({ showButtons: false, setupTrip: false }));
  };

  endTrip = () => {
    axios
      .patch(`/api/status/${this.props.transitLine.id}`, {
        ongoing: "false"
      })
      .then(
        axios.patch("/api/trips", {
          line: this.props.transitLine.id,
          destination: this.state.station,
          startTime: this.state.time
        })
      )
      .then(
        this.setState({
          showButtons: false,
          setupTrip: false,
          ongoingTrip: false
        })
      );
  };

  render() {
    const line = this.props.transitLine;
    return (
      <div>
        <div
          className="line-box"
          style={{ backgroundColor: line.color }}
          onClick={this.handleCardClick}
        >
          <div
            className="line-pic"
            style={{
              backgroundImage: `url(${require(`../../static/images/${
                line.id
              }.jpg`)})`
            }}
          />
          <div className="line-name">{line.name}</div>
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

export default TransitCard;
