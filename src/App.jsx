import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';
import BoardView from './components/BoardView';
import axios from 'axios';
import BoardsList from './components/BoardsList';

const KBaseURL = import.meta.env.VITE_API_BASE_URL;

const convertFromApiBoard = (board) => {
  const { id: boardId, title, owner, cards_count = 0, cards } = board;
  return { id: boardId, title, owner, cards_count, cards };
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
      return convertFromApiBoard(response.data);
    })
    .catch(error => {
      console.error('Error adding new board:', error);
    });
};

const getCardsForBoardAPI = (boardId) => {
  return axios.get(`${KBaseURL}/boards/${boardId}/cards`)
    .then(response => {
      return response.data.map(convertFromApiCard);
    })
    .catch(error => {
      console.error('Error fetching cards for board:', error);
    });
};

const addNewCardAPI = (newCardData) => {
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

  // Fetch all boards on mount
  const getAllBoards = () => {
    getAllBoardsFromAPI()
      .then((boards) => {
        setBoardData(boards);
      });
  };
  useEffect(() => {
    getAllBoards();
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


  const addCard = (boardId, newCardData) => {
    const cardDataWithBoardId = {
    ...newCardData,
    board_id: boardId
    };

    return addNewCardAPI(cardDataWithBoardId)
      .then((newCard) => {
        setSelectedBoard((prevBoard) => {
          if (!prevBoard) return null;
          return {
            ...prevBoard,
            cards: [...(prevBoard.cards || []), newCard],
          };
        });

        setBoardData((prevBoards) =>
          prevBoards.map((board) =>
            board.id === boardId
              ? { ...board, cards_count: (board.cards_count || 0) + 1 }
              : board
          )
        );
        setCardData((prevCardData) => [...prevCardData, newCard]);
      })
      .catch((error) => {
        console.error('Error adding card:', error);
      });
  };


  const deleteCard = (boardId, cardId) => {
    return deleteCardAPI(cardId)
      .then(() => {
        setSelectedBoard((prevBoard) => {
          if (!prevBoard) return null;
          return {
            ...prevBoard,
            cards: (prevBoard.cards || []).filter((card) => card.id !== cardId),
          };
        });

        setBoardData((prevBoards) =>
          prevBoards.map((board) =>
            board.id === boardId
              ? { ...board, cards_count: Math.max(0, (board.cards_count || 1) - 1) }
              : board
          )
        );

        setCardData((prevCardData) =>
          prevCardData.filter(card => card.id !== cardId)
        );
      })
      .catch((error) => {
        console.error('Error deleting card:', error);
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
    setSelectedBoard(null); 
    setCardData([]);
  };

  const handleSelectBoard = (id) => {
    setShowForm(false);
    axios.get(`${KBaseURL}/boards/${id}`)
      .then(response => {
        setSelectedBoard(response.data);

        return getCardsForBoardAPI(response.data.id);
      })
      .then(cards => {
        setCardData(cards);
      })
      .catch(error => {
        console.error('Error fetching board or cards:', error);
      });
  };

  const hideSelectedBoard = () => {
    setCardData([]);      
    setSelectedBoard(null);
    setShowForm(false);
  };
  return (
    <div id="app">
      <h1>Inspiration Board</h1>
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
          onHideSelectedBoard={hideSelectedBoard}
        />
      </div>
    </div>
  );
};

export default App;
