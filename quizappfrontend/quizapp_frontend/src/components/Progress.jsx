import React from 'react'

const Progress = ({username, questionIndex, numQuestions}) => {
    return (
        <header className="progress">
            <progress max={numQuestions} value={questionIndex + 1} />
            <p>
                Question <strong>{questionIndex + 1}</strong> / {numQuestions}
            </p>

            <p>
                Hi, <strong style={{ textTransform: "uppercase" }}>{username}</strong>
            </p>
        </header>
    )
}

export default Progress