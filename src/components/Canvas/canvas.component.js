import React, { useState, useEffect } from 'react';
import { Flex, useColorMode } from '@chakra-ui/core';
import AceEditor from "react-ace";
import { mermaidAPI } from 'mermaid';

import { Preview } from './Preview/preview.component'
import initialPreviews from './Preview/initialPreviews';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import './canvas.styles.scss';

mermaidAPI.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
  theme: "forest",
});

const Canvas = () => {
  const { colorMode } = useColorMode();
  const [definition] = useState(initialPreviews.flowChart);
  const [diagram, setDiagram] = useState(initialPreviews.flowChart);
  const [error, setError] = useState('');
  const theme = colorMode === 'light' ? 'github' : 'monokai';

  useEffect(() => {
    console.log(definition)
    if (definition === '') {
      setError('');
      return
    }

    try {
      mermaidAPI.render('mermaid', definition, (svgGraph) => {
        console.log('setting diagram')
        console.log(svgGraph)
        setDiagram(svgGraph)

        if (error !== '') {
          setError('')
        }
      });
    } catch (error) {
      console.log('Invalid mermaid syntax')
      setDiagram('')
      setError('Invalid mermaid syntax');
    }
  }, [definition, error]);

  return (
		<Flex className="canvas">
			<AceEditor
				placeholder="Here goes your 🧜️ code"
				onChange={console.log}
				name="editor"
				theme={theme}
				fontSize={16}
				showPrintMargin
				showGutter
				highlightActiveLine
				editorProps={{
					tabSize: 2,
					showLineNumbers: true,
				}}
			/>

      <Preview
        preview={diagram}
        error={error}
      />
		</Flex>
	);
};

export { Canvas }
