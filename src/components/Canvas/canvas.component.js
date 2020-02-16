import React, { useState, useEffect } from 'react';
import { Flex, useColorMode } from '@chakra-ui/core';
import { mermaidAPI } from 'mermaid';
import AceEditor from "react-ace";

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/ext-searchbox';

import './canvas.styles.scss';

mermaidAPI.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
  theme: "forest",
});

const Canvas = (props) => {
  const { colorMode } = useColorMode();
  const [definition] = useState('')
  const [diagram, setDiagram] = useState('')
  const [error, setError] = useState('')
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

			{diagram && (
				<div
					id="mermaid"
					className="mermaid"
					style={{ paddingLeft: 200, maxHeight: '100%', maxWidth: '100%' }}
					dangerouslySetInnerHTML={{ __html: diagram }}
				/>
			)}
		</Flex>
	);
};

export { Canvas }
