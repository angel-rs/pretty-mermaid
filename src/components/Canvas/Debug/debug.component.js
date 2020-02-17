import React from 'react';
import { Box } from '@chakra-ui/core';
import ReactJson from 'react-json-view';

import './debug.styles.scss';

const Debug = ({ values, theme }) => {
  return (
		<Box id="debug-box" borderWidth="1px">
      <ReactJson
        src={values}
        theme={theme}
        enableClipboard={false}
      />
		</Box>
	);
}

export { Debug }
