import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import '.././index.css';

function CollaborationPage({ matchResult }) {
  // State for the code content in the editor
  const { userId, matchedUserId, topic, difficulty, language: unformattedLanguage } = matchResult;
  const language = unformattedLanguage.toLowerCase();

  const getInitialCode = (language) => {
    switch (language) {
      case 'typescript':
        return `// Start coding here\nfunction reverseString(s) {\n  // Your code here\n}`;
      case 'python':
        return `# Start coding here\ndef reverse_string(s):\n    # Your code here\n`;
      case 'java':
        return `// Start coding here\npublic class Main {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`;
      case 'cpp':
        return `// Start coding here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`;
      case 'c':
        return `// Start coding here\nusing System;\n\nclass Program {\n    static void Main() {\n        // Your code here\n    }\n}`;
      default:
        return `// Start coding here\nfunction reverseString(s) {\n  // Your code here\n}`; // Default to JavaScript
    }
  };

  const [code, setCode] = useState(getInitialCode(language));
  const [editorLanguage, setEditorLanguage] = useState(language || 'javascript');

  // Dummy question text to be displayed
  const questionText = `
  ### **Reverse A String**

  **Topic**: ${topic}  
  **Complexity**: ${difficulty}  
  **Language**: ${unformattedLanguage}  

  **Question Description**  
  Write a function that reverses a string. The input string is given as an array of characters s.  
  You must do this by modifying the input array in-place with O(1) extra memory.

  **Example 0:**  
  Input: s = ["h","e","l","l","o"]  
  Output: ["o","l","l","e","h"]

  **Example 1:**  
  Input: s = ["H","a","n","n","a","h"]  
  Output: ["h","a","n","n","a","H"]

  **Constraints:**  
    1. 1 <= s.length <= 10^5  
    2. s[i] is a printable ASCII character  
  &nbsp;  
  `;

  // Update editor language based on the question choice
  useEffect(() => {
    setEditorLanguage(language);
  }, [language]);

  // Reference to the editor instance
  const editorRef = useRef(null);

  // Handle editor mount to access the Monaco editor instance
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      setCode(editor.getValue());
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
    <div className="h-[calc(100vh-65px)] w-full flex flex-row justify-center items-center">
      {/* Question section on the left */}
      <div className="w-1/2 bg-[#1e1e1e] flex text-white h-full overflow-y-auto px-3 border-r-2 border-black">
        <ReactMarkdown className="text-lg leading-tight whitespace-pre-wrap markdown">
          {questionText}
        </ReactMarkdown>
      </div>

      {/* Editor section on the right */}
      <div className="w-1/2 h-full flex">
        <Editor
          language={editorLanguage}
          value={code}
          onChange={(newCode) => setCode(newCode)}
          theme="vs-dark"
          options={editorOptions}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}

export default CollaborationPage; 