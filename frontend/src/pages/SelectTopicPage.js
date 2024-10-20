import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SelectTopicPage({ topics, setTopics }) {
  // Example: {Strings: 'bg-info', Algorithms: 'bg-success'}
  const [topicColor, setTopicColor] = useState({});

  const topicList = [
    "Strings", "Algorithms", "Data Structures",
    "Bit Manipulation", "Recursion", "Databases", "Brainteaser"
  ];

  // Define an array of colors
  const colors = [
    'bg-info', 'bg-success', 'bg-warning'
  ];

  const toggleTopic = (topic) => {
    setTopics((prevSelected) => {
      const newSelected = [...prevSelected];

      if (newSelected.includes(topic)) {
        // Deselect the topic
        const index = newSelected.indexOf(topic);

        newSelected.splice(index, 1);
        setTopicColor((prevColor) => ({ ...prevColor, [topic]: null }));
      } else {
        // Select the topic and randomly assign a color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        setTopicColor((prevColor) => ({ ...prevColor, [topic]: randomColor }));
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
              className={`btn border pt-2 text-white ${topicColor[topic] || 'bg-neutral'} hover:bg-neutral-focus`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Link to="/complexity" className='w-full'>
          <button className="btn btn-primary w-full">
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SelectTopicPage;
