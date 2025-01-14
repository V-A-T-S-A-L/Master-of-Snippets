// Modal.js
import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Modal({ isOpen, closeModal, title, description, language, code, contributor, tags, dateAdded, complexity, examples }) {
    if (!isOpen) return null;

    // Language mapping
    const languageMap = {
        'JavaScript': 'javascript',
        'Python': 'python',
        'Java': 'java',
        'C++': 'cpp',
        'Ruby': 'ruby',
        // Add other languages as needed
    };

    // Ensure code is a string before calling replace
    const formattedCode = Array.isArray(code) ? code.join('\n') : code; // Join array elements with newlines

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" onClick={closeModal}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-auto w-11/12 md:w-1/2 lg:w-1/2 xl:w-1/3 p-6 overflow-y-auto max-h-screen" onClick={handleModalClick}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500">
                        &times;
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-300">{description}</p>
                </div>

                {/* Code Section */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">{language}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg border-2 border-gray-300 dark:border-gray-600">
                        {/* SyntaxHighlighter with language map */}
                        <SyntaxHighlighter className="max-h-60 overflow-scroll" language={languageMap[language] || 'text'} style={docco}>
                            {formattedCode}
                        </SyntaxHighlighter>
                    </div>
                </div>

                {/* Rest of the Information */}
                <div className="mb-4 flex">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Complexity:&nbsp;</span>
                    <p className="text-gray-600 dark:text-gray-300">{complexity}</p>
                </div>

                {/* Examples Section */}
                <div className="mb-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Example:</span>
                    {examples.map((example, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-gray-600 dark:text-gray-300"><strong>Input:</strong> {example.input}</p>
                            <p className="text-gray-600 dark:text-gray-300"><strong>Output:</strong> {example.output}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-4 flex">
                    <span className="font-semibold text-gray-700 dark:text-gray-200">Contributed by&nbsp;</span>
                    <a className="text-gray-600 dark:text-gray-300" href={`https://github.com/` + contributor} target='__blank'>@{contributor}</a>
                </div>

                {/* Tags Section */}
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
