import React from 'react';
import { Link } from 'react-router-dom';

function SelectTopicPage({ topics, setTopics }) {
  const topicList = [
    "Strings", "Algorithms", "Data Structures",
    "Bit Manipulation", "Recursion", "Databases", "Brainteaser"
  ];

  const toggleTopic = (topic) => {
    setTopics((prevSelected) => {
      const newSelected = [ ...prevSelected ];

      if (newSelected.includes(topic)) {
        const index = newSelected.indexOf(topic);
        newSelected.splice(index, 1);
      } else {
        newSelected.push(topic);
      }

      return newSelected;
    });
  };

  return (
    <div className="min-h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-start items-center gap-10">
        <div className="text-white text-4xl font-bold text-center leading-tight">
          Select Topic(s)
        </div>

        {/* Topic Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topicList.map((topic) => (
            <div
              key={topic}
              className={`btn text-white ${topics.includes(topic) ? 'border-primary border-2' : 'border-white'} bg-neutral hover:bg-neutral-focus`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </div>
          ))}
        </div>

        <div className="flex justify-between w-full">
          <Link to="/complexity" className='flex-grow mr-2'>
            <button className="btn btn-secondary w-full">
              Back
            </button>
          </Link>
          {
            topics.length === 0 ?
            <button className="btn btn-primary flex-grow ml-2" disabled>
              Next
            </button> :
            <Link to="/language" className='flex-grow ml-2'>
              <button className="btn btn-primary w-full">
                Next
              </button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default SelectTopicPage;
