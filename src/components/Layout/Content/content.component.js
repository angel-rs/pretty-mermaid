import React from 'react';
import './content.styles.scss';

const Content = (props) => {
  const {
    children,
  } = props;

  return (
    <div className="pretty-content" {...props}>
      {children}
    </div>
  )
};

export default Content;
