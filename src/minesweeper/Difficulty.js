import React, { useState } from 'react'

const Difficulty = ( { difficulties, handleChangeDifficulty }) => {
  const [difficultyChoose, setDifficultyChoose] = useState(0)
  const handleChange = (event) => {
    setDifficultyChoose(event.target.value)
    handleChangeDifficulty(event.target.value)
  }


  return (
    <select 
        id="difficulty"
        value= {difficultyChoose}  
        onChange={handleChange}
    >
      { difficulties.map( (difficulty) => {
          return <option key={Math.random() * 100} value={difficulty.id} >{difficulty.label}</option>
        })}
    </select>
  )
}

export default Difficulty
