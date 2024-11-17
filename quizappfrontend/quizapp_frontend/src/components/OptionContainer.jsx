import React from 'react'

const OptionContainer = ({ question,selectedOption, setSelectedOption, setCorrectOption }) => {
    const options = question.options;

    function selectAnswer(index, option){
        setSelectedOption(index)

        if(option.is_correct == true){
            setCorrectOption(index)
        }
    }

    return (
        <div className='options'>
            {options.map((option, index) => (
                <button key={option.id} className={`btn btn-option ${selectedOption === index ? 'answer correct' : ''}`} onClick={() => selectAnswer(index, option)}>{option.option}</button>
            ))}
        </div>
    )
}

export default OptionContainer