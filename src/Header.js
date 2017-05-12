import React from 'react';

let style = {
  fontFamily: 'arial',
  color: '#2A2D30',
  marginLeft: 20,
  fontSize: 50
}

function Header({ text }) {
  return (
    <h1 style={style}>{text}</h1>
  );
}

export default Header;
