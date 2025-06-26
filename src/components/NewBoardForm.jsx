import { useState } from 'react';
import PropTypes from 'prop-types';
// import './NewBoardForm.css';        

const NewBoardForm = ({ onCreateBoard }) => {
    const [boardName, setBoardName] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (boardName.trim()) {
        onCreateBoard(boardName);
        setBoardName('');
        }
    };
    
    const handleChange = (event) => {
        setBoardName(event.target.value);
    };
    
    return (
        <form className="new_board_form" onSubmit={handleSubmit}>
        <label htmlFor="board_name">Board Name</label>
        <input
            type="text"
            id="board_name"
            name="board_name"
            value={boardName}
            onChange={handleChange}
            required
        />
        <button type="submit" className='create_board_button'>Create Board</button>
        </form>
    );
};

NewBoardForm.propTypes = {
    onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
