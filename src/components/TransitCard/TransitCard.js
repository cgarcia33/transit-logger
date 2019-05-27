import React, { Component } from "react";
import "./TransitCard.css";

class TransitCard extends Component {
  state = {
    showButtons: false,
    setupTrip: false,
    origin: "",
    ongoingTrip: false
  };

  componentDidMount() {
    fetch(`http://localhost:5000/api/status/${this.props.transitLine.id}`)
      .then(data => data.json())
      .then(status => this.setState({ ongoingTrip: status.ongoing }));
  }

  handleClick = () => {
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
        <button className="btn">Breakdown</button>
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
          value={this.state.origin}
          onChange={e => {
            this.setState({ origin: e.target.value });
          }}
        >
          {this.props.transitLine.stops.map((stop, i) => (
            <option value={stop} key={i}>
              {stop}
            </option>
          ))}
        </select>
        <button onClick={this.startTrip}>Start Trip</button>
      </div>
    ) : null;
  };

  startTrip = () => {
    this.setState({ showButtons: false, setupTrip: false });
  };

  render() {
    const line = this.props.transitLine;
    return (
      <div>
        <div
          className="line-box"
          style={{ backgroundColor: line.color }}
          onClick={this.handleClick}
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
