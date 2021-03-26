import { act } from 'react-dom/test-utils'
import { createStore } from 'redux'

const difficulties = [
  { label: "Facile", grid: {x: 10, y: 10}, bombs: 10 },
  { label: "Moyen", grid: {x: 15, y: 15}, bombs: 30 },
  { label: "Difficile", grid: {x: 20, y: 20}, bombs: 80 },
  { label: "Diabolique", grid: {x: 25, y: 25}, bombs: 150 },
]

const minefield = ( state = { difficulty: 0, width: 0, height: 0, grid: [], difficulties }, action ) => {
  // Function return if the player win
  // we win if the number of boxes clicked plus the number of boxes marked is equal to the total number of boxes.
  const isWin = () => {
    var countSquarre = 0
    state.grid.map( ( square ) => {
      countSquarre += square.isClicked ? 1 : square.isMarked ? 1 : 0
      return 0
    })
    return ( countSquarre === state.width * state.height ) ? true : false
  }

  switch(action.type) {
    /* case where the user change difficulty and for init
       PAYLOAD :
        - difficulty : numbers refere id difficulties
    */
    case 'UPDATE_DIFFICULTY' :
      // the new difficulty
      const thisDifficulty = state.difficulties[action.payload.difficulty]
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
        difficulty: action.payload.difficulty,
        width: thisDifficulty.grid.x,
        height: thisDifficulty.grid.y,
        result: 0,
        stopWatch: false,
        grid: [...squares],
        difficulties
      }
    case 'CLICK' :
      if (state.result !== 0) {
        return state
      }
      // if the squarre is trapped it's the end of game
      if (state.grid[action.payload.id].isTrapped && ! state.grid[action.payload.id].isMarked) {
          state.result = -1
          state.stopWatch = false
          state.grid[action.payload.id].isClicked = true
          return { ...state }
      }

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
              if ( i > 0 && j > 0 && i <= state.width && j <= state.height && ( i !== x || j !== y ) ) {
                grid = spreadClick(j * state.height + ( -state.width + i ) -1 , grid )
            }
          }
        }
        return grid
      }
      spreadClick(action.payload.id, state.grid)
      state.stopWatch = true

      if ( isWin() ) {
        state.result = 1
        state.stopWatch = false
      }

      return { ...state }

      case 'CONTEXT_MENU' :
      state.grid[action.payload.id].isMarked = ! state.grid[action.payload.id].isMarked
      if ( isWin() ) {
        state.result = 1
        state.stopWatch = false
      }
      return { ...state }

    default:
      return state
  }
}

const store = createStore(minefield)

store.subscribe( () =>  {})

// Init the minefield to easy mode
store.dispatch( {
  type: 'UPDATE_DIFFICULTY',
  payload: { difficulty: 0 }
})

export default store
