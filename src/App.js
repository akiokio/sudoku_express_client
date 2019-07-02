import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

import Home from "./Home";
import Play from "./Play";
import { BASE_URL } from "./constants";

import "./App.scss";

class App extends Component {
  state = {
    games: [],
    board: null
  };

  componentDidMount() {
    fetch(`${BASE_URL}/sudoku`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            games: result.games
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          throw error;
        }
      );
  }

  render() {
    const { games } = this.state;
    return (
      <SnackbarProvider maxSnack={6}>
        <Router>
          <Container>
            <CssBaseline />
            <Route path="/" exact component={() => <Home games={games} />} />
            <Route path="/play/:id" component={Play} />
          </Container>
        </Router>
      </SnackbarProvider>
    );
  }
}

export default App;
