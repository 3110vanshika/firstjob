import React, { useEffect, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ value, onChange, placeholder }) => {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/
    placeholder: placeholder || 'Start typing...',
  }), [placeholder]);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor.current) {
      editor.current.value = value; // Set the editor content
    }
  }, [value]);

  return (
    <JoditEditor
      ref={editor}
      value={value} // Control the editor content with the value prop
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => {
        onChange(newContent); // Call onChange when the editor loses focus
      }}
      onChange={newContent => {
        // Call onChange on every change (if necessary, but can be optimized)
        onChange(newContent);
      }}
    />
  );
};

export default Editor;
