import React from 'react'
import store from '../store'
import Square from './Square'

const Minefield = ( { handleClickReturn, handleContextMenuReturn } ) => {

  const minefieldState = store.getState().minefield
  const handleClick = ( id ) => {
    handleClickReturn(id)
  }
  const handleContextMenu = () => {
    handleContextMenuReturn()
  }

  const gridTemplateColumns= `repeat( ${minefieldState.width}, minmax(20px,1fr) )`
  const gridTemplateRows= `repeat( ${minefieldState.height}, minmax(20px,1fr) )`

  return (
    <div
      style= {{
        gridArea: "2 / 1 / 2 / 4",
        display: "grid",
        gridTemplateColumns,
        gridTemplateRows
    
      }}
    >
      { minefieldState.grid.map ( (square, index) => {
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
