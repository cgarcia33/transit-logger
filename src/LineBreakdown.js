import React, { Component } from "react";
import "./linebreakdown.css";
import image from "./static/images/pur.jpg";

class LineBreakdown extends Component {
  state = { line: {} };

  componentDidMount() {
    import("./static/combinedLines.json")
      .then(json => {
        this.setState({ line: json.lines[0] });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div className="LineBreakdown">
        <h1>{this.state.line.name} Breakdown</h1>
        <img src={image} alt="line logo" />
        <div className="stats">
          <h2>Total Time Spent Commuting</h2>
          <div className="stat">20 hours</div>
          <h2>Average Commute</h2>
          <div className="stat">45 minutes</div>
          <h2>Longest Commute</h2>
          <div className="stat">1 hours 5 minutes</div>
          <h2>Shortest Commute</h2>
          <div className="stat">40 minutes</div>
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
              <tr>
                <td className="tg-0lax">5/17/19</td>
                <td className="tg-0lax">Noyes</td>
                <td className="tg-0lax">Quincy</td>
                <td className="tg-0lax">45 minutes</td>
              </tr>
              <tr>
                <td className="tg-0lax">5/17/19</td>
                <td className="tg-0lax">Quincy</td>
                <td className="tg-0lax">Noyes</td>
                <td className="tg-0lax">48 minutes</td>
              </tr>
              <tr>
                <td className="tg-0lax">5/18/19</td>
                <td className="tg-0lax">Noyes </td>
                <td className="tg-0lax">Quincy</td>
                <td className="tg-0lax">46 minutes</td>
              </tr>
              <tr>
                <td className="tg-0lax">5/16/19</td>
                <td className="tg-0lax">Quincy</td>
                <td className="tg-0lax">Foster</td>
                <td className="tg-0lax">44 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LineBreakdown;
