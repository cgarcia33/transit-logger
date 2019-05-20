import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = { lines: [] };

  componentDidMount() {
    import("./static/combinedLines.json")
      .then(json => {
        this.setState({ lines: json.lines });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Transit Logger</h1>
        {this.state.lines.map((line, i) => (
          <div
            className="line-box"
            key={i}
            style={{ backgroundColor: line.color }}
          >
            <div
              className="line-pic"
              style={{
                backgroundImage: `url(${require(`./static/images/${
                  line.id
                }.jpg`)})`
              }}
            />
            <div className="line-name">{line.name}</div>
          </div>
        ))}
        <div className="links">
          <Link to="/breakdown">Breakdown</Link>
        </div>
      </div>
    );
  }
}

export default App;
