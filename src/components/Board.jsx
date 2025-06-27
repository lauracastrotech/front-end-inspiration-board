import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';

const Board = (props) => {
  const { board, cards, onDeleteCard, onLikeCard, onPostCard } = props;

  return (
    <main className="board">
      <h1>{board.title}</h1>
      <NewCardForm onPostCard={onPostCard} boardId={board.id} />
      <CardList
        cards={cards}
        onDeleteCard={onDeleteCard}
        onLikeCard={onLikeCard}
      />
    </main>


// const Board = ({id, title, owner, cards, selectBoard}) => {
//     // add cards to props
//     const handleBoardSelect = (e) => {
//         e.preventDefault();
//         selectBoard(1); //need to fix this
//     };

//     return (
//     <section>
//         <p>{title}&#58; <span>{owner}</span></p>
//         <button onClick={handleBoardSelect}>Select</button>
//     </section>
//     // Container for cards when board is selected? 

  );
};

Board.propTypes = {

  board: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Board;

//   id: PropTypes.number.isRequired,  
//   title: PropTypes.string.isRequired,
//   owner: PropTypes.string.isRequired,
//   selectBoard: PropTypes.func.isRequired,
// };
// export default Board;
