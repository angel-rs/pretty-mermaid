import React from 'react';
import ReactCursorPosition from 'react-cursor-position';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import { Layout, Canvas } from '../components';
import theme from '../theme'
import './App.scss';

function App() {
  return (
		<ThemeProvider theme={theme}>
			<CSSReset />
			<Layout outline>
				<ReactCursorPosition>
				  <Canvas />
				</ReactCursorPosition>
			</Layout>
		</ThemeProvider>
	);
}
  
export default App;
