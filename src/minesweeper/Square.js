import React, { useState } from 'react'
import zero from './images/zero.svg'
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

const Square = ( { id, trapped, bombsAround, handleClickReturn, handleContextMenuReturn } ) => {
  const [reRender, setReRender] = useState(1)  
  
  var backgroundColor
  var borderStyle
  var backgroundImage
  if (store.getState().grid[id].isClicked) {
    backgroundColor = "#615F57"
    borderStyle = "inset"
    backgroundImage = (store.getState().grid[id].isTrapped) ? `url(${mine})` : `url(${images[store.getState().grid[id].bombsAround]})`
  } else {
    backgroundColor = "#504e46"
    borderStyle = "outset"
    backgroundImage = (store.getState().grid[id].isMarked) ? `url(${flag})` : `url()`
  }  

  const handleClick = (event) => {
    if (! store.getState().grid[id].isClicked && ! store.getState().grid[id].isMarked) {
      store.dispatch( {
        type: 'CLICK',
        payload: { id }
        })
        setReRender( -reRender )
    }
  }
  
  const handleContextMenu = event => {
    event.preventDefault()
    if ( ! store.getState().grid[id].isClicked ) {
      store.dispatch( {
        type: 'CONTEXT_MENU',
        payload: { id }
      })
    }
    setReRender( -reRender )
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
