import React, { useState, useEffect } from 'react';
import { mermaidAPI } from 'mermaid';
import {
  Flex,
  Box,
  Text,
  Divider,
  Alert,
  AlertIcon,
} from '@chakra-ui/core';

import { ErrorBoundary } from './error-boundary.component';
import './preview.styles.scss';

const Preview = (props) => {
  const {
    id,
    definition,
    onError,
    onErrorFixed,
  } = props;

  const [currentDefinition, setCurrentDefinition] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    mermaidAPI.initialize({
      startOnLoad: true,
      securityLevel: 'loose',
      theme: 'forest',
    });
  }, []);

  useEffect(() => {
    const diagramIsDifferent = currentDefinition !== definition;
    const nextDefinitionIsValid = () => {
      let isValid = false;

      try {
        if (mermaidAPI.parse(definition)) {
          isValid = true;
        }
      } catch (error) {
        onError(error)
      }

      return isValid;
    };
    const isNextValidationValid = nextDefinitionIsValid();

    console.log({
      isNextValidationValid
    })

    if (diagramIsDifferent && isNextValidationValid && !error) {
			console.log('something changed -- updating definition');
			setCurrentDefinition(definition);
		}
  }, [definition]);

  useEffect(() => {
    if (currentDefinition) {
      mermaidAPI.render('#mermaid', currentDefinition, svg => {
        setPreview(svg);
        setError('');
        onErrorFixed();
      });
    }
  }, [currentDefinition]);

  return (
		<Flex className="preview" direction="column">
			<Text fontSize={['sm', 'md', 'lg', 'xl']}>
        Preview
      </Text>

			<Divider />

      {error && (
        <Alert status="warning">
          <AlertIcon />
          There seems to be something wrong with your diagram
        </Alert>
      )}

			<Box borderWidth="0.5px">
				{preview && (
					<ErrorBoundary>
						<div
							id={id}
							className="mermaid"
							style={{ paddingLeft: 200, maxHeight: '100%', maxWidth: '100%' }}
							dangerouslySetInnerHTML={{ __html: !!preview ? preview : '' }}
						/>
					</ErrorBoundary>
				)}
			</Box>
		</Flex>
	);
}

export { Preview }
