import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

// NewCardForm component to create a new card with a message
// and a button to submit the form, which calls the onSubmit prop with the message
// Preview of the card as shown below the input when typing in the input field
const addNewCard = (newCardData) => {
    return axios.post(`{BaseURL}/boards/${newCardData.boardId}/cards`, newCardData)
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error adding new card:', error);
    });
};

const KDefaultFormState = {
    message: '',
    likesCount: 0,
    boardId: 0, // Assuming boardId is needed for the card
};
const NewCardForm = (onPostCard) => {
  const [formData, setFormData] = useState(KDefaultFormState);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    onPostCard(formData);
    setFormData(KDefaultFormState);
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
      <label htmlFor="message">Message</label>
      <input
        type="text"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
      />
      <div className="message_preview">Preview
        <span>{formData.message}</span>
      </div>
      <button type="submit" className='add_card_button'>Submit</button>
    </form>
  )
};

NewCardForm.propTypes = {
  onPostCard: PropTypes.func.isRequired,
};
export default NewCardForm;