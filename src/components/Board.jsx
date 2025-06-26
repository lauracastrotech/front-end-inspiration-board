import PropTypes from 'prop-types';

const Board = ({title, owner, selectBoard}) => {
    // add cards to props
    const handleBoardSelect = () => {
        selectBoard();
    };

    return (
    <li>
        <p>{title}&#58; <span>{owner}</span></p>
        <button onClick={handleBoardSelect}>Select</button>
    </li>
    // Container for cards when board is selected. 
  );
};

Board.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  selectBoard: PropTypes.func.isRequired,
};
export default Board;