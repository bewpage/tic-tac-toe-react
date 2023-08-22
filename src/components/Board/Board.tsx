import React, { useEffect, CSSProperties } from 'react';
import Square from '../Square/Square';
import { GameActionEnum, SquareValue, useGameContext } from '../../store/store';

const rowStyle = {
  display: 'flex',
};

const containerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const boardStyle: CSSProperties = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px #eee solid',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
};

// create function to check if there is a winner
const calculateWinner = (squares: SquareValue[][]) => {
  // check if there is a winner in rows
  for (let i = 0; i < squares.length; i++) {
    if (squares[i][0] === squares[i][1] && squares[i][0] === squares[i][2]) {
      return squares[i][0];
    }
  }

  // check if there is a winner in columns
  for (let i = 0; i < squares.length; i++) {
    if (squares[0][i] === squares[1][i] && squares[0][i] === squares[2][i]) {
      return squares[0][i];
    }
  }
  // check if there is a winner in diagonals
  if (squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
    return squares[0][0];
  }
  if (squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0]) {
    return squares[0][2];
  }

  // check if all squares are filled and no winner
  let isFilled = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].includes(null)) {
      isFilled = false;
    }
  }
  if (isFilled) {
    return 'Draw';
  }

  // if there is no winner
  return null;
};

const Board = () => {
  const { state, dispatch } = useGameContext();
  const { squares, xIsNext, winner, isPlaying } = state;

  useEffect(() => {
    if (winner) {
      dispatch({ type: GameActionEnum.SET_IS_PLAYING, payload: false });
    }
  }, [winner]);
  const nextPlayer = (id: string): void => {
    if (!isPlaying) return;
    dispatch({ type: GameActionEnum.SET_X_IS_NEXT, payload: !xIsNext });
    // clone 2D array
    let updatedSquares = [];
    for (let i = 0; i < squares.length; i++) {
      updatedSquares.push(squares[i].slice());
    }
    // do update for user selection with cloned array
    for (let i = 0; i < updatedSquares.length; i++) {
      for (let j = 0; j < updatedSquares[i].length; j++) {
        // not allowed to click on a square that has already been clicked
        if (updatedSquares[i][j] !== null && `${i}${j}` === id) {
          break;
        } else if (updatedSquares[i][j] === null && `${i}${j}` === id) {
          updatedSquares[i][j] = xIsNext ? 'X' : 'O';
        }
      }
    }

    dispatch({ type: GameActionEnum.SET_SQUARES, payload: updatedSquares });
    // check if there is a winner
    let checkWinner = calculateWinner(updatedSquares);
    if (checkWinner) {
      dispatch({ type: GameActionEnum.SET_WINNER, payload: checkWinner });
      dispatch({ type: GameActionEnum.SET_IS_PLAYING, payload: false });
    }
  };

  const handleReset = () => {
    dispatch({ type: GameActionEnum.RESET });
  };

  return (
    <div className="gameBoard" style={containerStyle}>
      {isPlaying && (
        <div id="statusArea" className="status" style={instructionsStyle}>
          Next player: <span>{xIsNext ? 'X' : 'O'}</span>
        </div>
      )}
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        Winner: <span>{winner}</span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        {squares.map((row, i) => {
          return (
            <div key={i} className="board-row" style={rowStyle}>
              {row.map((square, j) => {
                return (
                  <Square
                    key={`${i}${j}`}
                    nextPlayer={() => nextPlayer(`${i}${j}`)}
                    value={square}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
