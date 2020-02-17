import React from 'react';
import { FaReact, FaGithub, FaCoffee } from 'react-icons/fa';
import { TiHeart, TiWarning } from 'react-icons/ti';
import {
  Flex,
  Text,
  Link,
} from '@chakra-ui/core';

import './footer.styles.scss';

const Footer = (props) => {

  const icons = {
		react: <FaReact color="#00d8ff" size="1.5em" />,
		coffee: <FaCoffee color="#795548" size="1.5em" />,
		love: <TiHeart color="#dd2c00" size="1.5em" />,
		github: (
			<Link isExternal href="https://github.com/angel-rs/pretty-mermaid">
				<FaGithub size="1.5em" />
			</Link>
    ),
    warning: <TiWarning color="yellow" size="1.5em" />
	};
  return (
		<Flex
			direction="column"
			align="flex-end"
			justify="center"
			className="pretty-footer"
		>
      <Text className="footer-text">
        Built with&nbsp;{icons['react']},&nbsp;{icons['coffee']}&nbsp;&{icons['love']}, code in&nbsp;{icons['github']}, still a WIP!&nbsp;{icons['warning']}
      </Text>
		</Flex>
	);
}

export default Footer;
