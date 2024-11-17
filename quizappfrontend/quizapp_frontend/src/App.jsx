import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Loader from './components/Loader'
import Error from './components/Error'
import Main from './components/Main'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import FinishedScreen from './components/FinishedScreen'
import Progress from './components/Progress'
import Footer from './components/Footer'
import Timer from './components/Timer'
import api from '../api'


const App = () => {

  const [loadingState, setLoadingState] = useState("loading")
  const [username, setUsername] = useState(null)
  const [error, setError] = useState(null)
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [correctOption, setCorrectOption] = useState(null)
  const [studentScore, setStudentScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(null)

  const numQuestions = questions.length
  const secondsPerQuestion = 10
  const scorePerQuestion = 5
  const quizTotalScore = numQuestions * scorePerQuestion

  function getQuestion() {
    api.get("questions/")
      .then((res) => {
        // console.log(res.data)
        setQuestions(res.data)
      })
      .catch((err) => {
        // console.log(err.message)
        setError(err.message)
      })
  }

  function reloadPage() {
    setLoadingState("finished")
    getQuestion()
    submitQuizToApi(studentScore)
  }

  function submitQuizToApi(updatedScore) {
    const studentQuiz = {
      username: localStorage.getItem('username'),
      score: updatedScore,
    }

    api.post("submit_quiz/", studentQuiz)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(function () {
    if (localStorage.getItem("username")) {
      return reloadPage()
    }

    api.get("questions/")
      .then((res) => {
        // console.log(res.data)
        setQuestions(res.data)
        setLoadingState("ready")
      })
      .catch((err) => {
        // console.log(err.message)
        setError(err.message)
      })
  }, [])

  // Warning not to reload the page or refresh the browser
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for some browsers to display the warning
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className='app'>
      <Header />
      {/* <h4>Score: {studentScore}</h4> */}
      <Main>
        {loadingState === "loading" && <Loader />}

        {error && <Error error={error} />}

        {loadingState === "ready" && <StartScreen username={username} setUsername={setUsername} numQuestions={numQuestions} setLoadingState={setLoadingState} setTimeRemaining={setTimeRemaining} secondsPerQuestion={secondsPerQuestion} />}

        {loadingState === "active" && (<>
          <Progress username={username} questionIndex={questionIndex} numQuestions={numQuestions} />
          <Question selectedOption={selectedOption} setSelectedOption={setSelectedOption} question={questions[questionIndex]} setCorrectOption={setCorrectOption} />
          <Footer>
            <Timer timeRemaining={timeRemaining} setTimeRemaining={setTimeRemaining} setLoadingState={setLoadingState} submitQuizToApi={submitQuizToApi} studentScore={studentScore} />
            <NextButton selectedOption={selectedOption} setQuestionIndex={setQuestionIndex} setSelectedOption={setSelectedOption} numQuestions={numQuestions} questionIndex={questionIndex} correctOption={correctOption} setStudentScore={setStudentScore} setLoadingState={setLoadingState} submitQuizToApi={submitQuizToApi} />
          </Footer>
        </>)}

        {loadingState === "finished" && <FinishedScreen studentScore={studentScore} quizTotalScore={quizTotalScore} setLoadingState={setLoadingState} setQuestionIndex={setQuestionIndex} setSelectedOption={setSelectedOption} setCorrectOption={setCorrectOption} setStudentScore={setStudentScore} setUsername={setUsername} />}
      </Main>
    </div>
  )
}

export default App
