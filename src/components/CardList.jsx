import PropTypes from 'prop-types';
import './CardList.css';
import Card from './Card';

// CardList component to display a list of cards,
// each card contains a message, a like button, total likes and a delete button.

const CardList = (props) => {
  const getCardComponents = props.cards.map((card) => {
    return (
      <li key={card.id}>
        <Card
          id={card.id}
          message={card.message}
          likesCount={card.likesCount}
          onLike={props.onLike}
          onDelete={props.onDelete}
        />
      </li>
    );
  });

  return <ul className='card_list inline'>{getCardComponents}</ul>;
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardList;