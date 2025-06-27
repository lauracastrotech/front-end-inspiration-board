import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';

const Board = (props) => {
  const { title, owner, id, cards, onDeleteCard, onLikeCard, onPostCard, onSelectBoard } = props;
    const selectBoard = () => {
      console.log(id);
      onSelectBoard(id);
    };
    return (
    <section>
        <p>{title}&#58; <span>{owner}</span></p>
        <button onClick={selectBoard}>Select</button>
        {/* <NewCardForm onPostCard={onPostCard} boardId={id} />*/}
        <CardList
          cards={cards}
          onDeleteCard={onDeleteCard}
          onLikeCard={onLikeCard}
        /> 
    </section>

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
