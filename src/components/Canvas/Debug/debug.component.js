import React from 'react';
import { Box } from '@chakra-ui/core';

import { syntaxHighlight } from 'src/utils';

import './debug.styles.scss';

const Debug = ({ values }) => {
  return (
		<Box id="debug-box" bg="gray">
			<pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(values) }} />
		</Box>
	);
}

export { Debug }
