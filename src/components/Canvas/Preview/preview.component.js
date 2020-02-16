import React, { useState, useEffect } from 'react';

const Preview = (props) => {
  const {
    error,
    preview: nextPreview,
  } = props;

  const [preview, setPreview] = useState(nextPreview);

  useEffect(() => {
    if (!error && nextPreview !== preview) {
      setPreview(nextPreview);
    }
  }, [nextPreview, preview, error]);

  return (
    <>
      {preview && (
        <div
          id="mermaid"
          className="mermaid"
          style={{ paddingLeft: 200, maxHeight: '100%', maxWidth: '100%' }}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      )}
    </>
  )
}

export { Preview }
