import React, { Fragment, Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withSnackbar } from "notistack";

import Board from "./Board";
import { BASE_URL } from "./constants";

class Play extends Component {
  state = {
    game: null
  };

  componentDidMount() {
    const { match } = this.props;
    fetch(`${BASE_URL}/sudoku/play/${match.params.id}`)
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
    fetch(`${BASE_URL}/sudoku/play/${match.params.id}`, {
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
            this.props.enqueueSnackbar(result.message);
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
    this.props.enqueueSnackbar(message);
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
            <Board board={game.board} onChange={this.onChange} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default withSnackbar(Play);
