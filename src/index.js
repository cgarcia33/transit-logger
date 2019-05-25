import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Breakdown from "./components/Breakdown/Breakdown";
import LineBreakdown from "./components/LineBreakdown/LineBreakdown";
import "./index.css";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/breakdown" component={Breakdown} />
            <Route path="/linebreakdown" component={LineBreakdown} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById("root"));
