import React, { useState } from 'react'
import Difficulty from './Difficulty'
import FlagCount from './FlagCount'
import Stopwatch from './Stopwatch'

const Dashboard = ( { difficulties, handleChangeDifficulty } ) => {

  return (
    <div
      style= {{
        gridArea: "1 / 1 / 1 / -1",
        border: "2px #AAAAAA ridge",
        borderRadius: "10px",
        backgroundColor: "#393d45",
        display: "grid",
        gridTemplateColumns: "minmax(100px, 1fr) minmax(150px, 3fr) minmax(130px, 1fr)",
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
      <Stopwatch />
    </div>
  )
}

export default Dashboard
