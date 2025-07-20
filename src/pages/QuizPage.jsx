import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

// This is our Mock AI function. It returns a hardcoded quiz.
const generateQuizFromNotes = (notesContent) => {
  console.log("Generating quiz from:", notesContent); // You can see the notes data in the console
  return {
    title: "Quiz based on your notes",
    questions: [
      {
        question: "What is a Stack?",
        options: [
          "A LIFO data structure",
          "A FIFO data structure",
          "A type of tree",
          "A sorting algorithm",
        ],
        correctAnswer: 0,
      },
      {
        question: "Which of these is a real application for a Queue?",
        options: [
          "Balancing parentheses",
          "CPU scheduling",
          "Reversing a string",
          "Topological sorting",
        ],
        correctAnswer: 1,
      },
      {
        question: "What does LIFO stand for?",
        options: [
          "Last-In, First-Out",
          "First-In, Last-Out",
          "Last-In, Fast-Out",
          "List-In, File-Out",
        ],
        correctAnswer: 0,
      },
    ],
  };
};

const QuizPage = () => {
  const { moduleId } = useParams();
  const location = useLocation();
  const { notesContent } = location.state || { notesContent: [] };

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const generatedQuiz = generateQuizFromNotes(notesContent);
    setQuiz(generatedQuiz);
  }, [notesContent]);

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    if (optionIndex === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1000); // Wait 1 second before moving to the next question
  };

  if (!quiz) {
    return (
      <div className="text-white text-center p-10">Generating your quiz...</div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#1a202c] text-white flex flex-col justify-center items-center p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#2d3748] p-8 rounded-lg text-center shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-6">
            Your Score: <span className="text-blue-400 font-bold">{score}</span>{" "}
            / {quiz.questions.length}
          </p>
          <Link
            to={`/notes/${moduleId}`}
            className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Back to Notes
          </Link>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#1a202c] text-white flex flex-col justify-center items-center p-4">
      <div className="bg-[#2d3748] p-8 rounded-lg w-full max-w-2xl shadow-lg">
        <p className="text-sm text-gray-400">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
        <h2 className="text-2xl font-semibold my-4">
          {currentQuestion.question}
        </h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            let buttonClass =
              "w-full text-left p-4 rounded-md transition-colors bg-slate-700 hover:bg-slate-600";
            if (selectedAnswer !== null) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += " bg-green-500/50 border border-green-400"; // Correct answer
              } else if (index === selectedAnswer) {
                buttonClass += " bg-red-500/50 border border-red-400"; // Incorrect selection
              }
            }
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={buttonClass}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- THIS LINE IS THE FIX ---
// Make sure this line exists at the end of your file.
export default QuizPage;
