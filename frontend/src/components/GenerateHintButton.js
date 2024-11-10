import { useState } from 'react';
import { LightBulbIcon, XMarkIcon } from '@heroicons/react/20/solid'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function GenerateHintButton() {

    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');

    const handleGenerateHint = async () => {
        setIsLoading(true);
        setIsOpen(true);        
        try {
            const res = await fetch('http://localhost:5000/code/hints', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ problem: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is, F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2), for n > 1. Given n, calculate F(n)." })
            });
            const data = await res.json();
            setResponse(data.hints);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error generating hint. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return(
        <div>
            {/* Button to open the modal */}
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleGenerateHint}
            >Open Modal
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[40rem]">
                        <div className='flex justify-between align-middle'> 
                            <div className='flex gap-2 align-middle'>
                                <LightBulbIcon className="w-6 h-6 " />
                                <h3 className="font-bold text-xl leading-6">Hint</h3>
                            </div>
                            <div class="text-gray-500 hover:text-gray-800"
                                onClick={closeModal}>
                                <XMarkIcon className='w-7 h-7'/>
                            </div>
                        </div>
                       
                        <p className="m-0 pt-2 text-gray-400 text-sm">Hint to solve the question</p>
                        <p className="m-0 text-gray-400 text-sm"><strong>Note:</strong> The hints provided below is generated using Vertex AI</p>
                        <div className='py-4 prose prose-slate max-w-none'>
                            {isLoading ? (
                                    <div className="flex items-center justify-center mt-4">
                                        <span className="loading loading-spinner loading-md"></span>
                                        <span className="ml-2">Generating hint for the question...</span>
                                    </div>
                                ) : (
                                    <div>
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
                                                        className="rounded-lg my-4 p-4 bg-gray-800"
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
                        <div className='flex justify-end mt-4'>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={closeModal}
                            >Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default GenerateHintButton;