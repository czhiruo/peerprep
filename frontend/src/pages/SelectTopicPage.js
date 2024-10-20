import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SelectTopicPage({ topics, setTopics }) {
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
      const newSelected = { ...prevSelected };

      if (newSelected[topic]) {
        // Deselect the topic
        delete newSelected[topic];
      } else {
        // Select the topic and randomly assign a color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setTopicColor((prevColor) => ({ ...prevColor, [topic]: randomColor }));

        newSelected[topic] = randomColor;
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
              className={`btn border pt-2 text-white ${topics[topic] || 'bg-neutral'} hover:bg-neutral-focus`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full">
          <Link to="/complexity">
            <button className="btn btn-secondary">
              Back
            </button>
          </Link>
          <Link to="/language">
            <button className="btn btn-primary">
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SelectTopicPage;
