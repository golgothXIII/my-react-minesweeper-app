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

const images = [ zero, one, two, three, four, five, six, seven, eight, nine ]

const Square = ( { id, handleClickReturn, handleContextMenuReturn } ) => {
  const [reRender, setReRender] = useState(1)  
  const myState = store.getState()
  var backgroundColor
  var borderStyle
  var backgroundImage
  if (myState.grid[id].isClicked) {
    backgroundColor = "#615F57"
    borderStyle = "inset"
    backgroundImage = (myState.grid[id].isTrapped) ? `url(${mine})` : `url(${images[myState.grid[id].bombsAround]})`
  } else {
    backgroundColor = "#504e46"
    borderStyle = "outset"
    backgroundImage = (myState.grid[id].isMarked) ? `url(${flag})` : `url()`
  }  

  const handleClick = (event) => {
//    if (! myState.grid[id].isClicked && ! myState.grid[id].isMarked) {
      store.dispatch( {
        type: 'CLICK',
        payload: { id }
        })
      setReRender( -reRender )
//    }
    handleClickReturn(id)
  }
  
  const handleContextMenu = event => {
    event.preventDefault()

    var flagCount = myState.difficulties[myState.difficulty].bombs
    myState.grid.map( square => {
      flagCount -= square.isMarked ? 1 : 0
      return null
    })
  
    if ( ! myState.grid[id].isClicked && ( flagCount > 0 ||  myState.grid[id].isMarked ) ) {
      store.dispatch( {
        type: 'CONTEXT_MENU',
        payload: { id }
      })
    }
    setReRender( -reRender )
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
        backgroundPosition: "center"
      }}
      onClick= {handleClick}
      onContextMenu= {handleContextMenu}
    />
)
}

export default Square
