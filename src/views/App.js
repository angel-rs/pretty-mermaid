import React from 'react';
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core';

import { Layout, Canvas } from 'src/components';
import theme from '../theme'
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
		<ThemeProvider theme={theme}>
			<ColorModeProvider>
				<CSSReset />
				<Layout>
					<Canvas />
				</Layout>
				<ToastContainer/>
			</ColorModeProvider>
		</ThemeProvider>
	);
}
// :  
export default App;
