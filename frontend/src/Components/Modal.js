import React, { useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { GoogleGenerativeAI } from '@google/generative-ai';

function Modal({ isOpen, closeModal, title, description, language, code, contributor, tags, dateAdded, complexity, examples }) {
    const [activeTab, setActiveTab] = useState('code'); // Track the active tab
    const [aiResponse, setAiResponse] = useState('');

    if (!isOpen) return null;

    // Language mapping
    const languageMap = {
        'JavaScript': 'javascript',
        'Python': 'python',
        'Java': 'java',
        'C++': 'cpp',
        'Ruby': 'ruby',
    };

    // Ensure code is a string before calling replace
    const formattedCode = Array.isArray(code) ? code.join('\n') : code;

    const handleModalClick = (e) => {
        e.stopPropagation();
    };
    
    const handleAiButtonClick = async () => {
        setAiResponse('Generating Summary...');
        try {
            const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI_API_KEY}`); 
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const chatSession = model.startChat({
                generationConfig: {
                    temperature: 1,
                    topP: 0.95,
                    topK: 64,
                    maxOutputTokens: 8192,
                    responseMimeType: "text/plain",
                },
            });

            const result = await chatSession.sendMessage(`Explain this code in 5-8 lines ${formattedCode}`);
            const responseText = await result.response.text();
            setAiResponse(responseText);
        } catch (error) {
            console.error("Error generating AI response:", error);
        }
    };

    const handleClose = () => {
        setAiResponse('');
        setActiveTab('code');
        closeModal();
    }

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" onClick={handleClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-auto w-11/12 md:w-1/2 lg:w-1/2 xl:w-1/3 p-6 overflow-y-auto max-h-screen" onClick={handleModalClick}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500">
                        &times;
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-300">{description}</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b-2 mb-4">
                    <button
                        className={`px-4 py-2 ${activeTab === 'code' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-600 dark:text-gray-300'}`}
                        onClick={() => setActiveTab('code')}
                    >
                        {language}
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'ai' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-600 dark:text-gray-300'}`}
                        onClick={() => setActiveTab('ai')}
                    >
                        AI
                    </button>
                </div>

                {/* Conditional Rendering Based on Active Tab */}
                {activeTab === 'code' ? (
                    <div className="mb-4">
                        <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg border-2 border-gray-300 dark:border-gray-600">
                            <SyntaxHighlighter className="max-h-60 overflow-scroll" language={languageMap[language] || 'text'} style={docco}>
                                {formattedCode}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                ) : (
                    <div className="mb-4">
                        <button onClick={handleAiButtonClick} className="flex bg-pink-600 text-white px-4 py-2 rounded-lg">
                            <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M17.44 3a1 1 0 0 1 .707.293l2.56 2.56a1 1 0 0 1 0 1.414L18.194 9.78 14.22 5.806l2.513-2.513A1 1 0 0 1 17.44 3Zm-4.634 4.22-9.513 9.513a1 1 0 0 0 0 1.414l2.56 2.56a1 1 0 0 0 1.414 0l9.513-9.513-3.974-3.974ZM6 6a1 1 0 0 1 1 1v1h1a1 1 0 0 1 0 2H7v1a1 1 0 1 1-2 0v-1H4a1 1 0 0 1 0-2h1V7a1 1 0 0 1 1-1Zm9 9a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1v-1a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                                <path d="M19 13h-2v2h2v-2ZM13 3h-2v2h2V3Zm-2 2H9v2h2V5ZM9 3H7v2h2V3Zm12 8h-2v2h2v-2Zm0 4h-2v2h2v-2Z" />
                            </svg>
                            &nbsp;Summarize
                        </button>
                        {aiResponse && (
                            <div className="ai-res max-h-56 overflow-scroll mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                                <p className="text-gray-600 dark:text-gray-300">{aiResponse}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Complexity */}
                <div className="mb-4 flex">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Complexity:&nbsp;</span>
                    <p className="text-gray-600 dark:text-gray-300">{complexity}</p>
                </div>

                {/* Examples */}
                <div className="mb-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Example:</span>
                    {examples.map((example, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-gray-600 dark:text-gray-300"><strong>Input:</strong> {example.input}</p>
                            <p className="text-gray-600 dark:text-gray-300"><strong>Output:</strong> {example.output}</p>
                        </div>
                    ))}
                </div>

                {/* Contributor */}
                <div className="mb-4 flex">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Contributed by&nbsp;</span>
                    <a className="text-gray-600 dark:text-gray-300" href={`https://github.com/` + contributor} target='__blank'>@{contributor}</a>
                </div>

                {/* Tags */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="text-sm px-2 py-1 text-white bg-pink-600 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
