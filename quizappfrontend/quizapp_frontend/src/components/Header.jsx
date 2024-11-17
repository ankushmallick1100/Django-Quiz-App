import React from 'react'
import { GiBrainstorm } from "react-icons/gi";

const Header = () => {
  return (
    <header className="app-header">
        <GiBrainstorm style={{fontSize: "100px"}}/>
        <h1>Quizophile</h1>
    </header>
  )
}

export default Header