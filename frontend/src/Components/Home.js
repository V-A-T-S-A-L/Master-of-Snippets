import axios from 'axios';
import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component

function Home() {
    const [selectedConcept, setSelectedConcept] = useState('');
    const [conceptData, setConceptData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        title: '',
        description: '',
        language: '',
        code: '',
        contributor: '',
        tags: [],
        dateAdded: '',
        complexity: '',
        examples: []
    });
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const dsaConcepts = ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Strings', 'Trees', 'Graphs'];

    const fetchData = async (concept) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/concept/${concept.toLowerCase().replace(' ', '')}`);
            setConceptData(response.data.snippets || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleConceptChange = (e) => {
        const concept = e.target.value;
        setSelectedConcept(concept);
        if (concept) {
            fetchData(concept);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const openModal = (data) => {
        setModalData(data);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const filteredData = conceptData.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dark:bg-gray-900 p-8 h-auto min-h-screen">
            <div className="text-center mb-8">
                <h2 className="font-serif text-4xl font-bold text-gray-800 dark:text-white">
                    From Basics to Brilliance, <span className="bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text dark:from-pink-300 dark:to-pink-500">
                        One Snippet Away.
                    </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                    Learn, practice, and excel with bite-sized flashcards designed for quick understanding and retention.
                </p>
            </div>

            <div className="text-center mb-2">
                <label htmlFor="dsa-select" className="block text-gray-800 dark:text-white mb-2">
                    Select a DSA Concept:
                </label>
                <div className="relative inline-block w-64">
                    <select
                        id="dsa-select"
                        className="block w-full px-4 py-2 cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        value={selectedConcept}
                        onChange={handleConceptChange}
                    >
                        <option value="">-- Select a Concept --</option>
                        {dsaConcepts.map((concept, index) => (
                            <option key={index} value={concept}>
                                {concept}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Search Bar */}
            <div className="text-center mb-8 relative">
                <div className="relative inline-flex items-center w-64">
                    <input
                        type="text"
                        className="w-full pl-5 pr-4 py-2 border rounded-lg shadow-md text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-pink-500"
                        placeholder="Filter snippets..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <svg
                        className="absolute right-3 w-6 h-6 text-gray-400 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-width="1"
                            d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"
                        />
                    </svg>
                </div>
            </div>


            {selectedConcept && (
                <div className="mt-8">
                    {/* <h3 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-4">
                        Flashcards for {selectedConcept}
                    </h3> */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredData.map((snippet, index) => (
                            <div
                                key={index}
                                className="p-6 hover:dark:border-gray-400 hover:border-gray-400 transition-transform duration-300 bg-white dark:bg-gray-700 rounded-xl drop-shadow-lg border-2 border-gray-200 dark:border-gray-800 cursor-pointer"
                                onClick={() => openModal(snippet)}
                            >
                                <h4 className="text-lg font-bold text-gray-800 dark:text-white">{snippet.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                title={modalData.title}
                description={modalData.description}
                language={modalData.language}
                code={modalData.code}
                contributor={modalData.contributor}
                tags={modalData.tags}
                dateAdded={modalData.dateAdded}
                complexity={modalData.complexity}
                examples={modalData.examples}
            />
        </div>
    );
}

export default Home;
