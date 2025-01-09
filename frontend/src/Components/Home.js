import React, { useState } from 'react';
import Footer from './Footer';

function Home() {
    const [selectedConcept, setSelectedConcept] = useState('');
    const dsaConcepts = ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs', 'Sorting', 'Searching'];

    const flashcards = {
        Arrays: ['Flashcard for Arrays 1', 'Flashcard for Arrays 2'],
        'Linked Lists': ['Flashcard for Linked Lists 1', 'Flashcard for Linked Lists 2', 'Flashcard for Linked Lists 3'],
        Stacks: ['Flashcard for Stacks 1', 'Flashcard for Stacks 2'],
        Queues: ['Flashcard for Queues 1', 'Flashcard for Queues 2'],
        Trees: ['Flashcard for Trees 1', 'Flashcard for Trees 2'],
        Graphs: ['Flashcard for Graphs 1', 'Flashcard for Graphs 2'],
        Sorting: ['Flashcard for Sorting 1', 'Flashcard for Sorting 2'],
        Searching: ['Flashcard for Searching 1', 'Flashcard for Searching 2'],
    };

    return (
        <div className="dark:bg-gray-900 p-8 h-screen">
            {/* Catchy Quote Section */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
                    From Basics to Brilliance, <span className="bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text dark:from-pink-300 dark:to-pink-500">
                        One Snippet Away.
                    </span>
                </h2>

                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                    Learn, practice, and excel with bite-sized flashcards designed for quick understanding and retention.
                </p>
            </div>

            {/* Dropdown for DSA Concepts */}
            <div className="text-center mb-8">
                <label htmlFor="dsa-select" className="block text-gray-800 dark:text-white mb-2">
                    Select a DSA Concept:
                </label>
                <select
                    id="dsa-select"
                    className="p-2 border border-gray-300 rounded-md dark:border-gray-600"
                    value={selectedConcept}
                    onChange={(e) => setSelectedConcept(e.target.value)}
                >
                    <option value="">-- Select a Concept --</option>
                    {dsaConcepts.map((concept, index) => (
                        <option key={index} value={concept}>
                            {concept}
                        </option>
                    ))}
                </select>
            </div>

            {/* Flashcards Section */}
            {selectedConcept && (
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-4">
                        Flashcards for {selectedConcept}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {flashcards[selectedConcept].map((flashcard, index) => (
                            <div key={index} className="p-4 bg-white dark:bg-gray-700 rounded-lg drop-shadow-xl">
                                <p className="text-gray-800 dark:text-white">{flashcard}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
