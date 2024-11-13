import React from 'react';
import { Link } from 'react-router-dom';
import { languageList } from '../commons/constants';

function SelectLanguagePage({ languages, setLanguages }) {
  const languageList = [
    'Python', 'Java', 'Javascript',
    'Typescript', 'C#', 'C', 'C++'
  ];

  const toggleLanguage = (language) => {
    setLanguages((prevSelected) => {
      const newSelected = [...prevSelected];

      if (newSelected.includes(language)) {
        // Deselect the language
        const index = newSelected.indexOf(language);
        newSelected.splice(index, 1);
      } else {
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
              key={language.code}
              className={`btn text-white ${languages.includes(language.code) ? 'border-primary border-2' : 'border-white'} bg-neutral hover:bg-neutral-focus`}
              onClick={() => toggleLanguage(language.code)}
            >
              {language.name}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full">
          <Link to="/complexity" className='flex-grow mr-2'>
            <button className="btn btn-secondary w-full">
              Back
            </button>
          </Link>

          {
            languages.length === 0 ?
              <button className="btn btn-primary flex-grow ml-2" disabled>
                Find Match
              </button> :
              <Link to="/matching" className='flex-grow ml-2'>
                <button className="btn btn-primary w-full">
                  Find Match
                </button>
              </Link>
          }
        </div>
      </main>
    </div>
  );
}

export default SelectLanguagePage;
