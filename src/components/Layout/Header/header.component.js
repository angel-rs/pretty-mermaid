import React from 'react';
import {
  Flex,
  Text,
  Divider,
  Badge,
} from '@chakra-ui/core';

import { Config } from 'src/config';
import { useWindowSize } from 'src/hooks';

import { ActionButtons } from './action-buttons/action-buttons.component'
import './header.styles.scss';

const breakPoint = 720;

const Header = (props) => {
  const { width } = useWindowSize();

  return (
		<>
			<Flex
				direction="row"
				align="center"
				justify="space-between"
				className="pretty-header"
				{...props}
			>
				<Flex direction="row">
          <Text fontSize={["sm", "md", "lg", "xl", '2xl', '3xl']} style={{ marginRight: 16 }}>
						<span role="img" aria-label="mermaid">
							🧜️
						</span>
						Pretty Mermaid
					</Text>
          { width >= breakPoint && (
            <Flex direction="column">
              <Flex direction="row">
                <Text fontSize="sm">
                  pretty-mermaid&nbsp;
              </Text>
                <Badge variant="subtle" variantColor="green">
                  {Config.versions.prettyMermaid}
                </Badge>
              </Flex>

              <Flex direction="row">
                <Text fontSize="sm">
                  mermaid&nbsp;
              </Text>
                <Badge variant="subtle" variantColor="green">
                  {Config.versions.mermaid}
                </Badge>
              </Flex>
            </Flex>
          )}
				</Flex>

        <ActionButtons isMobile={width < breakPoint} />
      </Flex>
			<Divider />
		</>
	);
}

export default Header;
