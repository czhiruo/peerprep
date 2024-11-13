import { useState } from 'react';
import {  CheckCircleIcon, CheckIcon, DocumentDuplicateIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { BeakerIcon} from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getLanguageNameFromCode, languageList } from "../commons/constants";
import { extractCode } from "../commons/utils";

function GenerateSolutionButton( { language, questionDescription }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');    
    const [copied, setCopied] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(getLanguageNameFromCode(language));

    const closeModal = () => setIsOpen(false);

    const handleGenerateSolution = async () => {
      setIsLoading(true);
      setIsOpen(true);

      try {
        console.log(`language pass in = ${language}`);
        console.log(`SelectedLanguage = ${selectedLanguage}`);
        const res = await fetch("http://localhost:5001/code/solution", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problem: questionDescription,
            language: selectedLanguage,
          }),
        });
        const data = await res.json();
        setResponse(data.solution);
      } catch (error) {
        console.error("Error:", error);
        setResponse("Error generating solution. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(extractCode(response)); // Use the Clipboard API
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        } catch (err) {
          console.error('Failed to copy: ', err); // Log any errors
        }
    };

    const handleLanguageChange = async (event) => {
          const newLanguage = event.target.value;
          const newLanguageDisplay = event.target.value;
          console.log(`target_language -> new language = ${newLanguage}`);
          console.log(
            `source_language -> selecteLanguage = ${selectedLanguage}`
          );
          console.log(`code to translate = ${response}`);
          try {
            const res = await fetch("http://localhost:5001/code/translate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code: response,
                source_lang: selectedLanguage,
                target_lang: newLanguage,
              }),
            });
            const data = await res.json();
            setSelectedLanguage(newLanguageDisplay);
            console.log(
              `after language change, selecteLanguage = ${selectedLanguage}`
            );
            setResponse(data.translated_code);
          } catch (error) {
            console.error("Error translating:", error);
          }
        };
    
    
    
    return (
      <div>
        {/* Button to open the modal */}
        <div
          className="flex gap-1 py-2 bg-white text-gray-700 text-xs font-semibold rounded cursor-pointer w-fit hover:bg-blue-600"
          onClick={handleGenerateSolution}
        >
          <BeakerIcon className="ml-2 w-4 h-4" />
          <span className="pr-3">Solution</span>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-[40rem] max-h-[80vh] flex flex-col">
              <div className="flex justify-between align-middle">
                <div className="flex gap-2 align-middle">
                  <CheckCircleIcon className="w-6 h-6 " />
                  <h3 className="font-bold text-xl leading-6">Solution</h3>
                </div>
                <div
                  class="text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <XMarkIcon className="w-7 h-7" />
                </div>
              </div>

              <p className="m-0 pt-2 text-gray-400 text-sm">
                Show solution for the question
              </p>
              <p className="m-0 text-gray-400 text-sm">
                <strong>Note:</strong> The solution provided below is generated
                using Vertex AI. While efforts are made to ensure accuracy,
                please verify the information independently, as the generated
                content may not always be correct.
              </p>
              <div className="overflow-y-auto flex-grow my-4">
                <div className="py-4 prose prose-slate max-w-none">
                  {isLoading ? (
                    <div className="flex items-center justify-center mt-4">
                      <span className="loading loading-spinner loading-md"></span>
                      <span className="ml-2">
                        Generating solution for the question...
                      </span>
                    </div>
                  ) : (
                    <div className="text-sm flex flex-col space-y-0 space-x-0">
                      <div className="flex items-center justify-between">
                        <select
                          value={selectedLanguage}
                          onChange={handleLanguageChange}
                          className="text-gray-800 font-semibold text-base bg-gray-200 border rounded-md p-2"
                        >
                          {languageList.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                        <div
                          className="copy-button cursor-pointer bg-white p-2 rounded-md border text-gray-800"
                          onClick={handleCopy}
                          role="button"
                        >
                          {copied ? (
                            <CheckIcon className="h-4 w-4" />
                          ) : (
                            <DocumentDuplicateIcon className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <ReactMarkdown
                        components={{
                          // Headers
                          h1: ({ node, ...props }) => ( <h1 className="text-4xl font-bold mb-4" {...props} /> ),
                          h2: ({ node, ...props }) => ( <h2 className="text-3xl font-bold mb-3" {...props} /> ),
                          h3: ({ node, ...props }) => ( <h3 className="text-lg font-bold mt-6 mb-3" {...props}/>),

                          // Paragraphs
                          p: ({ node, ...props }) => (
                            <p
                              className="text-base mb-4 leading-relaxed"
                              {...props}
                            />
                          ),

                          // Lists
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc pl-6 mb-4 space-y-2"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal ml-4 mb-4" {...props} />
                          ),

                          // Code blocks
                          code({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }) {
                            const match = /language-(\w+)/.exec(
                              className || ""
                            );
                            return !inline && match ? (
                              <SyntaxHighlighter
                                style={dracula}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg my-4 p-4 bg-gray-800"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            ) : (
                              <code
                                className="bg-gray-100 rounded px-2 py-1 text-sm font-mono"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },

                          // Blockquotes
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-gray-300 pl-4 italic my-4"
                              {...props}
                            />
                          ),

                          // Tables
                          table: ({ node, ...props }) => (
                            <table
                              className="min-w-full border-collapse my-4"
                              {...props}
                            />
                          ),
                          th: ({ node, ...props }) => (
                            <th
                              className="border border-gray-300 px-4 py-2 bg-gray-100"
                              {...props}
                            />
                          ),
                          td: ({ node, ...props }) => (
                            <td
                              className="border border-gray-300 px-4 py-2"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {response}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default GenerateSolutionButton;