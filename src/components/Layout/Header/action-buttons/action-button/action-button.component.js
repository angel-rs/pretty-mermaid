import React from 'react';
import {
  MenuDivider,
  MenuItem,
	IconButton,
  Tooltip,
  Icon as IIcon,
	Box,
} from '@chakra-ui/core';

const ActionButton = (props) => {
  const {
    label,
    isMobile,
    isLast,
    Icon,
    onClick,
    variant,
    variantColor,
    color,
  } = props

  if (isMobile) {
    return (
      <>
        {isLast && <MenuDivider />}
        <MenuItem value={label} onClick={onClick}>
          {typeof Icon === 'string'
            ? <IIcon color={color} name={Icon} />
            : <Icon />
          }
          &nbsp;&nbsp;{label}
        </MenuItem>
      </>
    )
  }

  return (
    <Box style={{ marginLeft: 12 }}>
      <Tooltip hasArrow placement="bottom" label={label}>
        <IconButton
          aria-label={label}
          icon={Icon}
          onClick={onClick}
          variant={variant}
          variantColor={variantColor}
        />
      </Tooltip>
    </Box>
  );
}

export { ActionButton };