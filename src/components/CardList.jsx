import PropTypes from 'prop-types';
import '../styles/CardList.css';
import Card from './Card';

const CardList = (props) => {
  const {cards, onDeleteCard, onLikeCard} = props;
  const Cards = () => { 
      return cards.map(card => {
        return (
            <li key={card.id}>
                <Card
                  id={card.id}
                  message={card.message}
                  likesCount={card.likesCount}
                  onLike={onLikeCard}
                  onDelete={onDeleteCard}
                />
            </li>
          );
        });
      };

  return (
    <div>
      <ul className='card_list inline'>
        {cards && <Cards />}
      </ul>
    </div>
  );
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      likesCount: PropTypes.number.isRequired,
      boardId: PropTypes.number.isRequired,
    })
  ).isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardList;