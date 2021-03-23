import React from 'react'

const Minefield = () => {
  return (
    <div
      style= {{
        gridArea: "2 / 1 / 2 / 4",
        display: "grid",
        gridTemplateColumns: "repeat( 10, 1fr)",
        gridTemplateRows: "repeat( 10, 1fr )"
    
      }}
    >
      <div
      style= {{
        backgroundColor: "#504e46",
        border: "#999999 2px",
        borderRadius: "5px",
        borderStyle: "outset"
      }}>u</div>
    </div>
  )
}

export default Minefield
