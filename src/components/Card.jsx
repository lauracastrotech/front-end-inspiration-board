import PropTypes from 'prop-types';
import './Card.css';

// Card component to display a message and like count, 
// with a button to like the message, and count how many times it has been liked, 
// and a delete button to delete the card
import axios from 'axios';

const likeCard = (cardId) => {
    return axios.put(`{BaseURL}/cards/{cardId}/likes`)
    .then((response) => response.data)
    .catch((error) => {
        console.error('Error liking card:', error);
        throw error;
    }); 
};

const deleteCard = (cardId) => {
    return axios.delete(`{BaseURL}/cards/${cardId}`)
    .then((response) => { 
        return response.data;
    })
    .catch((error) => {
        console.error('Error deleting card:', error);
    });
};

const Card = (props) => {

  return (
    <section className="card_item">
      <p>{props.message}</p>
      <div className="actions">
        <button 
          className="card_item_like" 
          onClick={() => props.onLike(props.id)}
        >{props.likesCount}💕</button>
        <button 
          className="card_item_delete" 
          onClick={() => props.onDelete(props.id)}
        >Delete</button>
      </div>
    </section>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card; 