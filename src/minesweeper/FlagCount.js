import React from 'react'
import store from '../store'
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
const FlagCount = () => {


  const myState = store.getState()
  var countFlag = myState.difficulties[myState.difficulty].bombs
  store.getState().grid.map( square => {
    countFlag -= square.isMarked ? 1 : 0
    return null
  })
console.log(countFlag)


  return (
    <div>
      <img src={zero} />
    </div>
  )
}

export default FlagCount
