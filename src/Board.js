import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

function Board() {
  // state for cards
  const [ deckData, setDeckData ] = useState({});
  const [ cardArray, setCardArray ] = useState([]);
  const [ newCard, setNewCard ] = useState(false);

  // call API for the deck of cards
  useEffect(() => {
    async function fetchDeck() {
      const result = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeckData(result.data);
    }
    fetchDeck();
  }, []);
  
  useEffect( () => {
    async function fetchCard() {
      const result = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=1`
      );
      // add new card to cardArray
      setCardArray(cardArray => [...cardArray, result.data.cards[0]]);
      // update cards remaining count on deckData
      setDeckData(deckData => ({...deckData, remaining: result.data.remaining}));
    }
    if ( newCard ) {
      fetchCard();
      setNewCard(false);
    }
  }, [deckData, setCardArray, setNewCard, newCard]);

  const handleClick = () => {
    setNewCard(true);
  }

  const renderCards = () => {

    return (
      cardArray.map(card => (
        <Card
          card={card}
          key={card.code} />
      ))
    )
  }

  return (
    <div>
      <button onClick={handleClick} >Get a card!</button>
      {parseInt(deckData.remaining) === 0 ? <h3>No more cards!</h3> :
        <div>
          <p>Remaining cards: {deckData.remaining}</p>
          {renderCards()}
        </div>
      }
    </div>
  );
}

export default Board;