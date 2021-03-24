import React, { useState } from 'react'
import store from '../store'
import Square from './Square'

const Minefield = ( { difficulty }) => {

  const [currentDifficulty, setCurrentDifficulty] = useState(difficulty)  
  if (currentDifficulty.id !== difficulty.id) {
    setCurrentDifficulty(difficulty)
//    setMinefield(initMineFieldGrid)
  }

  const handleClick = () => {}
  const handleContextMenu = () =>{}
  const gridTemplateColumns= `repeat( ${store.getState().width}, 1fr)`
  const gridTemplateRows= `repeat( ${store.getState().height}, 1fr)`

  return (
    <div
      style= {{
        gridArea: "2 / 1 / 2 / 4",
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows
    
      }}
    >
      { store.getState().grid.map ( (square, index) => {
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
