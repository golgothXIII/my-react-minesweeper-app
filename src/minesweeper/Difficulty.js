import React from 'react'

const Difficulty = () => {
  return (
    <select 
        id="difficulty"
        
    >
      <option key="125" value="1" >Facile</option>
      <option key="126" value="2" >Moyen</option>
      <option key="127" value="3" >Difficile</option>
      <option key="128" value="4" >Demoniaque</option>
    </select>
  )
}

export default Difficulty
