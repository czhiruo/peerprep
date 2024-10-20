import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SelectLanguagePage( {languages, setLanguages} ) {
  // Example: {Strings: 'bg-info', Algorithms: 'bg-success'}
  const [languageColor, setLanguageColor] = useState({});
  
  const languageList = [
      'Python', 'Java', 'Javascript',
      'Typescript', 'C#', 'C', 'C++'
  ];
    
  // Define an array of colors
  const colors = [
    'bg-info', 'bg-success', 'bg-warning'
  ];
    
  const toggleLanguage = (language) => {
    setLanguages((prevSelected) => {
      const newSelected = [ ...prevSelected ];

      if (newSelected.includes(language)) {
        // Deselect the language
        const index = newSelected.indexOf(language);
        
        newSelected.splice(index, 1);
        setLanguageColor((prevColor) => ({ ...prevColor, [language]: null }));
      } else {
        // Select the language and randomly assign a color
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        setLanguageColor((prevColor) => ({ ...prevColor, [language]: randomColor }));
        newSelected.push(language);
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
          {languageList.map((language) => (
            <div
              key={language}
              className={`btn border pt-2 text-white ${languageColor[language] || 'bg-neutral'} hover:bg-neutral-focus`}
              onClick={() => toggleLanguage(language)}
            >
              {language}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full">
          <Link to="/topic">
            <button className="btn btn-secondary">
              Back
            </button>
          </Link>
          
          <Link to="/matching">
            <button className="btn btn-primary">
              Find Match
            </button>
          </Link>        
        </div>
      </main>
    </div>
  );
}

export default SelectLanguagePage;
