import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/core';
import { FiSquare, FiArrowUpRight } from 'react-icons/fi';
// import { MdSubdirectoryArrowRight } from 'react-icons/md';
import './control-bar.styles.scss'

const controls = [
	// {
	// 	name: 'Direction',
	// 	icon: (
	// 		<IconButton
	// 			variant="outline"
	// 			variantColor="teal"
	// 			aria-label="Direction"
	// 			fontSize="20px"
	// 			icon={MdSubdirectoryArrowRight}
	// 		/>
	// 	),
	// },
	{
		name: 'Box',
		icon: (
			<Tooltip label="Box" hasArrow placement="right">
				<IconButton
					variant="outline"
					variantColor="teal"
					aria-label="box"
					fontSize="20px"
					icon={FiSquare}
				/>
			</Tooltip>
		),
	},
	{
		name: 'Line',
		icon: (
			<Tooltip label="Line" hasArrow placement="right">
				<IconButton
					variant="outline"
					variantColor="teal"
					aria-label="line"
					fontSize="20px"
					icon={FiArrowUpRight}
				/>
			</Tooltip>
		),
	},
];

const ControlBar = (props) => {
  const {
    setControl
  } = props;

	return (
		<div id="control-bar">
      {controls.map(({ name, icon }) => {
        const onClick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          setControl(name)
        };
        return (
          <div key={name} onClick={onClick} style={{margin: '3px 0px 3px 0px'}}>
            {icon}
          </div>
        )
      })}
		</div>
	);
};

export default ControlBar
