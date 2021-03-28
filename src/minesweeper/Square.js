import React, { useState } from 'react'
import zero from './images/blank.svg'
import one from './images/one.svg'
import two from './images/two.svg'
import three from './images/three.svg'
import four from './images/four.svg'
import five from './images/five.svg'
import six from './images/six.svg'
import seven from './images/seven.svg'
import eight from './images/eight.svg'
import nine from './images/nine.svg'
import mine from './images/mine.svg'
import flag from './images/flag.svg'
import store from '../store'
import Digit from './Digit'

const images = [ zero, one, two, three, four, five, six, seven, eight, nine ]

const Square = ( { id, handleClickReturn, handleContextMenuReturn } ) => {
  const minefieldState = store.getState().minefield
  const difficultiesState = store.getState().difficulties
  var backgroundColor
  var borderStyle
  var backgroundImage

  
  if (minefieldState.grid[id].isClicked) {
    backgroundColor = "#615F57"
    borderStyle = "inset"
    backgroundImage = (minefieldState.grid[id].isTrapped) ? `url(${mine})` : `url(${images[minefieldState.grid[id].bombsAround]})`
  } else {
    backgroundColor = "#504e46"
    borderStyle = "outset"
    backgroundImage = (minefieldState.grid[id].isMarked) ? `url(${flag})` : `url()`
  }  

  const handleClick = (event) => {
    store.dispatch( {
      type: 'CLICK',
      payload: { id }
      })
    handleClickReturn()
  }
  
  const handleContextMenu = event => {
    event.preventDefault()

    var flagCount = difficultiesState[minefieldState.difficulty].bombs
    minefieldState.grid.map( square => {
      flagCount -= square.isMarked ? 1 : 0
      return null
    })
  
    if ( ! minefieldState.grid[id].isClicked && ( flagCount > 0 ||  minefieldState.grid[id].isMarked ) ) {
      store.dispatch( {
        type: 'CONTEXT_MENU',
        payload: { id }
      })
    }
    handleContextMenuReturn(id)
  }

  return (
    <div
      id= {id}
      style= {{
        backgroundColor,
        border: "#999999 2px",
        borderStyle,
        borderRadius: "5px",
        backgroundImage,
        backgroundSize: "50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onClick= {handleClick}
      onContextMenu= {handleContextMenu}
    />
)
}

export default Square
