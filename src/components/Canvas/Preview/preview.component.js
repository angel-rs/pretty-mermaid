import React, { useState, useEffect } from 'react';
import mermaid from 'mermaid';
import Mermaid from 'react-mermaid2';
import svgPanZoom from 'svg-pan-zoom';
import {
  Flex,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/core';

import { ErrorBoundary } from 'react-error-boundary';
import './preview.styles.scss';

const mermaidConfig = {
  startOnLoad: true,
  securityLevel: 'loose',
  theme: 'forest',
};

const Preview = (props) => {
  const {
    definition,
    onError,
    onErrorFixed,
    onUpdate,
    ...rest
  } = props;

  const [currentDefinition, setCurrentDefinition] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  const updatePreview = () => {
    console.log('updating diagram');
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setTimeout(() => {
        const svg = document.querySelector('.mermaid').firstChild;
        if (svg) {
          console.log('init svg-pan-zoom');
          svgPanZoom(svg, {
						contain: true,
						center: true,
						controlIconsEnabled: true,
					});
        }
      }, 1)
    }, 1);
  }

  useEffect(() => {
    let localError;
    const diagramIsDifferent = currentDefinition !== definition;
    const nextDefinitionIsValid = () => {
      try {
        mermaid.parse(definition);
        setError('')
        onErrorFixed();
        return true;
      } catch (error) {
        onError(error)
        setError('Error parsing')
        return false;
      }
    };
    const isNextValidationValid = nextDefinitionIsValid();

    onUpdate({
      debug: {
        diagramIsDifferent,
        isNextValidationValid,
        error,
        definition,
        localError,
      }
    })

    if (diagramIsDifferent && isNextValidationValid && !error) {
      setCurrentDefinition(definition);
      updatePreview();
    }
  // eslint-disable-next-line
  }, [definition]);

  return (
		<Flex className="preview" direction="column" {...rest}>
			<Text fontSize={['sm', 'md', 'lg', 'xl']} style={{ paddingBottom: 16 }}>
				Preview
			</Text>

			<Flex borderWidth="0.5px" align="center" justify="center" className="diagram-container">
        {error && (
          <Alert id="diagram-alert" status="warning">
            <AlertIcon />
            There seems to be something wrong with your diagram
          </Alert>
        )}
				{!updating && (
          <ErrorBoundary FallbackComponent={() => null}>
            <Mermaid chart={currentDefinition} config={mermaidConfig} />
          </ErrorBoundary>
				)}
			</Flex>
		</Flex>
	);
}

export { Preview }
