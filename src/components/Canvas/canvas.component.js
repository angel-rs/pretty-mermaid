import React, { useState } from 'react';
import { Box, Text, Flex, useColorMode } from '@chakra-ui/core';
import AceEditor from "react-ace";

import { Preview } from './Preview/preview.component'
import { Debug } from './Debug/debug.component'
import initialPreviews from './Preview/initialPreviews';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import './canvas.styles.scss';

const Canvas = () => {
  const { colorMode } = useColorMode();
  const [definition, setDefinition] = useState(initialPreviews.flowChart);
  const [annotations, setAnnotations] = useState([]);
  const [previewValues, setPreviewValues] = useState(null);
  const theme = colorMode === 'light' ? 'github' : 'monokai';

  const onChange = (newDefinition) => {
    setDefinition(newDefinition)
  }

  const onErrorFixed = () => {
    console.log('errors were corrected');
    setAnnotations([]);
  }

  const onError = ({ str }) => {
    const captureLineRegexp = /line (\d)/;

    const [, row] = captureLineRegexp.exec(str);

    const newAnnotations = [
			{
				row: Number(row) - 1,
				column: 0,
				type: 'error',
				text: "There's something wrong with this line",
			},
    ];
    
    if (JSON.stringify(annotations) !== JSON.stringify(newAnnotations)) {
      console.log('theres an error')
      setAnnotations(newAnnotations);
    }
  }

  return (
		<Flex
			className="canvas"
			justify="space-between"
			style={{ padding: '0px 10px' }}
		>
      <Box style={{ overflow: 'hidden' }}>
        <Text fontSize={['sm', 'md', 'lg', 'xl']} style={{ paddingBottom: 16 }}>
          Editor
        </Text>
        <AceEditor
          name="editor"
          placeholder="Here goes your 🧜️ code"
          onChange={onChange}
          value={definition}
          theme={theme}
          fontSize={16}
          showPrintMargin
          showGutter
          highlightActiveLine
          debounceChangePeriod={400}
          defaultValue={initialPreviews.flowChart}
          editorProps={{
            tabSize: 2,
            showLineNumbers: true,
          }}
          style={{
            height: '100%',
            width: '48vw',
            paddingTop: 16,
          }}
          annotations={annotations}
        />
      </Box>

			<Preview
				definition={definition}
				onError={onError}
				onErrorFixed={onErrorFixed}
				onUpdate={values =>
					setPreviewValues({
						...previewValues,
						...values,
					})
				}
			/>

			{process.env.NODE_ENV !== 'production' && true && (
				<Debug
					theme={colorMode === 'light' ? undefined : 'monokai'}
					values={{
						editor: {
							theme,
							definition,
							annotations,
						},
						preview: {
							...previewValues,
						},
					}}
				/>
			)}
		</Flex>
	);
};

export { Canvas }
