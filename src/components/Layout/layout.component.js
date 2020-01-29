import React from 'react';
import Header from './Header/header.component';
import Footer from './Footer/footer.component';
import Content from './Content/content.component';

const Layout = (props) => {
  const {
    children,
  } = props;

  return (
    <>
      <Header />
    
      <Content>
        {children}
      </Content>

      <Footer />
    </>
  );
};

export { Layout };
