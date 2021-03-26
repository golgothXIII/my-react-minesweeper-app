import React, { useState } from 'react'
import store from '../store'
import Digit from './Digit'



const StopWatch = () => {
  const [stopWatch, setStopWatch] = useState(0)

  setTimeout( () => { 
    if( store.getState().stopWatch ) {
      setStopWatch(stopWatch + 1)
    }
  }, 1000 )




  return (
    <div>
    <Digit
      digit= { stopWatch > 999  ? parseInt( stopWatch.toString().substr(-4,1), 10 ) : 0 }
      isColored= {false}
      useBlankForZero= {true}
    />
    <Digit 
      digit= { stopWatch > 99  ? parseInt( stopWatch.toString().substr(-3,1), 10 ) : 0}
      isColored= {false}
      useBlankForZero= {false}
    />
    <Digit 
      digit= {stopWatch > 9  ? parseInt( stopWatch.toString().substr(-2,1), 10 ) : 0}
      isColored= {false}
      useBlankForZero= {false}
    />
    <Digit 
      digit= {parseInt( stopWatch.toString().substr(-1,1), 10 )}
      isColored= {false}
      useBlankForZero= {false}
    />
    </div>
  )
}

export default StopWatch
