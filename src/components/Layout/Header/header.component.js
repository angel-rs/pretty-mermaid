import React from 'react';
import './header.styles.scss';

const Header = (props) => {
  return (
    <header className="pretty-header" {...props}>
      <p>
        Hi 🧜‍♀️
      </p>
    </header>
  );
}

export default Header;
