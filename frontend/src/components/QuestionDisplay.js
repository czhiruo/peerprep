import { useNavigate } from "react-router-dom";
import GenerateHintButton from "./GenerateHintButton";
import GenerateApproachButton from "./GenerateApproachButton";
import GenerateSolutionButton from "./GenerateSolutionButton";
import {
  Cog6ToothIcon,
  TagIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";

function QuestionDisplay({ language, question, showAIButtons }) {
  const navigate = useNavigate();

  const colorSets = [
    { bg: "bg-blue-100", text: "text-blue-800", ring: "ring-blue-600/10" },
    {
      bg: "bg-purple-100",
      text: "text-purple-800",
      ring: "ring-purple-600/10",
    },
    { bg: "bg-gray-100", text: "text-gray-800", ring: "ring-gray-600/10" },
    {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      ring: "ring-indigo-600/10",
    },
    { bg: "bg-pink-100", text: "text-pink-800", ring: "ring-pink-600/10" },
  ];

  const getRandomColorSet = () =>
    colorSets[Math.floor(Math.random() * colorSets.length)];

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "easy":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          ring: "ring-green-600/10",
        };
      case "medium":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          ring: "ring-yellow-600/10",
        };
      case "hard":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          ring: "ring-red-600/10",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          ring: "ring-gray-600/10",
        };
    }
  };

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
          <div className="flex text-white items-center h-12">
            <div
              className="flex items-center gap-2 px-2 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 my-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeftStartOnRectangleIcon className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              <span className="text-sm pr-2">Leave</span>
            </div>
          </div>
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
              
              {showAIButtons && (
                <div className="flex gap-3 mb-8">
                  <GenerateHintButton />
                  <GenerateApproachButton />
                  <GenerateSolutionButton 
                    language={language} 
                    questionDescription={question.questionDescription} 
                  />
                </div>
              )}
            
            <div className="text-white text-sm max-h-[29.5rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <ReactMarkdown>{question.questionDescription}</ReactMarkdown>
            </div>
        </div>
        
    )
}

export default QuestionDisplay;