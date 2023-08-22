import React from 'react';

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
};

const disabledSquareStyle = {
  backgroundColor: '#ccc',
  cursor: 'not-allowed',
};

const Square = ({
  nextPlayer,
  value,
}: {
  nextPlayer: () => void;
  value: string | null;
}) => {
  const handleClick = (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    e.preventDefault();
    if (value) return;
    nextPlayer();
  };
  return (
    <div
      className="square"
      style={value ? { ...squareStyle, ...disabledSquareStyle } : squareStyle}
      onClick={handleClick}>
      {value}
    </div>
  );
};

export default Square;
