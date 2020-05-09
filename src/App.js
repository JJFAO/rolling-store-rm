import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main";
import Results from "./components/Results";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Ricky",
      products: [
        {
          id: "pro01",
          name: "Notebook",
          bran: "Asus",
          price: "1900",
        },
        {
          id: "pro02",
          name: "Play Station",
          bran: "Sony",
          price: "1900",
        },
        {
          id: "pro04",
          name: "SmartPhone",
          bran: "Xiaomi",
          price: "1900",
        },
      ],
    };
  }

  render() {
    const { userName, products } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <div className="App-container">
              <Main userName={userName} products={products} />
            </div>
          </Route>
          <Route path="/results" exact>
            <div className="App-container">
              <Results userName={userName} products={products} />
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}
