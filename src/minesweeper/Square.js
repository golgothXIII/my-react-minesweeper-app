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

const images = [ zero, one, two, three, four, five, six, seven, eight, nine ]
const Square = ( { id, trapped, bombsAround } ) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isMarked, setIsMarked] = useState(false)
  const [isTrapped, setIsTrapped] = useState(trapped)
  
  var backgroundColor
  var border
  var borderStyle
  var backgroundImage
  if (isClicked) {
    backgroundColor = "#615F57"
    border = "#999999 2px"
    borderStyle = "inset"
    backgroundImage = (isTrapped) ? `url(${mine})` : `url(${images[bombsAround]})`
  } else {
    backgroundColor = "#504e46"
    border = "#999999 2px"
    borderStyle = "outset"
    backgroundImage = (isMarked) ? `url(${flag})` : `url()`
  }  

  const handleClick = () => {
    if ( ! isMarked ) {
      setIsClicked(true)
    }
  }
  const handleContextMenu = event => {
    event.preventDefault()
    if ( ! isClicked ) {
      setIsMarked(! isMarked)
    }
  }

  return (
    <div
      id= {id}
      style= {{
        backgroundColor,
        border,
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
