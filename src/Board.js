import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Board.scss";

class Board extends Component {
  render() {
    const { board, onChange } = this.props;
    return (
      <div className={"board"}>
        {board.map((row, i) => (
          <div
            key={`row_${i}`}
            className={`row ${i % 2 === 0 ? "even" : "odd"} ${
              (i + 1) % 3 === 0 && i + 1 < board.length ? "line-bottom" : ""
            }`}
          >
            {row.map((value, j) => (
              <div
                key={`col_${j} `}
                className={`column ${
                  (j + 1) % 3 === 0 && j + 1 < board.length ? "line-right" : ""
                }`}
              >
                <div className="cell">
                  <input
                    value={value === 0 ? "" : value}
                    onChange={e => {
                      onChange(i, j, e.target.value);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.array.isRequired
};

export default Board;
