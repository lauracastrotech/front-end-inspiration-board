import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';
import BoardView from './components/BoardView';
import axios from 'axios';
import BoardsList from './components/BoardsList';
import SortDropdown from './components/SortDropdown';

const KBaseURL = import.meta.env.VITE_API_BASE_URL;

const convertFromApiBoard = (board) => {
  const { id: boardId, title, owner, cards } = board;
  return { id: boardId, title, owner, cards };
};

const convertFromApiCard = (card) => {
  const { id: cardId, message, likes_count: likesCount, board_id: boardId } = card;
  return { id: cardId, message, likesCount, boardId };
};

const getAllBoardsFromAPI = () => {
  return axios.get(`${KBaseURL}/boards`)
    .then(response => {
      return response.data.map(convertFromApiBoard);
    })
    .catch(error => {
      console.error('Error fetching boards:', error);
    });
};

const addNewBoardAPI = (newBoardData) => {
  return axios.post(`${KBaseURL}/boards`, newBoardData)
    .then(response => {
      console.log("Raw API response for new board:", response.data);
      return convertFromApiBoard(response.data);
    })
    .catch(error => {
      console.error('Error adding new board:', error);
    });
};

const getCardsForBoardAPI = (boardId) => {
  return axios.get(`${KBaseURL}/boards/${boardId}/cards`)
    .then(response => {
      console.log("Raw API response for cards:", response.data);
      return response.data.map(convertFromApiCard);
    })
    .catch(error => {
      console.error('Error fetching cards for board:', error);
    });
};

const addNewCardAPI = (newCardData) => {
  console.log("Posting new card:", newCardData);
  console.log("API URL for new card:", `${KBaseURL}/boards/${newCardData.board_id}/cards`);
  return axios.post(`${KBaseURL}/boards/${newCardData.board_id}/cards`, newCardData)
    .then((response) => {
      
      return convertFromApiCard(response.data);
    })
    .catch((error) => {
        console.error('Error adding new card:', error);
    });
};

const deleteCardAPI = (cardId) => {
  return axios.delete(`${KBaseURL}/cards/${cardId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting card:', error);
    });
};

const likeCardAPI = (cardId) => {
  return axios.put(`${KBaseURL}/cards/${cardId}/likes`)
    .then(response => { 
      console.log("Raw API response for liking card:", response.data); 
      return convertFromApiCard(response.data); 
    })
    .catch(error => {
      console.error('Error liking card:', error);
    });
};

const App = () => {
  const [boardData, setBoardData] = useState([]); // all boards
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cardData, setCardData] = useState([]); // all cards
  const [showForm, setShowForm] = useState(false); // board form
  const [sortOption, setSortOption] = useState(null);

  // Fetch all boards on mount
  const getAllBoards = () => {
    getAllBoardsFromAPI()
      .then((boards) => {
        setBoardData(boards);
      });
  };
  useEffect(() => {
    const response = getAllBoards();
    console.log('this is the response:', response);

    // this returns undefined
  }, []);

  const addBoard = (newBoardData) => {
    return addNewBoardAPI(newBoardData)
      .then((newBoard) => {
        setBoardData((boardData) => {
          return [...boardData, newBoard];
        });
        setShowForm(prevShowForm => !prevShowForm);
      });
  };

  const addCard = (newCardData) => {
    return addNewCardAPI(newCardData)
      .then((newCard) => {
        setCardData((cardData) => {
          return [...cardData, newCard];
        });
      });
  };

  const deleteCard = (cardId) => {
    return deleteCardAPI(cardId)
      .then(() => {
        setCardData((cardData) => {
          return cardData.filter(card => card.id !== cardId);
        });
      });
  };

  const likeCardHandler = (cardId) => {
    return likeCardAPI(cardId)
      .then((updatedCard) => {
        setCardData((cardData) => {
          return cardData.map(card => {
            if (card.id === cardId) {
              return { ...card, likesCount: updatedCard.likesCount };
            } else {
              return card;
            }
          });
        });
      });
  };

  const updateShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSelectBoard = (id) => {
    axios.get(`${KBaseURL}/boards/${id}`)
      .then(response => {
        console.log(response);
        setSelectedBoard(response.data);

        // Return the promise so the next .then gets the cards
        return getCardsForBoardAPI(response.data.id);
      })
      .then(cards => {
        if (sortOption) {
          const sortedCards = [...cards].sort((a, b) => {
            if (a[sortOption.property] > b[sortOption.property]) return 1 * sortOption.order;
            if (a[sortOption.property] < b[sortOption.property]) return -1 * sortOption.order;
            return 0;
          });
          setCardData(sortedCards);
        } else {
          setCardData(cards);
          console.log('These are the cards:', cards);
        }
      })
      // .then(cards => {
      //   setCardData(cards);
      //   console.log('These are the cards:', cards);
      // })
      .catch(error => {
        console.error('Error fetching board or cards:', error);
      });
  };
  
  const handleSortChange = (e) => {
    const selected = e.target.value === '' ? null : sortOptions.find(opt => opt.title === e.target.value);
    setSortOption(selected);
    if (selected && cardData.length > 0) {
      const sorted = [...cardData].sort((a, b) => {
        if (a[selected.property] > b[selected.property]) return 1 * selected.order;
        if (a[selected.property] < b[selected.property]) return -1 * selected.order;
        return 0;
      });
      setCardData(sorted);
    }
  };
  
  const sortOptions = [
    { title: 'ID (Ascending)', property: 'id', order: 1 },
    { title: 'ID (Descending)', property: 'id', order: -1 },
    { title: 'Message (A → Z)', property: 'message', order: 1 },
    { title: 'Message (Z → A)', property: 'message', order: -1 },
    { title: 'Likes (Low → High)', property: 'likesCount', order: 1 },
    { title: 'Likes (High → Low)', property: 'likesCount', order: -1 },
  ];

  return (
    <div className="app">
      <h1>Inspiration Board</h1>
      <SortDropdown options={sortOptions} onChange={handleSortChange} />
      <div className="boards-list">
        <BoardsList 
          boards={boardData}
          selectedBoard={selectedBoard}
          cardDataState={cardData}
          onSelectBoard={handleSelectBoard}
          onDeleteCard={deleteCard}
          onLikeCard={likeCardHandler}
          onPostCard={addCard}
          showBoardForm={showForm}
          updateShowForm={updateShowForm}
          addNewBoard={addBoard}
        />
      </div>
    </div>
  );
};

export default App;
