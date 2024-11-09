import { useState } from 'react';
import { LightBulbIcon } from '@heroicons/react/20/solid'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ApproachButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState('');

    const handleGenerateApproach = async () => {
        setIsLoading(true);
        document.getElementById('approach_modal').showModal();
        
        try {
            const res = await fetch('http://localhost:5000/code/approach', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ problem: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is, F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2), for n > 1. Given n, calculate F(n)." })
            });
            const data = await res.json();
            setResponse(data.approach);
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error generating approach. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div>
            <button className="btn" onClick={handleGenerateApproach}>Show Approach</button>
            <dialog id="approach_modal" className="modal">
            <div className="modal-box max-w-[45rem]">
                <div className='flex gap-2 items-center'>
                    <LightBulbIcon className="w-5 h-5" />
                    <h3 className="font-bold text-lg">Approach</h3>
                </div>
                <p className="pt-3 text-gray-400 text-sm">Step-by-step approach to solve the question</p>
                <p className="pb-3 text-gray-400 text-sm"><strong>Note:</strong> The approach provided below is generated using Vertex AI</p>
                <div className='py-1 prose prose-slate max-w-none'>
                    {isLoading ? (
                            <div className="flex items-center justify-center mt-6">
                                <span className="loading loading-spinner loading-md"></span>
                                <span className="ml-2">Generating approach to solve the question...</span>
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

export default ApproachButton;