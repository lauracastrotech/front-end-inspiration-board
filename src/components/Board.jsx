import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';

const Board = (props) => {
  const { title, owner, id, onDeleteCard, onLikeCard, onPostCard, onSelectBoard } = props;
    const viewBoard = () => {
      onSelectBoard(id);
    };

    return (
    <section>
        <p>{title}&#58; <span>{owner}</span></p>
        <button onClick={viewBoard}>View</button>
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
