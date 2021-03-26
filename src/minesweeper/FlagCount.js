import React from 'react'
import store from '../store'
import zero from './images/zeroWhite.svg'
import one from './images/oneWhite.svg'
import two from './images/twoWhite.svg'
import three from './images/threeWhite.svg'
import four from './images/fourWhite.svg'
import five from './images/fiveWhite.svg'
import six from './images/sixWhite.svg'
import seven from './images/sevenWhite.svg'
import eight from './images/eightWhite.svg'
import nine from './images/nineWhite.svg'
import flag from './images/flag.svg'

const images = [ zero, one, two, three, four, five, six, seven, eight, nine ]
const FlagCount = () => {


  const myState = store.getState()
  var flagCount = myState.difficulties[myState.difficulty].bombs
  myState.grid.map( square => {
    flagCount -= square.isMarked ? 1 : 0
    return null
  })

  const hundred = flagCount > 99  ? parseInt( flagCount.toString().substr(-3,1), 10 ) : 0
  const ten = flagCount > 9  ? parseInt( flagCount.toString().substr(-2,1), 10 ) : 0 
  const unit = parseInt( flagCount.toString().substr(-1,1), 10 )

  return (
    <div>
      <img src={flag} alt="Drapeau" height="37px"/>&nbsp;&nbsp;
      <img src={images[hundred]} alt="Centaines" />
      <img src={images[ten]} alt="Dizaines" />
      <img src={images[unit]} alt="Unités" />
    </div>
  )
}

export default FlagCount
