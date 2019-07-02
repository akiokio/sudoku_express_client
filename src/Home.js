import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = ({ games }) => (
  <Fragment>
    <header className="header">Express Sudoku</header>
    <section>
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

export default Home;
