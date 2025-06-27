import { useState } from 'react';
import PropTypes from 'prop-types';
// import './NewBoardForm.css';        

const KDefaultBoardState = {
    title: '',
    owner: '',
    cards: []
};
const NewBoardForm = ({ onCreateBoard }) => {
    const [formData, setFormData] = useState(KDefaultBoardState);

    const handleSubmit = (event) => {
        event.preventDefault();

        onCreateBoard(formData);
        setFormData(KDefaultBoardState);
    };
    
    const handleChange = (event) => {
      const inputName = event.target.name;
      const inputValue = event.target.value;
      setFormData((formData) => ({
        ...formData,
        [inputName]: inputValue,
        }));
    };
    
    return (
        <form className="new_board_form" onSubmit={handleSubmit}>
        <label htmlFor="board_name">Board Name</label>
        <input
            type="text"
            id="board_name"
            name="title"
            value={formData.title}
            onChange={handleChange}
        />
        <label htmlFor="owner_name">Owner Name</label>
        <input
            type="text"
            id="owner_name"
            name="owner"
            value={formData.owner}
            onChange={handleChange}
        />
        <button type="submit" className='create_board_button'>Create Board</button>
        </form>
    );
};

NewBoardForm.propTypes = {
    onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
