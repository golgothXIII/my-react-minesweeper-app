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

const difficulties = [
  { id: 0, label: "Facile", grid: {x: 10, y: 10}, bombs: 10 },
  { id: 1, label: "Moyen", grid: {x: 15, y: 15}, bombs: 30 },
  { id: 2, label: "Difficile", grid: {x: 20, y: 20}, bombs: 80 },
  { id: 3, label: "Diabolique", grid: {x: 25, y: 25}, bombs: 150 },
]

const Gameboard = () => {
  
  const [sideOfMinefield, setSideOfMinefield] = useState(getMinSide)
  const [currentDifficulty, setCurrentDifficulty] = useState(0)
  const handleChangeDifficulty = (difficulty) => {
    setCurrentDifficulty(difficulty)
  }

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
      <ScoreGame 
        difficulties= {difficulties}
        handleChangeDifficulty= {handleChangeDifficulty}
      />
      <Minefield
        difficulty= {difficulties[currentDifficulty]}
       />
    </div>
  )
}

export default Gameboard
