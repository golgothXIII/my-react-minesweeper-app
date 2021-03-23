import React, { useEffect, useState } from 'react'
import Minefield from './Minefield'
import ScoreGame from './ScoreGame'

// function return 
const getMinSide = () => {
  //remove margin and the height of the menu board
  const width = window.innerWidth - 40
  const height = window.innerHeight - (40 + 100)
  return Math.min(width, height)
}



const Gameboard = () => {
  
  const [sideOfMinefield, setSideOfMinefield] = useState(getMinSide)



  //hook for automatic resizing
  useEffect(() => {
    // when resizing screen update de sideOfMineField
    window.addEventListener('resize', () => { setSideOfMinefield(getMinSide)})
    // remove hook
    return () => { window.removeEventListener('resize', () => { setSideOfMinefield(getMinSide)}) }
  })

  return (
    <div
      style= {{
        width: sideOfMinefield + "px",
        height: ( sideOfMinefield + 100 ) + "px",
        minWidth: "200px",
        margin: "20px",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "100px 1fr"
      }}>
      <ScoreGame />
      <Minefield />
    </div>
  )
}

export default Gameboard
