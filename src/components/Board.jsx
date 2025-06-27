import PropTypes from 'prop-types';

const Board = ({id, title, owner, cards, selectBoard}) => {
    // add cards to props
    const handleBoardSelect = (e) => {
        e.preventDefault();
        selectBoard(id); //need to fix this
    };

    return (
    <section>
        <p>{title}&#58; <span>{owner}</span></p>
        <button onClick={handleBoardSelect}>Select</button>
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