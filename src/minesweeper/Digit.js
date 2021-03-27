import React from 'react'
import blank from './images/blank.svg'
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
import zeroWhite from './images/zeroWhite.svg'
import oneWhite from './images/oneWhite.svg'
import twoWhite from './images/twoWhite.svg'
import threeWhite from './images/threeWhite.svg'
import fourWhite from './images/fourWhite.svg'
import fiveWhite from './images/fiveWhite.svg'
import sixWhite from './images/sixWhite.svg'
import sevenWhite from './images/sevenWhite.svg'
import eightWhite from './images/eightWhite.svg'
import nineWhite from './images/nineWhite.svg'



const Digit = ( { digit, isColored, useBlankForZero, style }) => {

  const images = {
    colored: [ useBlankForZero ? blank : zero, one, two, three, four, five, six, seven, eight, nine ],
    white: [ useBlankForZero ? blank : zeroWhite, oneWhite, twoWhite, threeWhite, fourWhite, fiveWhite, sixWhite, sevenWhite, eightWhite, nineWhite ],
  }
  return (
    <div 
    style= {{
      display: "inline",
    }}>
      <img src={ isColored ? images.colored[digit] : images.white[digit] } alt="chiffre " />
    </div>
  )
}

export default Digit
