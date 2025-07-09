import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/NewCardForm.css';

const NewCardForm = ({ onPostCard, boardId }) => {
  const [formData, setFormData] = useState({
    message: '',
    board_id: boardId,
  });
  const [errorData, setErrorData] = useState('');

  const validateMessage = (message) => {
    if (message.trim() === '') {
      return 'Message cannot be empty';
    }
    if (message.length > 40) {
      return 'Message cannot exceed 40 characters';
    }
    return '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const error = validateMessage(formData.message);
    if (error) {
      setErrorData(error);
      return;
    }

    setErrorData('');
    onPostCard(boardId, formData);
    setFormData({
      message: '',
      board_id: boardId,
    });
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
    <form className="new_card_form" onSubmit={handleSubmit}>
      <label htmlFor="message">New Message</label>
      <input
        type="text"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        className={errorData ? 'error' : ''}
      />
      {errorData && <div className="error_message">{errorData}</div>}
      <div className="message_preview">Preview: <span>{formData.message}</span></div>
      <button type="submit" className='add_card_button'>Submit</button>
    </form>
  );
};

NewCardForm.propTypes = {
  onPostCard: PropTypes.func.isRequired,
  boardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default NewCardForm;