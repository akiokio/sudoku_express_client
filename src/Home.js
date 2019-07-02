import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GamesIcon from "@material-ui/icons/Games";

import { BACKEND_URL } from "./constants";

import "./Home.scss";

const ListItemLink = props => <ListItem button component="a" {...props} />;

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
          <List component="nav">
            {games.map((game, i) => (
              <ListItemLink key={game.id} button href={`/play/${game.id}`}>
                <ListItemIcon>
                  <GamesIcon />
                </ListItemIcon>
                <ListItemText primary={game.name} />
              </ListItemLink>
            ))}
          </List>
        </section>
      </Fragment>
    );
  }
}

export default withRouter(Home);
