import React from 'react'

const NextButton = ({ selectedOption, setQuestionIndex, setSelectedOption, numQuestions, questionIndex, correctOption, setStudentScore, setLoadingState, submitQuizToApi }) => {

    if(selectedOption === null){
        return null;
    }

    function nextQuestion(){
        setQuestionIndex((curr) => curr + 1)

        if(selectedOption == correctOption){
            setStudentScore((score) => score + 5)
        }

        setSelectedOption(null)
    }

    function submitQuiz(){
        setLoadingState("finished")

        if(selectedOption == correctOption){
            setStudentScore((score) => {
                const updatedScore = score + 5
                submitQuizToApi(updatedScore)

                return updatedScore
            })     
        }
    }

    if(questionIndex === numQuestions - 1){
        return (
            <button className='btn btn-ui' onClick={submitQuiz}>
               Submit Quiz
            </button>
        )
    }

    return (
        <button className='btn btn-ui' onClick={nextQuestion}>
            Next
        </button>
    )
}

export default NextButton