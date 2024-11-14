import { useNavigate } from "react-router-dom";
import GenerateHintButton from "./GenerateHintButton";
import GenerateApproachButton from "./GenerateApproachButton";
import GenerateSolutionButton from "./GenerateSolutionButton";
import { Cog6ToothIcon, TagIcon } from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";
import { ExitButton } from "./ExitButton";
import { getComplexityColor, getRandomColorSet } from "../commons/utils";

function QuestionDisplay({ language, question }) {
  const navigate = useNavigate();

  return (
      <div className="mt-6 ml-2 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="mb-2 flex items-center">
            <h2 className="text-2xl font-semibold text-white">
              {question.questionTitle}
            </h2>
            {(() => {
              const { bg, text, ring } = getComplexityColor(
                question.questionComplexity
              );
              return (
                <span
                  className={`ml-4 inline-flex items-center rounded-full ${bg} px-2 py-1 text-xs font-medium ${text} ring-1 ring-inset ${ring}`}
                >
                  <Cog6ToothIcon className="h-4 w-4 mr-1" />
                  <span>{question.questionComplexity}</span>
                </span>
              );
            })()}
          </div>
          <ExitButton navigate={navigate}/>
        </div>

            <div className="flex items-center mb-4">
                <span className="text-sm font-medium text-white flex items-center mr-5">
                <TagIcon className="h-5 w-5 mr-2" /> Topics:
                </span>
                <span className="text-sm">
                    {question.questionCategory.map((category, index) => {
                        const { bg, text, ring } = getRandomColorSet();
                        return (
                        <span key={index} 
                            className={`inline-flex items-center rounded-full ${bg} px-2 py-1 text-xs font-medium ${text} ring-1 ring-inset ${ring} mr-2`}
                        >
                            {category}
                        </span>
                        );
                    })}
                </span>
              </div>
              
            <div className="flex gap-3 mb-8">
              <GenerateHintButton />
              <GenerateApproachButton />
              <GenerateSolutionButton 
                language={language} 
                questionDescription={question.questionDescription} 
              />
            </div>
          
            
            <div className="text-white text-sm max-h-[29.5rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <ReactMarkdown>{question.questionDescription}</ReactMarkdown>
            </div>
        </div>
        
    )
}

export default QuestionDisplay;