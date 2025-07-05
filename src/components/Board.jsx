import PropTypes from 'prop-types';
import CardList from './CardList';
import NewCardForm from './NewCardForm';

const Board = (props) => {
  const { title, owner, id, onDeleteCard, onLikeCard, onPostCard, onSelectBoard } = props;
    const viewBoard = () => {
      onSelectBoard(id);
const Board = ({id, title, owner, cards, selectBoard}) => {
    // add cards to props
    const handleBoardSelect = (e) => {
        e.preventDefault();
        selectBoard(id); //need to fix this
    };

    return (
      <section>
          <h3>{title}</h3>
          <button onClick={handleBoardSelect}>View</button>
          <span>Created by {owner}</span>
      </section>
    // Container for cards when board is selected? 
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
