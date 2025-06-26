import { useState } from 'react';
import PropTypes from 'prop-types';
// import './Board.css';
import CardList from './CardList';
import NewCardForm from './NewCardForm';

const Board = () => {
  const [cards, setCards] = useState([]);

  const handlePostCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <main className="board">
      <h1>Inspiration Board</h1>
      <NewCardForm onPostCard={handlePostCard} />
      <CardList cards={cards} />
    </main>
  );
};

Board.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Board;
