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
  const { roomId } = useParams();

  const editorRef = useRef(null);
  const isRemoteChange = useRef(false);
  const timeoutRef = useRef(null);

  const [code, setCode] = useState('');
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isReadOnly, setIsReadOnly] = useState(false);

  // Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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
    const initializeRoom = async () => {
      const token = getToken();

      try {
        const data = await verifyToken(token);
        const username = data.data.username;

        console.log("Username:", username);

        if (!roomId) {
          console.log("No room ID provided; fetching room ID...");
          const fetchedRoomId = await collabService.getRoomId(username);
          console.log("Fetched room ID:", fetchedRoomId);
          navigate(`/room/${fetchedRoomId}`);
          return;
        }

        const room = await collabService.getRoomDetails(roomId);
        const users = room.users;

        if (!users.includes(username)) {
          navigate('/');
          return;
        }

        await collabService.register(username);

        setQuestion(formatQuestion(room.question));
        setCode(room.code);
        setLanguage(room.language);
      } catch (error) {
        console.error("Error initializing room:", error);
        navigate('/');
      }
    };

    initializeRoom();
  }, [navigate, roomId]);

  useEffect(() => {
    // Listen for code changes from the matched user
    collabService.onCodeChange((newCode) => {
      if (editorRef.current) {
        isRemoteChange.current = true;
        setIsReadOnly(true);

        editorRef.current.updateOptions({
          readOnly: true,
        });

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsReadOnly(false);
          editorRef.current.updateOptions({
            readOnly: false,
          });
        }, 1000);

        const cursorPosition = editorRef.current.getPosition();
        editorRef.current.setValue(newCode);
        editorRef.current.setPosition(cursorPosition);
      }
    });

    // Listen for chat messages
    collabService.onChatMessage((data) => {
      setChatMessages((prevMessages) => [...prevMessages, { sender: data.sender, message: data.message }]);
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
    }, 300);

    editor.onDidChangeModelContent(debouncedContentChangeHandler);
  };

  const editorOptions = {
    fontSize: 16,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    theme: "vs-dark",
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    collabService.sendChatMessage(newMessage);
    setChatMessages((prevMessages) => [...prevMessages, { sender: 'You', message: newMessage }]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <div className="flex flex-row flex-grow">
        <div className="w-1/2 bg-[#1e1e1e] flex text-white h-full overflow-y-auto px-3 border-r-2 border-black">
          <ReactMarkdown className="text-lg leading-tight whitespace-pre-wrap markdown">
            {question}
          </ReactMarkdown>
        </div>

        <div className="w-1/2 h-full flex relative">
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

      {/* Chatbox at the bottom */}
      <div className="h-1/4 w-full border-t border-gray-700 flex flex-col bg-gray-800">
        <div className="flex-grow overflow-y-auto p-3">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
              <span className="text-sm text-white font-semibold">{msg.sender}:</span>
              <p className="text-base text-white">{msg.message}</p>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-700">
          <div className="flex">
            <input
              type="text"
              className="flex-grow bg-gray-900 text-white p-2 rounded-l-md focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="bg-blue-600 text-white p-2 rounded-r-md"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollaborationPage;
