import React, { Fragment, Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { BACKEND_URL } from "./constants";

import "./Home.scss";

class Home extends Component {
  state = {
    games: []
  };

  componentDidMount() {
    this.getAvailableGames();
  }

  getAvailableGames = () => {
    fetch(`${BACKEND_URL}/sudoku`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            games: result.games
          });
        },
        error => {
          console.log(error);
        }
      );
  };

  handleStartNewGame = () => {
    fetch(`${BACKEND_URL}/sudoku/start`)
      .then(res => res.json())
      .then(
        result => {
          this.props.history.push(`/play/${result.game.id}`);
        },
        error => {
          console.log(error);
        }
      );
  };

  render() {
    const { games } = this.state;
    return (
      <Fragment>
        <Typography variant="h1" component="h2" gutterBottom>
          Express Sudoku
        </Typography>
        <section>
          <div className="start-new-game__wrapper">
            <Button variant="outlined" onClick={this.handleStartNewGame}>
              Start new game
            </Button>
          </div>

          <Typography variant="body1" gutterBottom>
            Available games: {games.length}
          </Typography>
          <ul>
            {games.map((game, i) => (
              <li key={game.id}>
                <Link to={`/play/${game.id}`}>{game.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(Home);
