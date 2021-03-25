import { createStore } from 'redux'

const difficulties = [
  { label: "Facile", grid: {x: 10, y: 10}, bombs: 10 },
  { label: "Moyen", grid: {x: 15, y: 15}, bombs: 30 },
  { label: "Difficile", grid: {x: 20, y: 20}, bombs: 80 },
  { label: "Diabolique", grid: {x: 25, y: 25}, bombs: 150 },
]

const minefield = ( state = { difficulty: 0, width: 0, height: 0, grid: [], difficulties }, action ) => {
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
        grid: [...squares],
        difficulties
      }


      case 'CLICK' :
        state.grid[action.payload.id].isClicked = ! state.grid[action.payload.id].isClicked
        return { ...state }
      case 'CONTEXT_MENU' :
        state.grid[action.payload.id].isMarked = ! state.grid[action.payload.id].isMarked
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
