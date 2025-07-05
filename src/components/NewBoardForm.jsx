import { useState } from 'react';
import PropTypes from 'prop-types';
import "../styles/NewBoardForm.css";

const KDefaultBoardState = {
    title: '',
    owner: '',
    cards: []
};
const NewBoardForm = ({ onBoardSubmit }) => {
    const [formData, setFormData] = useState(KDefaultBoardState);
    const [errorData, setErrorData] = useState('');

    const validateInput = (title, owner) => {
        if (!title || !owner) {
            return 'All fields are required';
        }
        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const error = validateInput(formData.title, formData.owner);
        if (error) {
            setErrorData(error);
            return;
        }

        setErrorData('');
        onBoardSubmit(formData);
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

    const makeControlledInput = (inputName) => {
      return (<input 
        onChange={handleChange} 
        type='text' 
        id={`input-${inputName}`}
        name={inputName}
        value={formData[inputName]}
        className={errorData ? 'error' : ''}
        />
      );
  };

    return (
        <div id='form-container'>
            <form className="board-form" onSubmit={handleSubmit}>
                <div className='input-style board-section'>
                    <label htmlFor="title">Board Name</label>
                    { makeControlledInput('title') }
                </div>
                <div className='input-style board-section'>
                    <label htmlFor="owner">Owner Name</label>
                    { makeControlledInput('owner') }
                </div>  
                    { errorData && 
                        <div> 
                            <p className="error_message">{errorData}</p> 
                        </div> 
                    }
                <button type="submit" className='create_board_button'>Create Board</button>
            </form>
        </div>
    );
};

NewBoardForm.propTypes = {
    onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;


