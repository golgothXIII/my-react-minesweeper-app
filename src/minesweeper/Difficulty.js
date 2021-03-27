import React, { useState } from 'react'
import store from '../store'

const Difficulty = ( { handleChangeDifficulty } ) => {
  const [difficultyChoose, setDifficultyChoose] = useState(0)
  const handleChange = (event) => {
    store.dispatch( {
      type: 'INIT_MINEFIELD',
      payload: { difficulty: event.target.value }
    })
    setDifficultyChoose(event.target.value)
    handleChangeDifficulty(event.target.value)
  }


  return (
    <select 
      style= {{
        borderRadius: "10px",
        padding: "5px 20px 5px 20px",
        backgroundColor: "#838179",
      }}
      id="difficulty"
      value= {difficultyChoose}  
      onChange={handleChange}
    >
      { store.getState().difficulties.map( (difficulty, index) => {
        return <option key={Math.random() * 100} value={index} >{difficulty.label}</option>
      })}
    </select>
  )
}

export default Difficulty
