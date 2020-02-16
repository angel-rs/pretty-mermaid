import React from 'react';
import {
  FiLink,
  FiDownload,
} from 'react-icons/fi';
import {
  Flex,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from '@chakra-ui/core';

import { ActionButton } from './action-button/action-button.component'

const ActionButtons = (props) => {
  const { isMobile } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  const common = {
    size: 'lg',
    variant: 'ghost',
  }
  const actionButtons = [
    {
      ...common,
      label: 'Export',
      Icon: FiDownload,
      onClick: () => alert('WIP'),
    },
    {
      ...common,
      label: 'Share',
      Icon: FiLink,
      onClick: () => alert('WIP'),
    },
    {
      ...common,
      isCircle: true,
      variant: 'outline',
      label: 'Toggle theme',
      Icon: colorMode === 'light' ? 'moon' : 'sun',
      onClick: toggleColorMode,
      variantColor: colorMode === 'light' ? 'purple' : 'yellow',
      color: colorMode === 'light' ? '#805ad5' : '#faf089'
    },
  ];
  
  return (
    <Flex direction="row">
      {isMobile
        ? (
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} variantColor="teal" rightIcon="chevron-down">
              Actions
            </MenuButton>
            <MenuList minWidth="200px">
              {actionButtons.map((actionButton, i) => (
                <ActionButton
                  key={actionButton.label}
                  isMobile={true}
                  isLast={i === actionButtons.length - 1}
                  {...actionButton}
                />
              ))}
            </MenuList>
          </Menu>
        )
        : (
          actionButtons.map((actionButton) => (
            <ActionButton
              key={actionButton.label}
              isMobile={false}
              {...actionButton}
            />
          ))
        )
      }
    </Flex>
  )
}

export { ActionButtons }