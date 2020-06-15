import React from "react";
import { FiLink, FiDownload } from "react-icons/fi";
import {
  Flex,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  Button,
} from "@chakra-ui/core";
import { toast } from "react-toastify";

import { ActionButton } from "./action-button/action-button.component";

const copyToClipboard = (str) => {
  const el = document.createElement("textarea"); // Create a <textarea> element
  el.value = str; // Set its value to the string that you want copied
  el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
  el.style.position = "absolute";
  el.style.left = "-9999px"; // Move outside the screen to make it invisible
  document.body.appendChild(el); // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0 // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0) // Store selection if found
      : false; // Mark as false to know no selection existed before
  el.select(); // Select the <textarea> content
  document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el); // Remove the <textarea> element
  if (selected) {
    // If a selection existed before copying
    document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
    document.getSelection().addRange(selected); // Restore the original selection
  }
};

function download(filename, text) {
  var pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

const ActionButtons = (props) => {
  const { isMobile } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  const common = {
    size: "lg",
    variant: "ghost",
  };
  const actionButtons = [
    {
      ...common,
      label: "Export",
      Icon: FiDownload,
      onClick: () => {
        const fileName = `flowchart_${new Date()
          .toString()
          .replace(/ /g, "_")}.svg`;
        const content = document.querySelector(".diagram-container").innerHTML;
        // const file = new File([content], fileName, {type: 'image/svg+xml;charset=utf-8'});
        download(fileName, content);
      },
    },
    {
      ...common,
      label: "Share",
      Icon: FiLink,
      onClick: () => {
        copyToClipboard(
          `https://share-code.netlify.com/?d=${localStorage.getItem(
            "definition"
          )}`
        );
        toast.success("URL copied to clipboard");
      },
    },
    {
      ...common,
      isCircle: true,
      variant: "outline",
      label: "Toggle theme",
      Icon: colorMode === "light" ? "moon" : "sun",
      onClick: toggleColorMode,
      variantColor: colorMode === "light" ? "purple" : "yellow",
      color: colorMode === "light" ? "#805ad5" : "#faf089",
    },
  ];

  return (
    <Flex direction="row">
      {isMobile ? (
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
      ) : (
        actionButtons.map((actionButton) => (
          <ActionButton
            key={actionButton.label}
            isMobile={false}
            {...actionButton}
          />
        ))
      )}
    </Flex>
  );
};

export { ActionButtons };
