import React from 'react'
import store from '../store'

const Modal = ( {handleClick} ) => {
  return (
    <div
      style= {{
        display: "grid",
        backgroundColor: "rgba(85, 85, 85, 0.5)",
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000,
        alignItems: "center"
      }}
    >
      <div>
        <p>{store.getState().result === 1 ? "Vous avez gagné en xxx secondes" : "Dommage vous avez perdu"}</p>
        <button
          onClick={handleClick}
        >Nouvelle partie</button>
      </div>
    </div>
  )
}

export default Modal
