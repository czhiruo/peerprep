// CollaborationPage.js

import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import collabService from '../services/collabService';
import debounce from 'lodash.debounce';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '.././index.css';
import DisconnectAlert from '../components/DisconnectAlert';
import QuestionDisplay from '../components/QuestionDisplay';
import { languages } from "../commons/constants";
import { 
  initializeRoom, 
  translateCode, 
  handleChatMessage, 
  handleDisconnect, 
  handleCodeChange, 
  handleOtherUserDisconnect 
} from '../controllers/collabController';

// Import icons from react-icons
import { FaSun, FaMoon } from 'react-icons/fa';

function CollaborationPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const editorRef = useRef(null); // Reference to the editor instance
  const isRemoteChange = useRef(false); // Flag to prevent infinite loop, true if change to editor is from remote (other user)
  const timeoutRef = useRef(null); // Timeout reference for the read-only state of the editor
  const countdownRef = useRef(null); // Timeout reference for the countdown when user gets kicked out
  const messagesEndRef = useRef(null); // Reference to the end of the chat messages
  const codeRef = useRef(""); // Reference to the code

  // Testing Data
  const example_question = {
    questionTitle: "Fibonacci Number",
    questionCategory: ["Algorithms", "Strings"],
    questionComplexity: "easy",
    questionDescription:
      "Given an integer n, calculate the nth Fibonacci number F(n). \n \n The Fibonacci sequence is defined as follows: \n- F(0) = 0 \n- F(1) = 1 \n- F(n) = F(n-1) + F(n-2) for n > 1\n ",
  };

  const [questionObject, setQuestionObject] = useState(example_question);
  const [questionId, setQuestionId] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isGettingKickedOut, setIsGettingKickedOut] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [userId, setUserId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [response, setResponse] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [editorLanguage, setEditorLanguage] = useState("javascript");

  // **Theme State**
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // If no preference, use system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const setters = {
      setUserId,
      setCurrentUsername,
      setQuestionObject,
      setQuestionId,
      setLanguage,
      setEditorLanguage,
      setIsReadOnly,
      setIsGettingKickedOut,
      setCountdown,
      setResponse
    }

    collabService.onCodeChange((newCode) => {
      handleCodeChange(setters, newCode, editorRef, timeoutRef, isRemoteChange)
    });

    collabService.onChatMessage((data) => handleChatMessage(data, setChatMessages));
    
    collabService.onOtherUserDisconnect(() => handleOtherUserDisconnect(setters, countdownRef, navigate));
    
    initializeRoom(setters, roomId, codeRef, navigate);

    return () => {
      collabService.offChatMessage(handleChatMessage);
    };
  }, [navigate, roomId]);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  // On navigating away
  useEffect(() => {
    const beforeUnloadHandler = () => handleDisconnect(userId, questionId, roomId, codeRef.current, language);
    window.addEventListener("beforeunload", beforeUnloadHandler); // For page refresh

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      handleDisconnect(userId, questionId, roomId, codeRef.current, language); // For component unmount (navigating away)
    };
  }, [questionId, userId, language, roomId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    const debouncedContentChangeHandler = debounce(() => {
      if (isRemoteChange.current) {
        isRemoteChange.current = false;
        return;
      }

      const changedCode = editor.getValue();
      codeRef.current = changedCode;
      collabService.sendCode(changedCode);
    }, 300);

    editor.onDidChangeModelContent(debouncedContentChangeHandler);
  };

  const editorOptions = {
    fontSize: 12,
    fontFamily: "JetBrains Mono, monospace",
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    theme: isDarkMode ? "vs-dark" : "light", // Dynamic theme based on state
    lineHeight: 18,
    padding: { top: 16 },
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    collabService.sendChatMessage(newMessage);
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", message: newMessage },
    ]);
    setNewMessage("");
  };

  const handleLanguageChange = async (event) => {
    const newLanguage = event.target.value;
    translateCode({ setSelectedLanguage, setEditorLanguage }, codeRef, language, newLanguage);
    setLanguage(newLanguage);
  };

  // **Theme Toggle Handler**
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    // **Apply theme classes based on isDarkMode state with transition effects**
    <div className={`h-[calc(100vh-65px)] w-full flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* **Header with Theme Toggle** */}
      <div className="flex justify-end p-4">
        <button 
          onClick={toggleTheme} 
          className="btn btn-ghost text-xl transition-colors duration-300"
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="flex flex-row flex-grow h-2/3">
        {/* **Question Display Section** */}
        <div className={`w-1/2 flex overflow-y-auto px-3 border-r-2 border-black transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <QuestionDisplay
            language={selectedLanguage}
            question={questionObject}
          />
        </div>

        {/* **Editor Section** */}
        <div className={`w-1/2 h-full flex relative transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {isReadOnly && (
            <div>
              <div className="absolute inset-0 bg-gray-700 opacity-75 flex justify-center items-center z-10 transition-opacity duration-300">
                <span className="text-white font-semibold">
                  Other user is typing...
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col w-full">
            <div className="pb-2">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className={`font-medium text-xs border rounded-md p-2 mt-8 mx-4 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <Editor
              className="h-full text-sm"
              language={editorLanguage}
              value={codeRef.current}
              onChange={(newCode) => codeRef.current = newCode}
              theme={isDarkMode ? "vs-dark" : "light"} // Switch Monaco theme
              options={editorOptions}
              onMount={handleEditorDidMount}
            />
          </div>
        </div>
      </div>

      {/* **Chatbox at the Bottom** */}
      <div className={`h-1/3 w-full border-t border-gray-700 flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="flex-grow overflow-y-auto overflow-x-hidden p-3">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col mb-2 ${msg.sender === "You" ? "items-end" : "items-start"}`}
            >
              <div
                className={`text-sm font-semibold ${msg.sender === "You" ? "text-right text-white" : "text-left text-gray-800"}`}
              >
                {msg.sender}
              </div>
              <div
                className={`max-w-md p-2 rounded-lg break-words transition-colors duration-300 ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-white text-right"
                    : isDarkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-300 text-gray-900"
                }`}
              >
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-gray-700 transition-colors duration-300">
          <div className="flex">
            <input
              type="text"
              className={`input input-bordered w-full rounded-l-full rounded-r-full transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'
              }`}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <button
              className="btn btn-primary ml-2 rounded-l-full rounded-r-full"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {isGettingKickedOut && (
        <div className="fixed bottom-0 left-0 w-full flex justify-center p-4 z-50">
          <DisconnectAlert
            text={`Other user disconnected! Saving changes and redirecting in ${countdown}s...`}
          />
        </div>
      )}
    </div>
  );
}

export default CollaborationPage;

