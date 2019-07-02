import React, { Fragment, Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Board from "./Board";
import { BACKEND_URL } from "./constants";

import "./Play.scss";

class Play extends Component {
  state = {
    game: null
  };

  componentDidMount() {
    const { match } = this.props;
    fetch(`${BACKEND_URL}/sudoku/play/${match.params.id}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            game: result.game
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

  onChange = (row, col, val) => {
    this.updateBoard(row, col, val);
  };

  updateBoard = (row, col, val) => {
    const { match } = this.props;
    fetch(`${BACKEND_URL}/sudoku/play/${match.params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        row: row,
        col: col,
        val: val
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.props.closeSnackbar();

          if (result.success === true) {
            this.setState({
              game: result.game
            });
            this.props.enqueueSnackbar(result.message, { variant: "success" });
          } else {
            this.handleFailure(result.error);
          }
        },
        error => {
          throw error;
        }
      );
  };

  handleFailure = message => {
    this.props.enqueueSnackbar(message, { variant: "error" });
  };

  handleDeleteGame = () => {
    const { match } = this.props;

    fetch(`${BACKEND_URL}/sudoku/delete/${match.params.id}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(
        result => {
          this.props.closeSnackbar();

          if (result.success === true) {
            this.props.enqueueSnackbar(result.message, { variant: "success" });

            this.props.history.push("/");
          } else {
            this.handleFailure(result.error);
          }
        },
        error => {
          throw error;
        }
      );
  };

  backHome = () => {
    this.props.history.push("/");
  };

  handleSolveBoard = () => {
    const { match } = this.props;

    fetch(`${BACKEND_URL}/sudoku/solve/${match.params.id}`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(
        result => {
          this.props.closeSnackbar();

          if (result.success === true) {
            this.setState({
              game: result.game
            });
            this.props.enqueueSnackbar(result.message, { variant: "success" });
          } else {
            this.handleFailure(result.error);
          }
        },
        error => {
          throw error;
        }
      );
  };

  render() {
    const { game } = this.state;
    return (
      <Fragment>
        {!game && <section>Loading game...</section>}
        {game && (
          <Fragment>
            <Typography variant="h1" component="h2" gutterBottom>
              {game.name}
            </Typography>
            <div className="actions__row">
              <Button variant="outlined" onClick={this.backHome}>
                Back to home
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleDeleteGame}
              >
                Delete Game
              </Button>
              <Button variant="outlined" onClick={this.handleSolveBoard}>
                Solve board
              </Button>
            </div>
            <Board board={game.board} onChange={this.onChange} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withRouter(withSnackbar(Play));
