import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import collabService from '../services/collabService';
import ReactMarkdown from 'react-markdown';
import debounce from 'lodash.debounce';
import '.././index.css';

function CollaborationPage({ matchResult }) {
  const { userId, topic, difficulty, language: unformattedLanguage } = matchResult;
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
  const [isReadOnly, setIsReadOnly] = useState(false);

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

  const isRemoteChange = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    collabService.register(userId);

    // Listen for code changes from the matched user
    collabService.onCodeChange((newCode) => {
      if (editorRef.current) {
        isRemoteChange.current = true;
        setIsReadOnly(true); // Set read-only and display overlay

        editorRef.current.updateOptions({
          readOnly: true,
        });

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsReadOnly(false); // Remove read-only and hide overlay
          editorRef.current.updateOptions({
            readOnly: false,
          });
        }, 1000);

        const cursorPosition = editorRef.current.getPosition();
        editorRef.current.setValue(newCode);
        editorRef.current.setPosition(cursorPosition);
      }
    });
  }, [userId]);

  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const debouncedContentChangeHandler = debounce(() => {
      if (isRemoteChange.current) {
        isRemoteChange.current = false;
        return;
      }
  
      const changedCode = editor.getValue();
      setCode(changedCode);
      collabService.sendCode(changedCode);
    }, 300); // Adjust debounce interval as needed
  
    editor.onDidChangeModelContent(debouncedContentChangeHandler);

    console.log('Editor mounted');
  };

  const editorOptions = {
    fontSize: 16,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    theme: "vs-dark",
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-row justify-center items-center">
      <div className="w-1/2 bg-[#1e1e1e] flex text-white h-full overflow-y-auto px-3 border-r-2 border-black">
        <ReactMarkdown className="text-lg leading-tight whitespace-pre-wrap markdown">
          {questionText}
        </ReactMarkdown>
      </div>

      <div className="w-1/2 h-full flex relative">
        {/* Overlay that appears when editor is read-only */}
        {isReadOnly && (
          <div className="absolute inset-0 bg-gray-700 opacity-75 flex justify-center items-center z-10">
            <span className="text-white font-semibold">Other user is typing...</span>
          </div>
        )}

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
