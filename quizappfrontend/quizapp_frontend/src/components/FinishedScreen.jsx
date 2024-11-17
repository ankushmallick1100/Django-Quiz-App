import React, { useState, useEffect } from 'react'
import api from '../../api'

const FinishedScreen = ({ studentScore, quizTotalScore, setLoadingState, setQuestionIndex, setSelectedOption, setCorrectOption, setStudentScore, setUsername }) => {

    const [topperUser, setTopperUser] = useState(null)
    const [topperScore, setTopperScore] = useState(0)
    const percentage = (studentScore/quizTotalScore) * 100
    const username = localStorage.getItem('username')

    function restartQuiz(){
        setUsername("")
        setQuestionIndex(0)
        setSelectedOption(null)
        setCorrectOption(null)
        setStudentScore(0)
        setLoadingState("ready")
        localStorage.removeItem("username")
    }

    useEffect(function(){
        api.get("top_scorer/")
        .then((res) => {
            setTopperUser(res.data.username)
            setTopperScore(res.data.score)
        })
        .catch((err) => {
            console.log(err.message)
        })
    },[])

    return (
        <>
            <p className="result">
                <span>🥇</span> Hi <span style={{ textTransform: "uppercase" }}>{username}</span>, you scored{" "}
                <strong>{studentScore}</strong> out of {quizTotalScore} ({percentage}%)
            </p>
            {topperUser == null ? <p className="highscore">There is no topper currently.</p> :<p className="highscore">The top scorer is {topperUser} with {topperScore} points</p>}
            <p className="highscore">(HighScore: 25 points)</p>

            <button className="btn btn-ui" onClick={restartQuiz}>Restart Quiz</button>
        </>
    )
}

export default FinishedScreen