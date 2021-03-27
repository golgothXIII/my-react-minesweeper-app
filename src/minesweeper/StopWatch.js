import React, { useState } from 'react'
import store from '../store'
import Digit from './Digit'
import stopwatchImage from './images/stopwatch.svg'



const Stopwatch = () => {

  const timerState = store.getState().timer
  const [stopwatch, setStopwatch] = useState(0)
  setTimeout( () => { 
  if( timerState.isRunning ) {
    setStopwatch(stopwatch + 1 )
    store.dispatch( {
      type: 'SET_TIMER',
      payload: { stopwatch }
    })    
    } else if (timerState.value !== 0 && stopwatch !== 0) {
      setStopwatch(0)
    }
  }, 1000)
    
  return (
    <div>
      <img src={stopwatchImage} alt="icon chronometre" height="37px" />
      <Digit
        digit= { stopwatch > 999  ? parseInt( stopwatch.toString().substr(-4,1), 10 ) : 0 }
        isColored= {false}
        useBlankForZero= {true}
      />
      <Digit 
        digit= { stopwatch > 99  ? parseInt( stopwatch.toString().substr(-3,1), 10 ) : 0}
        isColored= {false}
        useBlankForZero= {false}
      />
      <Digit 
        digit= {stopwatch > 9  ? parseInt( stopwatch.toString().substr(-2,1), 10 ) : 0}
        isColored= {false}
        useBlankForZero= {false}
      />
      <Digit 
        digit= {parseInt( stopwatch.toString().substr(-1,1), 10 )}
        isColored= {false}
        useBlankForZero= {false}
      />
    </div>
  )
}

export default Stopwatch
