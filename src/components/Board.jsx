import PropTypes from 'prop-types';

const Board = (props) => {
  const { title, owner, id, onDeleteCard, onLikeCard, onPostCard, onSelectBoard } = props;
    const viewBoard = () => {
      onSelectBoard(id);
    };
    const handleBoardSelect = (e) => {
        e.preventDefault();
        onSelectBoard(id); //need to fix this
    };

    return (
      <div>
        <section>
          <h3>{title}</h3>
          <button onClick={handleBoardSelect}>View</button>
          <span>Created by {owner}</span>
      </section>
      <section>
          <p>{title}&#58; <span>{owner}</span></p>
          <button onClick={viewBoard}>View</button>
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
