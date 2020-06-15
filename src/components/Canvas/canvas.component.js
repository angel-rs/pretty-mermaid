import React, { useState, useEffect } from "react";
import { Box, Text, Flex, useColorMode } from "@chakra-ui/core";
import AceEditor from "react-ace";

import { useWindowSize } from "src/hooks";

import { Preview } from "./Preview/preview.component";
import { Debug } from "./Debug/debug.component";
import initialPreview from "./Preview/initialPreview";

// import 'brace/mode/javascript'
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "./canvas.styles.scss";

const Canvas = () => {
  const { colorMode } = useColorMode();
  const { width } = useWindowSize();

  const [definition, setDefinition] = useState("");
  const [annotations, setAnnotations] = useState([]);
  const [previewValues, setPreviewValues] = useState(null);
  const theme = colorMode === "light" ? "github" : "monokai";

  useEffect(() => {
    let initialD = initialPreview;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const dFromUrl = urlParams.get("d");
      if (dFromUrl) {
        initialD = window.atob(dFromUrl);
        console.log('decompressed')
        console.log(initialD)
      }
    } catch (e) {}
    setDefinition(initialD);
  }, []);

  const onChange = (newDefinition) => {
    setDefinition(newDefinition);
  };

  const onErrorFixed = () => {
    console.log("errors were corrected");
    setAnnotations([]);
  };

  const onError = ({ str }) => {
    const captureLineRegexp = /line (\d)/;

    const [, row] = captureLineRegexp.exec(str);

    const newAnnotations = [
      {
        row: Number(row) - 1,
        column: 0,
        type: "error",
        text: "There's something wrong with this line",
      },
    ];

    if (JSON.stringify(annotations) !== JSON.stringify(newAnnotations)) {
      console.log("theres an error");
      setAnnotations(newAnnotations);
    }
  };

  const isMobile = width < 720;

  return (
    <Flex
      className="canvas"
      justify="space-between"
      direction={isMobile ? "column" : "row"}
    >
      <Box
        style={{
          overflow: !isMobile ? "hidden" : "unset",
          height: isMobile && "80vh",
          marginBottom: isMobile ? 16 : "unset",
        }}
      >
        <Text fontSize={["sm", "md", "lg", "xl"]} style={{ paddingBottom: 16 }}>
          Editor
        </Text>
        <AceEditor
          name="editor"
          mode="javascript"
          placeholder="Here goes your 🧜️ code"
          onChange={onChange}
          value={definition}
          theme={theme}
          fontSize={16}
          showPrintMargin
          showGutter
          highlightActiveLine
          debounceChangePeriod={400}
          defaultValue={initialPreview}
          editorProps={{
            tabSize: 2,
            showLineNumbers: true,
          }}
          style={{
            height: "100%",
            width: isMobile ? "95vw" : "48vw",
            paddingTop: 16,
          }}
          annotations={annotations}
        />
      </Box>

      <Preview
        definition={definition}
        onError={onError}
        onErrorFixed={onErrorFixed}
        style={{
          height: "100%",
          width: isMobile ? "95vw" : "48vw",
          paddingTop: isMobile ? "2em" : "unset",
        }}
        onUpdate={(values) =>
          setPreviewValues({
            ...previewValues,
            ...values,
          })
        }
      />

      {process.env.NODE_ENV !== "production" && false && (
        <Debug
          theme={colorMode === "light" ? undefined : "monokai"}
          values={{
            editor: {
              theme,
              definition,
              annotations,
            },
            preview: {
              ...previewValues,
            },
          }}
        />
      )}
    </Flex>
  );
};

export { Canvas };
