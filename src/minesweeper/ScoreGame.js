import React from 'react'
import Difficulty from './Difficulty'
import FlagCount from './FlagCount'

const ScoreGame = ( { difficulties, handleChangeDifficulty } ) => {

  return (
    <div
      style= {{
        gridArea: "1 / 1 / 1 / -1",
        border: "2px #AAAAAA ridge",
        borderRadius: "10px",
        backgroundColor: "#393d45",
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr"
      }}
    >
      <div style= {{ padding: "5px", verticalAlign: "middle"}}>
        <Difficulty 
          difficulties= {difficulties}
          handleChangeDifficulty= {handleChangeDifficulty}
        />
        </div>
      <FlagCount />
      <div>time</div>
    </div>
  )
}

export default ScoreGame
