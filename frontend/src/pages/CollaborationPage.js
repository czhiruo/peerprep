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
import { initializeRoom, translateCode, handleChatMessage, handleDisconnect, handleCodeChange, handleOtherUserDisconnect } from '../controllers/collabController';

function CollaborationPage() {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const editorRef = useRef(null); // Reference to the editor instance
  const isRemoteChange = useRef(false); // Flag to prevent infinite loop, true if change to editor is from remote (other user)
  const timeoutRef = useRef(null); // Timeout reference for the read-only state of the editor
  const countdownRef = useRef(null); // Timeout reference for the countdown when user gets kicked out
  const messagesEndRef = useRef(null); // Reference to the end of the chat messages

  // Testing Data
  const example_question = {
    questionTitle: "Fibonacci Number",
    questionCategory: ["Algorithms", "Strings"],
    questionComplexity: "easy",
    questionDescription:
      "Given an integer `n`, calculate the `nth` Fibonacci number `F(n)`. \n \n The Fibonacci sequence is defined as follows: \n- `F(0) = 0` \n- `F(1) = 1` \n- `F(n) = F(n-1) + F(n-2) for n > 1`\n ",
  };

  const [code, setCode] = useState("");
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


  useEffect(() => {
    const setters = {
      setUserId,
      setCurrentUsername,
      setQuestionObject,
      setQuestionId,
      setCode,
      setLanguage,
      setIsReadOnly,
      setIsGettingKickedOut,
      setCountdown,
      setResponse
    }

    collabService.onCodeChange((newCode) => {
      handleCodeChange(setters, newCode, editorRef, timeoutRef, isRemoteChange)
    });

    collabService.onChatMessage((data) => handleChatMessage(data));
    
    collabService.onOtherUserDisconnect(() => handleOtherUserDisconnect(setters, countdownRef, navigate));
    
    initializeRoom(setters, roomId, navigate);

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
    window.addEventListener("beforeunload", () => handleDisconnect(userId, questionId)); // For page refresh

    return async () => {
      window.removeEventListener("beforeunload", () => handleDisconnect(userId, questionId));
      handleDisconnect(userId, questionId); // For component unmount (navigating away)
    };
  }, [questionId, userId]);

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
    fontSize: 12,

    fontFamily: "JetBrains Mono, monospace",
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    theme: "vs-dark",
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
    translateCode(code, selectedLanguage, newLanguage, setCode, setSelectedLanguage, setEditorLanguage);
  };

  return (
    <div className="h-[calc(100vh-65px)] w-full flex flex-col">
      <div className="flex flex-row flex-grow h-2/3 bg-red-200">
        <div className="w-1/2 bg-[#1e1e1e] flex text-white overflow-y-auto px-3 border-r-2 border-black">
          <QuestionDisplay
            language={selectedLanguage}
            question={questionObject}
          />
        </div>

        <div className="w-1/2 h-full flex relative bg-[#1e1e1e]">
          {isReadOnly && (
            <div>
              <div className="absolute inset-0 bg-gray-700 opacity-75 flex justify-center items-center z-10">
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
                className="text-gray-800 font-medium text-xs bg-gray-200 border rounded-md p-2 mt-8 mx-4"
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
              value={code}
              onChange={(newCode) => setCode(newCode)}
              theme="vs-dark"
              options={editorOptions}
              onMount={handleEditorDidMount}
            />
          </div>
        </div>
      </div>

      {/* Chatbox at the bottom */}
      <div className="h-1/3 w-full border-t border-gray-700 flex flex-col bg-gray-800">
        <div className="flex-grow overflow-y-auto overflow-x-hidden p-3">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col mb-2 ${
                msg.sender === "You" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`text-sm font-semibold text-white ${
                  msg.sender === "You" ? "text-right" : "text-left"
                }`}
              >
                {msg.sender}
              </div>
              <div
                className={`max-w-md p-2 rounded-lg break-words ${
                  msg.sender === "You"
                    ? "bg-blue-600 text-white text-right"
                    : "bg-gray-700 text-white"
                }`}
              >
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-gray-700">
          <div className="flex">
            <input
              type="text"
              className="input input-bordered w-full bg-white text-black rounded-l-full rounded-r-full"
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
            text={`Other user disconnected! Redirecting to home page in ${countdown}s...`}
          />
        </div>
      )}
    </div>
  );
}

export default CollaborationPage;
