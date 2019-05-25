import React, { Component } from "react";
import "./TransitCard.css";

class TransitCard extends Component {
  state = { showButtons: false };

  handleClick = () => {
    this.setState({ showButtons: !this.state.showButtons });
  };

  renderButtons = () => {
    return this.state.showButtons ? (
      <div className="btn-row">
        <button className="btn">Start Trip</button>
        <button className="btn">Breakdown</button>
      </div>
    ) : null;
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
