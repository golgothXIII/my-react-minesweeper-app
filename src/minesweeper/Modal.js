import React from 'react'
import store from '../store'

const Modal = ( {handleClick} ) => {
  const state = store.getState()

  console.log(state)
  return (
    <div
      style= {{
        display: "grid",
        backgroundColor: "rgba(85, 85, 85, 0)",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000,
        alignItems: "center"
      }}
    >
      <div
        style= {{
          height: "150px",
          backgroundColor: " rgba(0,0,0,0.7)",
          borderRadius: "50px",
        }}
      >
        <p>{state.minefield.result === 1 ? "Vous avez gagné" : "Dommage vous avez perdu"}</p>
        <button
          onClick={handleClick}
        >Nouvelle partie</button>
      </div>
    </div>
  )
}

export default Modal
