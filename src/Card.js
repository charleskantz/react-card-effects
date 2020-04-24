import React from "react";

function Card({ card }) {

  const style = {
      position: 'absolute',
      left: '100px',
      top: '100px'
  }

  console.log(card);

  return (
    <div>
      <img style={style} src={card.image} alt={card.code} />
    </div>
  )
}

export default Card;