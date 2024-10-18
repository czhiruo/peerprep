import React, { useState } from 'react';

function SelectTopicPage() {

  const topics = [
    "Strings", "Algorithms", "Data Structures",
    "Bit Manipulation", "Recursion", "Databases", "Brainteaser"
  ];

  // Define an array of colors
  const colors = [
    'bg-info', 'bg-success', 'bg-warning'
  ];

  // State to track selected topics and their colors
  const [selectedTopics, setSelectedTopics] = useState({});

  const toggleTopic = (topic) => {
    setSelectedTopics((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (newSelected[topic]) {
        // Deselect the topic
        delete newSelected[topic];
      } else {
        // Select the topic and randomly assign a color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
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
          {topics.map((topic) => (
            <div
              key={topic}
              className={`btn border pt-2 text-white ${selectedTopics[topic] || 'bg-neutral'} hover:bg-neutral-focus`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full">
          <button className="btn btn-secondary">
            Back
          </button>
          <button className="btn btn-primary">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectTopicPage;
