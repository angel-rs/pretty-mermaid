import React from 'react';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';

import { Layout, Canvas } from 'src/components';
import theme from '../theme'
import './App.scss';

function App() {
  return (
		<ThemeProvider theme={theme}>
			<ColorModeProvider>
				<CSSReset />
				<Layout>
					<Canvas />
				</Layout>
			</ColorModeProvider>
		</ThemeProvider>
	);
}
// :  
export default App;
