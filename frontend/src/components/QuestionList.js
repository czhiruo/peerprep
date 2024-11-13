import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { getData, deleteData } from "../services/questionService";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import './QuestionList.css'; // Custom CSS for QuestionList
import { getComplexityColor

 } from '../commons/utils';
const QuestionList = () => {
  const [allQuestions, setAllQuestions] = useState([]); // Original list of questions
  const [displayedQuestions, setDisplayedQuestions] = useState([]); // Filtered list
  const [filters, setFilters] = useState({ difficulty: '', category: '' });
  const navigate = useNavigate();


  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getData("/");
        setAllQuestions(response);
        setDisplayedQuestions(response); // Initially display all questions
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Filter questions based on selected difficulty and category
  const filterQuestions = () => {
    const { difficulty, category } = filters;

    const filtered = allQuestions.filter((question) => {
      const matchesDifficulty = difficulty
        ? question.d.toLowerCase() === difficulty.toLowerCase()
        : true;
      const matchesCategory = category
        ? question.c.some((cat) => cat.toLowerCase().includes(category.toLowerCase()))
        : true;

      return matchesDifficulty && matchesCategory;
    });

    setDisplayedQuestions(filtered);
  };

  // Update filters and refilter questions when inputs change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      return updatedFilters;
    });
  };

  // Refilter questions whenever filters or allQuestions change
  useEffect(() => {
    filterQuestions();
  }, [filters, allQuestions]);

  const deleteQuestion = async (id) => {
    try {
      await deleteData(`/${id}`);
      const updatedAllQuestions = allQuestions.filter((q) => q.id !== id);
      setAllQuestions(updatedAllQuestions);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleQuestionClick = (id) => {
    navigate(`/questions/${id}`);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Question Repository</h2>
      <Link 
        to="/questions/add" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-2xl no-underline">
        Add New Question
      </Link>

      {/* Filter Section */}
      <div className="filter-section mt-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Topic
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              name="category"
              type="text"
              placeholder="Enter topic"
              value={filters.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
              Difficulty Level
            </label>
            <select
              className="shadow block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
              id="difficulty"
              name="difficulty"
              value={filters.difficulty}
              onChange={handleInputChange}
            >
              <option value="">All</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      <Row className='mt-5'>
        {displayedQuestions.map((question) => (
          <Col md={4} key={question.id} className="mb-4">
            <Card className="question-card shadow-sm" onClick={() => handleQuestionClick(question.id)}>
              <Card.Body>
                <div className='font-semibold mb-2 text-xl'>{question.title}</div>
                <div className='mb-3'>
                  {(() => {
                    const { bg, text, ring } = getComplexityColor(question.d);
                    return (
                      <span
                        className={`inline-flex items-center rounded-full ${bg} px-2 py-1 text-xs font-medium ${text} ring-1 ring-inset ${ring}`}
                      >
                        <Cog6ToothIcon className="h-5 w-5 mr-1" /> <span>{question.d}</span>
                      </span>
                    );
                  })()}
                </div>
                <Card.Text><strong>Topics:</strong> {question.c.join(', ')}</Card.Text>
                <div className="d-flex justify-content-between mt-4 mb-2">
                  <Button variant="outline-primary" as={Link} to={`/questions/edit/${question.id}`} onClick={(e) => e.stopPropagation()}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" onClick={(e) => { e.stopPropagation(); deleteQuestion(question.id); }}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuestionList;

