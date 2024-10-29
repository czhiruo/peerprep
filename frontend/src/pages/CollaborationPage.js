import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import collabService from '../services/collabService';
import ReactMarkdown from 'react-markdown';
import debounce from 'lodash.debounce';
import { useParams } from 'react-router-dom';
import { getToken, verifyToken } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import '.././index.css';

function CollaborationPage() {
  const navigate = useNavigate();
  const { roomId } = useParams()

  const editorRef = useRef(null); // Reference to the editor instance
  const isRemoteChange = useRef(false); // Flag to prevent infinite loop, true if change to editor is from remote (other user)
  const timeoutRef = useRef(null); // Timeout reference for the read-only state of the editor

  const [code, setCode] = useState('');
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isReadOnly, setIsReadOnly] = useState(false);

  function formatQuestion(question) {
    return `
### **${question.questionTitle}**

**Topic**: ${question.questionCategory}  
**Complexity**: ${question.questionComplexity}  

**Question Description**  
${question.questionDescription}
    `.trim();
  }

  useEffect(() => {
    const token = getToken();
    collabService.getRoomDetails(roomId)
      .then((room) => {
        const users = room.users;
        
        // Verify token and register user to the room
        verifyToken(token)
          .then((data) => {
            const username = data.data.username;
            if (!users.includes(username)) {
              navigate('/');
            }
            collabService.register(username);
          });
        
        setQuestion(formatQuestion(room.question));
        setCode(room.code);
        setLanguage(room.language);
      });
  }, [navigate, roomId]);

  useEffect(() => {
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
  }, []);

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
    }, 300); // 300ms debounce time
  
    editor.onDidChangeModelContent(debouncedContentChangeHandler);
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
          {question}
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
          language={language}
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
