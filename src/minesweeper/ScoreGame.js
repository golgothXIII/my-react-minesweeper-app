import React from 'react'
import Difficulty from './Difficulty'

const ScoreGame = () => {
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
      <div style= {{ padding: "5px", verticalAlign: "middle"}}><Difficulty /></div>
      <div style= {{ border: "1px white solid"}} ></div>
      <div style= {{ border: "1px white solid"}} ></div>
    </div>
  )
}

export default ScoreGame
