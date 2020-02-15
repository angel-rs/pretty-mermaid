import React from 'react';
import './header.styles.scss';

const Header = (props) => {
  return (
    <header className="pretty-header" {...props}>
      <span className="">
        <span role="img" aria-label="mermaid">
          🧜️
        </span>
        Pretty Mermaid
      </span>
    </header>
  );
}

export default Header;
