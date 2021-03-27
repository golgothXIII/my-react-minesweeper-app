import { createStore } from 'redux'

const timerInitialState = { value: 0, isRunning: false}
const minefieldInitialState = { 
  difficulty: 0, 
  width: 0,
  height: 0,
  result: 0,
  grid: []
 }
 const difficulties = [
  { label: "Facile", grid: {x: 10, y: 10}, bombs: 10 },
  { label: "Moyen", grid: {x: 15, y: 15}, bombs: 30 },
  { label: "Difficile", grid: {x: 20, y: 20}, bombs: 80 },
  { label: "Diabolique", grid: {x: 25, y: 25}, bombs: 150 },
]

const gameReducer = ( state = { minefield: minefieldInitialState, difficulties, timer: timerInitialState }, action ) => {
  const minefieldState = state.minefield
  const difficultiesState = state.difficulties
  const timerState = state.timer

  // Function return if the player win
  // we win if the number of boxes clicked plus the number of boxes marked is equal to the total number of boxes.
  const isWin = () => {
    var countSquarre = 0
    minefieldState.grid.map( ( square ) => {
      countSquarre += square.isClicked ? 1 : square.isMarked ? 1 : 0
      return 0
    })
    return ( countSquarre === minefieldState.width * minefieldState.height ) ? true : false
  }

  switch(action.type) {
    /* case where the user change difficulty and for init
       PAYLOAD :
        - difficulty : numbers refere id difficulties
    */
    case 'INIT_MINEFIELD' :
      // the new difficulty
      const thisDifficulty = difficultiesState[action.payload.difficulty]
      // create bombs position.
      var bombs = []
      for (let i = 0; i < thisDifficulty.bombs; i++) {
        const pos = Math.ceil (Math.random() * thisDifficulty.grid.x * thisDifficulty.grid.y )
        if ( bombs.indexOf( pos ) === -1) { 
          bombs.push(pos)
        } else {
          i--
        }
      }
      // Create minefield
      const squares = []
      const suffix = Math.floor( Math.random() * Math.pow(2, 16)).toString(16)
      for (var y=1; y<=thisDifficulty.grid.y; y++) {
        for (var x = 1; x <= thisDifficulty.grid.x; x++) {
          const id = y * thisDifficulty.grid.y + -thisDifficulty.grid.x + x - 1

          // init param bombsAround square
          var bombsAround = 0
          for (var i = x - 1; i <= x + 1; i++){
            for (var j = y - 1; j <= y + 1; j++) {
              if ( i > 0 && j > 0 && i <= thisDifficulty.grid.x && j <= thisDifficulty.grid.y && ( i !== x || j !== y ) ) {
                // if square is in the grid, we check if the index of array of bombs
                const index = j * thisDifficulty.grid.y - thisDifficulty.grid.x + i - 1
                bombsAround += bombs.indexOf(index) !== -1 ? 1 : 0
              }
            }
          }
          squares.push({
            key: suffix + id,
            id,
            pos: {x: x, y: y},
            bombsAround,
            isTrapped: bombs.indexOf(id) !== -1 ? true : false,
            isClicked: false,
            isMarked: false,
          })
        }
      }
      return {
        minefield : {
          difficulty: action.payload.difficulty,
          width: thisDifficulty.grid.x,
          height: thisDifficulty.grid.y,
          result: 0,
          grid: [...squares]
        },
        difficulties: difficultiesState,
        timer: timerState

      }
    case 'CLICK' :

      if (minefieldState.result === 0) {
        // if the squarre is trapped it's the end of game
        if (minefieldState.grid[action.payload.id].isTrapped && ! minefieldState.grid[action.payload.id].isMarked) {
            minefieldState.result = -1
            timerState.isRunning = false
            minefieldState.grid[action.payload.id].isClicked = true
            state = { 
              minefield: minefieldState,
              difficulties: difficultiesState,
              timer: timerState
            }
        } else {

          // Recursive function to propagate the click
          const spreadClick = ( index, grid) => {
            // stop recursivity if the square is allready unveiled or Marqued.
            if (grid[index].isClicked || grid[index].isMarked) return grid

            // unveiled the square 
            grid[index].isClicked = true

            // stop recursivity if the square has at least one bomb around.
            if (grid[index].bombsAround > 0 ) return grid

            // Otherwise, test all the squares around with the same function
            const x = grid[index].pos.x
            const y = grid[index].pos.y
            for (var i = x - 1; i <= x + 1; i++){
              for (var j = y - 1; j <= y + 1; j++) {
                // if square is in the grid, we check if this square is trapped
                  if ( i > 0 && j > 0 && i <= minefieldState.width && j <= minefieldState.height && ( i !== x || j !== y ) ) {
                    grid = spreadClick(j * minefieldState.height + ( -minefieldState.width + i ) -1 , grid )
                }
              }
            }
            return grid
          }
          spreadClick(action.payload.id, minefieldState.grid)

          if ( isWin() ) {
            minefieldState.result = 1
            timerState.isRunning = false
          } else {
            timerState.isRunning = true
          }

          state = { 
            minefield: minefieldState,
            difficulties: difficultiesState,
            timer: timerState
          }
        }
      }
      return state

    case 'CONTEXT_MENU' :
      minefieldState.grid[action.payload.id].isMarked = ! minefieldState.grid[action.payload.id].isMarked
      if ( isWin() ) {
        minefieldState.result = 1
        timerState.isRunning = false
      }
      return { 
        minefield: minefieldState,
        difficulties: difficultiesState,
        timer: timerState
       }

// Timer case
  case 'SET_TIMER' :
    state.timer.value = action.payload
    return state

    default:
      return state
  }
}

const store = createStore(gameReducer)

store.subscribe( () =>  {})

// Init the minefield to easy mode
store.dispatch( {
  type: 'INIT_MINEFIELD',
  payload: { difficulty: 0 }
})

export default store
