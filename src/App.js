import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";

import Home from "./Home";
import Play from "./Play";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <SnackbarProvider maxSnack={6}>
        <Router>
          <Container>
            <CssBaseline />
            <Route path="/" exact component={Home} />
            <Route path="/play/:id" component={Play} />
          </Container>
        </Router>
      </SnackbarProvider>
    );
  }
}

export default App;
