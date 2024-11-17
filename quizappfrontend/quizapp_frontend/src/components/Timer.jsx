import React, { useEffect } from 'react'

const Timer = ({ timeRemaining, setTimeRemaining, setLoadingState, submitQuizToApi, studentScore }) => {

    const mins = Math.floor(timeRemaining / 60)
    const secs = timeRemaining % 60

    useEffect(function(){
        const id = setInterval(function(){
            setTimeRemaining(curr => curr - 1)
        }, 1000)

        return () => clearInterval(id)
    }, [])

    if(timeRemaining === 0){
        setLoadingState("finished")
        submitQuizToApi(studentScore)
    }
    
    return (
        <div className='timer'>
            {mins < 10 && "0"}{mins}:{secs < 10 && "0"}{secs}
        </div>
    )
}

export default Timer