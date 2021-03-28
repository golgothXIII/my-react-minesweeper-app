import React from 'react'
import store from '../store'
import flag from './images/flag.svg'
import Digit from './Digit'

const FlagCount = () => {

  const minefieldState = store.getState().minefield
  const difficultiesState = store.getState().difficulties

  var flagCount = difficultiesState[minefieldState.difficulty].bombs
  minefieldState.grid.map( square => {
    flagCount -= square.isMarked ? 1 : 0
    return null
  })

  return (
    <div>
      <img src={flag} alt="Drapeau" height="37px"/>
      <Digit
        digit= { flagCount > 99  ? parseInt( flagCount.toString().substr(-3,1), 10 ) : 0 }
        isColored= {false}
        useBlankForZero= {true}
        style= {{
        }}    
      />
      <Digit
        digit= { flagCount > 9  ? parseInt( flagCount.toString().substr(-2,1), 10 ) : 0 }
        isColored= {false}
        useBlankForZero= {false}      
      />
      <Digit
        digit= { parseInt( flagCount.toString().substr(-1,1), 10 ) }
        isColored= {false}
        useBlankForZero= {false}      
      />
    </div>
  )
}

export default FlagCount
