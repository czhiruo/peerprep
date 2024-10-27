// CollaborationPage.js

import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';

// Initial setup for the collaboration editor with Monaco Editor
function CollaborationPage() {
  // State for the code content in the editor
  const [code, setCode] = useState(`// Start coding here\nfunction greet() {\n  console.log("Hello, World!");\n}`);

  // Reference to the editor instance
  const editorRef = useRef(null);

  // Handle editor mount to access the Monaco editor instance
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    console.log("Editor mounted successfully.");

    // Potential place to add event listeners for collaborative editing
    editor.onDidChangeModelContent(() => {
      const updatedCode = editor.getValue();
      setCode(updatedCode);
      // TODO: Send updated code to backend for real-time collaboration
    });
  };

  // Editor configuration options
  const editorOptions = {
    fontSize: 16,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    theme: "vs-dark",
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Editor
        height="100%"
        width="100%"
        language="javascript"
        value={code}
        onChange={(newCode) => setCode(newCode)} // For local state changes
        options={editorOptions}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default CollaborationPage;
