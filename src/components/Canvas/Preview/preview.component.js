import React, { useState, useEffect } from "react";
import * as js2flowchart from "js2flowchart";
// import svgPanZoom from "svg-pan-zoom";
import { Flex, Text, Alert, AlertIcon } from "@chakra-ui/core";

import { ErrorBoundary } from "react-error-boundary";
import "./preview.styles.scss";

function insertParam(key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = document.location.search.substr(1).split("&");
  let i = 0;

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + "=")) {
      let pair = kvp[i].split("=");
      pair[1] = value;
      kvp[i] = pair.join("=");
      break;
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join("=");
  }

  // can return this or...
  let params = kvp.join("&");

  // reload page with new params
  // document.location.replace(params)
}

const Preview = (props) => {
  const { definition, onError, onErrorFixed, onUpdate, ...rest } = props;

  const [currentDefinition, setCurrentDefinition] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const updatePreview = () => {
    console.log("updating diagram");
    const svg = localStorage.getItem("svg");
    if (svg) {
      console.log("init svg-pan-zoom");
      document.querySelector(".diagram-container").innerHTML = svg;


      // TODO
      // svgPanZoom(svg, {
      //   contain: true,
      //   center: true,
      //   controlIconsEnabled: true,
      // });
    }
  };

  useEffect(() => {
    let localError;
    const diagramIsDifferent = currentDefinition !== definition;
    const nextDefinitionIsValid = () => {
      try {
        const svg = js2flowchart.convertCodeToSvg(definition);
        console.log(svg);

        if (svg) {
          localStorage.setItem("svg", svg);
          localStorage.setItem("definition", window.btoa(definition));
        }

        setError("");
        onErrorFixed();
        return true;
      } catch (error) {
        console.log(error);
        // onError(error);
        setError("Error parsing");
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
      },
    });

    if (diagramIsDifferent && isNextValidationValid && !error) {
      setCurrentDefinition(definition);
      updatePreview();
    }
    // eslint-disable-next-line
  }, [definition]);

  return (
    <Flex className="preview" direction="column" {...rest}>
      <Text fontSize={["sm", "md", "lg", "xl"]} style={{ paddingBottom: 16 }}>
        Preview
      </Text>

      <Flex
        borderWidth="0.5px"
        align="center"
        justify="center"
        className="diagram-container"
      />
    </Flex>
  );
};

export { Preview };
