import React, { useEffect, useState } from 'react'
import store from '../store'
import Minefield from './Minefield'
import Modal from './Modal'
import Dashboard from './Dashboard'

const Gameboard = () => {
  // function return screen size
  const getMinSide = () => {
    //remove margin and the height of the menu board
    const width = window.innerWidth - 40
    const height = window.innerHeight - (40 + 100)
    return Math.min(width, height)
  }

  const [sideOfMinefield, setSideOfMinefield] = useState(getMinSide)
  const [reRender, setReRender] = useState(1)  
  const handleChangeDifficulty = (difficulty) => {
    setReRender(-reRender)
  }
  
  //hook for automatic resizing
  useEffect(() => {
    // when resizing screen update de sideOfMineField
    window.addEventListener('resize', () => { setSideOfMinefield(getMinSide)})
    // remove hook
    return () => { window.removeEventListener('resize', () => { setSideOfMinefield(getMinSide)}) }
  })

  const handleClick = () => {
    setReRender(-reRender)
  }
  const handleClickNewGame = () => {
    store.dispatch( {
      type: 'INIT_MINEFIELD',
      payload: { difficulty: store.getState().minefield.difficulty }
    })
    setReRender(-reRender)

  }
  return (
    <>
    <div
      style= {{
        width: sideOfMinefield + "px",
        height: ( sideOfMinefield + 100 ) + "px",
        minWidth: "200px",
        margin: "20px",
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "100px 1fr"      }}>
      <Dashboard 
        handleChangeDifficulty= {handleChangeDifficulty}
      />
      <Minefield 
        handleClickReturn = {handleClick}
        handleContextMenuReturn= { handleClick }
      />
    { store.getState().minefield.result !== 0  ? <Modal handleClick={ handleClickNewGame } /> : null }
    </div>
    </>
  )
}

export default Gameboard