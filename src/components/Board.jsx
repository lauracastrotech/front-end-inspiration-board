import PropTypes from 'prop-types';
import '../styles/Board.css';

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
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,  
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  selectBoard: PropTypes.func.isRequired,
};
export default Board;