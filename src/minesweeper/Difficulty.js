import React, { useState } from 'react'
import store from '../store'

const Difficulty = ( { difficulties, handleChangeDifficulty }) => {
  const [difficultyChoose, setDifficultyChoose] = useState(0)
  const handleChange = (event) => {

    console.log(difficulties[event.target.value])
    store.dispatch( {
      type: 'UPDATE_DIFFICULTY',
      payload: {
        difficulty: difficulties[event.target.value].id,
        size: difficulties[event.target.value].grid,
        bombs: difficulties[event.target.value].bombs
      }
    })
    
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
