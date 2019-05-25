import React, { Component } from "react";
import "./TransitCard.css";

class TransitCard extends Component {
  state = {};

  render() {
    const line = this.props.transitLine;
    return (
      <div className="line-box" style={{ backgroundColor: line.color }}>
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
    );
  }
}

export default TransitCard;
