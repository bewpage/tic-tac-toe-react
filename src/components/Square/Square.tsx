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
const Square = ({ id }: { id?: number | undefined }) => {
  const handleClick = (id: number | undefined) => {
    console.log('click', id);
  };
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={() => handleClick(id)}></div>
  );
};

export default Square;
