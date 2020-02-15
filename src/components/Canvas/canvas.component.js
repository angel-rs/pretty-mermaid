import React, { useState, useEffect, useCallback } from 'react';
import { mermaidAPI } from 'mermaid';
import {
  Textarea,
} from '@chakra-ui/core';

import ControlBar from './ControlBar/control-bar.component'
import './canvas.styles.scss';

function syntaxHighlight(json) {
	if (typeof json != 'string') {
		json = JSON.stringify(json, null, 2);
	}
	json = json
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
		function(match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		}
	);
}

mermaidAPI.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
  theme: "forest",
});

const Canvas = (props) => {
  const [currentControl, setCurrentControl] = useState(null)
  const [tokens, setTokens] = useState([])
  const [definition, setDefinition] = useState('')
  const [diagram, setDiagram] = useState('')
  const [error, setError] = useState('')
  const { position } = props

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
  }, [definition]);

  const computeDiagram = () => {
    let startDefinition = `graph TD\n`
    let definition = startDefinition;

    const sortByPosition = (a, b) => a.x - b.x || a.y - b.y;

    const boxes = tokens
      .filter(({ token }) => token === 'Box')
      .sort(sortByPosition);
    // const lines = tokens.filter(({token}) => token === 'Line').sort(sortByPosition)

    boxes.forEach((_, i) => {
      definition += `	${i}\n`;
    });
    
    if (definition !== startDefinition) {
      setDefinition(definition);
    }
  }

  const memoizedComputeDiagram = useCallback(
    computeDiagram,
    [tokens]
  );

  useEffect(() => {
    if (tokens.length > 0) {
      memoizedComputeDiagram();
    }
  }, [tokens, memoizedComputeDiagram]);

  const onClick = () => {
    if (!currentControl) return

    const newToken = {
      position,
      token: currentControl,
    }

    const updatedTokens = [ ...tokens, newToken ];
    setTokens(updatedTokens)
    setCurrentControl(null)
  };

  const debug = {
    state: {
      currentControl,
      tokens,
      definition,
      diagram,
    },
    props,
  }

  return (
		<main className="canvas" onClick={onClick}>
			<pre
				style={{
					position: 'absolute',
					right: 20,
					width: 330,
					overflowY: 'scroll',
					height: '90%',
				}}
				dangerouslySetInnerHTML={{ __html: syntaxHighlight(debug) }}
			/>
			<Textarea
				isInvalid={!!error}
				value={definition}
				onChange={({ target }) => {
					setDefinition(target.value);
				}}
				style={{
					position: 'absolute',
					right: 350,
					width: 400,
					overflowY: 'scroll',
					height: '90%',
				}}
			/>

			<ControlBar setControl={setCurrentControl} />

			{diagram && (
				<div
					id="mermaid"
					className="mermaid"
					style={{ paddingLeft: 200, maxHeight: '100%', maxWidth: '100%' }}
					dangerouslySetInnerHTML={{ __html: diagram }}
				/>
			)}
		</main>
	);
};

export { Canvas }
