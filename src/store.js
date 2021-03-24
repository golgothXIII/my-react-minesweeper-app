import { createStore } from 'redux'

const minefield = ( state = { difficulty: 0, width: 0, height: 0, grid: [] }, action ) => {
  switch(action.type) {
    case 'UPDATE_DIFFICULTY' :
      // create bombs position.
      var bombs = []
      for (let i = 0; i < action.payload.bombs; i++) {
        const pos = Math.ceil (Math.random() * action.payload.size.x * action.payload.size.y )
        if ( bombs.indexOf( pos ) === -1) { 
          bombs.push(pos)
        } else {
          i--
        }
      }
      // Create minefield
      const squares = []
      const suffix = Math.floor( Math.random() * Math.pow(2, 16)).toString(16)
      for (var y=1; y<=action.payload.size.y; y++) {
        for (var x = 1; x <= action.payload.size.x; x++) {
          const id = y * action.payload.size.y + -action.payload.size.x + x - 1

          // init param bombsAround square
          var bombsAround = 0
          for (var i = x - 1; i <= x + 1; i++){
            for (var j = y - 1; j <= y + 1; j++) {
              if ( i > 0 && j > 0 && i <= action.payload.size.x && j <= action.payload.size.y && ( i !== x || j !== y ) ) {
                // if square is in the grid, we check if the index of array of bombs
                const index = j * action.payload.size.y - action.payload.size.x + i - 1
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
        width: action.payload.size.x,
        height: action.payload.size.y,
        grid: [...squares]
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
  payload: {
    difficulty: 0,
    size: { x: 10, y: 10 },
    bombs: 10
  }
})


console.log(store.getState())
export default store
