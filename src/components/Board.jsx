import PropTypes from 'prop-types';
import '../styles/Board.css';

const Board = (props) => {
  const { title, owner, id, onSelectBoard } = props;
    const viewBoard = () => {
      onSelectBoard(id);
    };

    return (
      <div className='board-item'>
        <section id='board-title-owner'>
          <h3>{title}</h3>
          <span>Created by {owner}</span>
        </section>
        <section>
            <button id='board-btn' onClick={viewBoard}><img src='/icon-visible.png' alt='button to select a board'/></button>
        </section>
    </div>
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
