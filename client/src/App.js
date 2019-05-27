import React, { Component } from "react";
import { Link } from "react-router-dom";
import TransitCard from "./components/TransitCard/TransitCard";
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
        {this.state.lines.map(line => (
          <TransitCard transitLine={line} key={line.id} />
        ))}
        <div className="links">
          <Link to="/breakdown">Breakdown</Link>
          <Link to="/linebreakdown">Line Breakdown</Link>
        </div>
      </div>
    );
  }
}

export default App;
