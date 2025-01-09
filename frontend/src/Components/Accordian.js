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
          <span>{title}</span>
          <svg
            className={`w-3 h-3 transition-transform ${
              isOpen ? 'rotate-180' : ''
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
        title="What is Flowbite?"
        content={
          <div>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out this guide to learn how to{' '}
              <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">
                get started
              </a>{' '}
              and start developing websites even faster with components on top of Tailwind CSS.
            </p>
          </div>
        }
      />
      <AccordionItem
        title="Is there a Figma file available?"
        content={
          <div>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the{' '}
              <a href="https://flowbite.com/figma/" className="text-blue-600 dark:text-blue-500 hover:underline">
                Figma design system
              </a>{' '}
              based on the utility classes from Tailwind CSS and components from Flowbite.
            </p>
          </div>
        }
      />
      <AccordionItem
        title="What are the differences between Flowbite and Tailwind UI?"
        content={
          <div>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Learn more about these technologies:
            </p>
            <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
              <li>
                <a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">
                  Flowbite Pro
                </a>
              </li>
              <li>
                <a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">
                  Tailwind UI
                </a>
              </li>
            </ul>
          </div>
        }
      />
    </div>
  );
};

export default Accordion;
