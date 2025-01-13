import React, { useState } from 'react';

const AccordionItem = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<h2>
				<button
					type="button"
					className="flex items-center justify-between w-full px-10 py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
					onClick={() => setIsOpen(!isOpen)}
				>
					<span className="text-left">{title}</span>
					<svg
						className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''
							}`}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 5 5 1 1 5"
						/>
					</svg>
				</button>
			</h2>
			{isOpen && (
				<div className="px-10 py-5 border-b border-gray-200 dark:border-gray-700">
					{content}
				</div>
			)}
		</div>
	);
};

const Accordion = () => {
	return (
		<div id="accordion-flush" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
			<AccordionItem
				title={`What is "Master of Snippets"?`}
				content={
					<div>
						<p className="mb-2 text-gray-500 dark:text-gray-400">
							{`"Master of Snippets" is an open-source project designed to provide developers with quick access to essential code snippets for various programming concepts. It aims to bridge the gap between learning and implementing by offering well-organized, easily accessible flashcards for key data structures and algorithms.`}
						</p>
					</div>
				}
			/>
			<AccordionItem
				title={`How can I contribute to "Master of Snippets"?`}
				content={
					<div>
						<p className="mb-2 text-gray-500 dark:text-gray-400">
							{`You can contribute by visiting our GitHub repository. We welcome contributions in the form of new code snippets, improvements to existing content, bug fixes, or even suggestions for new features. Your involvement helps grow and improve the resource for the entire developer community.`}
						</p>
					</div>
				}
			/>
			<AccordionItem
				title={`What features does "Master of Snippets" offer?`}
				content={
					<div>
						<p className="mb-2 text-gray-500 dark:text-gray-400">
							{`"Master of Snippets" offers a user-friendly interface with flashcards for different data structures and algorithms. Users can browse and select topics and view concise and practical code snippets. The platform is designed to help both beginners and experienced developers quickly recall or learn essential programming concepts.`}
						</p>
					</div>
				}
			/>
		</div>
	);
};

export default Accordion;
