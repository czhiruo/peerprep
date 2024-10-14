import React, { useState } from 'react';

function SelectLanguagePage() {
  const languages = [
      'Python', 'Java', 'Javascript',
      'Typescript', 'C#', 'C', 'C++'
  ];
    
  // Define an array of colors
  const colors = [
    'bg-info', 'bg-success', 'bg-warning'
  ];
    
  // State to track selected languages and their colors
  const [selectedLanguages, setSelectedLanguages] = useState({});
    
  const toggleLanguage = (language) => {
        setSelectedLanguages((prevSelected) => {
          const newSelected = { ...prevSelected };
    
          if (newSelected[language]) {
            // Deselect the language
            delete newSelected[language];
          } else {
            // Select the language and randomly assign a color
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            newSelected[language] = randomColor;
          }
    
          return newSelected;
        });
      };
    
  return (
    <div className="min-h-[calc(100vh-65px)] w-full bg-[#1a1a1a] flex flex-col justify-center items-center">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center gap-14">
        <h1 className="text-white text-[40px] font-bold">Select Language(s)</h1>

        {/* Language Options */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {languages.map((language) => (
            <div
              key={language}
              className={`btn border pt-2 text-white ${selectedLanguages[language] || 'bg-neutral'} hover:bg-neutral-focus`}
              onClick={() => toggleLanguage(language)}
            >
              {language}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full">
          <button className="btn btn-secondary">
            Back
          </button>
          <button className="btn btn-primary">
            Find Match
          </button>
        </div>
      </main>
    </div>
  );
}

export default SelectLanguagePage;
