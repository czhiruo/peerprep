import { useState } from 'react';
import { CheckCircleIcon, CheckIcon, DocumentDuplicateIcon } from '@heroicons/react/20/solid'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SolutionButton = ( { language, questionDescription }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [copied, setCopied] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(language);

  

    const handleGenerateSolution = async () => {
        setIsLoading(true);
        document.getElementById('solution_modal').showModal();
        
        try {
            console.log(`language pass in = ${language}`);
            console.log(`SelectedLanguage = ${selectedLanguage}`);
            const res = await fetch('http://localhost:5000/code/solution', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    problem: questionDescription,
                    language: selectedLanguage
                })
            });
            const data = await res.json();
            setResponse(data.solution);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error generating solution. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(response); // Use the Clipboard API
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        } catch (err) {
          console.error('Failed to copy: ', err); // Log any errors
        }
    };
    


    return(
        <div>
            <button className="btn" onClick={handleGenerateSolution}>Show Solution</button>
            <dialog id="solution_modal" className="modal">
            <div className="modal-box max-w-[45rem]">
                <div className='flex gap-2 items-center'>
                    <CheckCircleIcon className="w-5 h-5" />
                    <h3 className="font-bold text-lg">Solution</h3>
                </div>
                <p className="pt-3 text-gray-400 text-sm">Show solution for the question</p>
                <p className="pb-3 text-gray-400 text-sm"><strong>Note:</strong> The hints provided below is generated using Vertex AI. While efforts are made to ensure accuracy, please verify the information independently, as the generated content may not always be correct.</p>
                <div className='py-4'>
                    {isLoading ? (
                            <div className="flex items-center justify-center mt-6">
                                <span className="loading loading-spinner loading-md"></span>
                                <span className="ml-2">Generating solution for the question...</span>
                            </div>
                        ) : (
                            <div className='text-xs flex flex-col space-y-0 space-x-0'>
                                <div className='flex justify-between items-center '>
                                    <p className='pl-1 text-gray-800 font-semibold text-based'>{language}</p>
                                    <div className="copy-button cursor-pointer bg-gray-200 p-2 rounded-md border" 
                                        onClick={handleCopy} role="button">
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
                                        h1: ({ node, ...props }) => (
                                            <h1 className="text-4xl font-bold mb-4" {...props} />
                                        ),
                                        h2: ({ node, ...props }) => (
                                            <h2 className="text-3xl font-bold mb-3" {...props} />
                                        ),
                                        h3: ({ node, ...props }) => (
                                            <h3 className="text-lg font-bold mt-6 mb-3" {...props} />
                                        ),

                                        // Paragraphs
                                        p: ({ node, ...props }) => (
                                        <p className="text-base mb-4 leading-relaxed" {...props} />
                                        ),

                                        // Lists
                                        ul: ({ node, ...props }) => (
                                            <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
                                        ),
                                        ol: ({ node, ...props }) => (
                                            <ol className="list-decimal ml-4 mb-4" {...props} />
                                        ),

                                        // Code blocks
                                        code({node, inline, className, children, ...props}) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                    <SyntaxHighlighter
                                                        style={dracula}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        className="rounded-lg bg-gray-800"
                                                        {...props}
                                                    >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>                                                
                                            ) : (
                                                <code className="bg-gray-100 rounded px-2 py-1 text-sm font-mono" {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },

                                        // Blockquotes
                                        blockquote: ({ node, ...props }) => (
                                            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                                        ),

                                        // Tables
                                        table: ({ node, ...props }) => (
                                            <table className="min-w-full border-collapse my-4" {...props} />
                                        ),
                                        th: ({ node, ...props }) => (
                                            <th className="border border-gray-300 px-4 py-2 bg-gray-100" {...props} />
                                        ),
                                        td: ({ node, ...props }) => (
                                            <td className="border border-gray-300 px-4 py-2" {...props} />
                                        )
                                    }}
                                    >
                                    {response}
                                </ReactMarkdown>          
                                               
                            </div>
                        )}
                </div>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">✕</button>
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </dialog>
        </div>
    );
};

export default SolutionButton;