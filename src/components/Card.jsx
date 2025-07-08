import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = (props) => {

  return (
    <section className="card_item">
      <p className='card_message'>{props.message}</p>
      <div id="style-buttons" className="actions">
        <button 
          id='like-btn'
          className="card_item_like" 
          onClick={() => props.onLike(props.id)}
        >{props.likesCount} 💕</button>
        <button 
          id='delete-btn'
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