import React, { useState } from 'react'
import store from '../store'
import Difficulty from './Difficulty'
import FlagCount from './FlagCount'
import stopWatch from './images/stopwatch.svg'

const ScoreGame = ( { difficulties, handleChangeDifficulty } ) => {

  const [stopWatch, setStopWatch] = useState(0)

  setTimeout( () => { 
    if( store.getState().result === 0 ) {
      setStopWatch(stopWatch + 1)
    }
  }, 1000 )


  return (
    <div
      style= {{
        gridArea: "1 / 1 / 1 / -1",
        border: "2px #AAAAAA ridge",
        borderRadius: "10px",
        backgroundColor: "#393d45",
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
        alignItems: "center"
      }}
    >
      <div style= {{ padding: "5px", verticalAlign: "middle"}}>
        <Difficulty 
          difficulties= {difficulties}
          handleChangeDifficulty= {handleChangeDifficulty}
        />
        </div>
      <FlagCount />
      <div>{stopWatch}</div>
    </div>
  )
}

export default ScoreGame
