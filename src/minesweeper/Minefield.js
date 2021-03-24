import React, { useState } from 'react'
import Square from './Square'

const Minefield = ( { difficulty }) => {

  const [currentDifficulty, setCurrentDifficulty] = useState(difficulty)  
  if (currentDifficulty.id !== difficulty.id) {
    setCurrentDifficulty(difficulty)
//    setMinefield(initMineFieldGrid)
  }

  // Function for init the position of bombs in the minefield
  const initBombs = () => {
    var bombs = []
    for (let i = 0; i < currentDifficulty.bombs; i++) {
      const pos = Math.ceil (Math.random() * currentDifficulty.map.x * currentDifficulty.map.y )
      if ( bombs.indexOf( pos ) === -1) { 
        bombs.push(pos)
      } else {
        i--
      }
    }
   return bombs
  }
  const bombs = initBombs()
  
  const numberBombsAround = ( x, y ) => {
    var bombsAround = 0
    for (var i = x - 1; i <= x + 1; i++){
      for (var j = y - 1; j <= y + 1; j++) {
        if ( i > 0 && j > 0 && i <= currentDifficulty.map.x && j <= currentDifficulty.map.y && ( i !== x || j !== y ) ) {
          // if square is in the grid, we check if the index of array of bombs
          const index = j * currentDifficulty.map.y - currentDifficulty.map.x + i - 1
          bombsAround += bombs.indexOf(index) !== -1 ? 1 : 0
        }
      }
    }
    return bombsAround
  }

  const handleClick = ( index ) => {
    console.log(index)

    var arrayTemp = [...minefield]
    if (arrayTemp[index].isMarked) return
    console.log(arrayTemp[index])
    // arrayTemp = displaySafeSquare( arrayTemp, event.target.id - 1 )
    
    //    setMineFieldGrid( arrayTemp )
  }
  const [flags, setFlags] = useState(0)
  const handleContextMenu = ( index ) => {
//    setFlags(flags + index )
    console.log(flags, index)
  }
    
  // Function to init grid
  const initMineFieldGrid = () => {
    const squares = []
    const uniqueSuffix = Math.floor( Math.random() * Math.pow(2, 16)).toString(16)
    console.log(uniqueSuffix)
    for (var y=1; y<=currentDifficulty.map.y; y++) {
      for (var x = 1; x <= currentDifficulty.map.x; x++) {
        const id = y * currentDifficulty.map.y + -currentDifficulty.map.x + x - 1
        squares.push({
          key: uniqueSuffix + id,
          id,
          pos: {x: x, y: y},
          trapped: bombs.indexOf(id) !== -1 ? true : false,
          bombsAround: numberBombsAround(x, y)
        })
      }
    }
    return squares
  }

  //const [minefield, setMinefield] = useState(initMineFieldGrid)
  var minefield = initMineFieldGrid()

//  console.log( minefield)
  const gridTemplateColumns= `repeat( ${currentDifficulty.map.x}, 1fr)`
  const gridTemplateRows= `repeat( ${currentDifficulty.map.y}, 1fr)`

  return (
    <div
      style= {{
        gridArea: "2 / 1 / 2 / 4",
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows
    
      }}
    >
      { minefield.map ( (square, index) => {
        return <Square
          id={square.id}
          key={square.key}
          pos={square.pos}
          handleClickReturn={handleClick}
          handleContextMenuReturn={handleContextMenu}
          trapped={square.trapped}
          bombsAround={square.bombsAround}
        />
      })}

    </div>
  )
}

export default Minefield
