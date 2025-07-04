import { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './components/CardList.jsx';
import NewCardForm from './components/NewCardForm.jsx';
import NewBoardForm from './components/NewBoardForm.jsx';
import Board from './components/Board.jsx';

const App = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAddBoardForm, setShowAddBoardForm] = useState(false);
  const baseURL = 'http://127.0.0.1:5000';

  // Fetch all boards on initial load
  useEffect(() => {
    axios.get(`${baseURL}/boards`)
      .then((response) => {
        setBoards(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(<p className="text_error">Error loading boards.</p>);
      });
  }, []);


  const handleBoardSelect = (board) => {
    console.log("Fetching cards for board ID:", board.board_id);
    setErrorMessage('');
    // Fetch cards for this board:
    axios.get(`${baseURL}/boards/${board.board_id}/cards`)
      .then((response) => {
        // Updates the State with all the fresh Cards details just received from the backend
        setSelectedBoard(response.data);
        // Hides the Board_form
        setShowAddBoardForm(false);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(<p className="text_error">Error loading boards.</p>);
        setSelectedBoard(null);
      });
  };

  const addBoard = (newBoardData) => {
    setErrorMessage('');
    axios.post(`${baseURL}/boards`, newBoardData)
      .then((response) => {
        const newlyCreatedBoard = response.data.board;
        setBoards((prevBoards) => [newlyCreatedBoard, ...prevBoards]);
        setSelectedBoard(newlyCreatedBoard);
        setShowAddBoardForm(false);
      })
      .catch((error) => {
        console.error("Error creating board:", error);
        setErrorMessage(<p className="text_error">Error loading boards.</p>);
      });
  };


  // Adds a new card to selected board
  const addCard = (boardId, newCard) => {
    axios.post(`${baseURL}/boards/${boardId}/cards`, newCard)
      .then((response) => {
        const newCard = response.data.card;
        setSelectedBoard((prevBoard) => {
          if (!prevBoard) return null;
          return {
            ...prevBoard,
            cards: [...(prevBoard.cards || []), newCard],
          };
        });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(<p className="text_error">Error loading boards.</p>);
      });
  };

  const deleteBoard = (boardId) => {
    setErrorMessage('');
    axios.delete(`${baseURL}/boards/${boardId}`)
      .then(() => {
        setBoards((prevBoards) => prevBoards.filter((board) => board.board_id !== boardId));
        if (selectedBoard && selectedBoard.board_id === boardId) {
          setSelectedBoard(null);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(<p className="text_error">Error loading boards.</p>);
      });
  };


  const deleteCard = (cardId) => {
    setErrorMessage('');
    axios.delete(`${baseURL}/cards/${cardId}`)
      .then(() => {
        setSelectedBoard((prevBoard) => {
          if (!prevBoard) return null;
          return {
            ...prevBoard,
            cards: (prevBoard.cards || []).filter((card) => card.card_id !== cardId),
          };
        });
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
        setErrorMessage(<p className="text_error">Error loading boards.</p>);
      });
  };

return (
    <div className="bigbox">
      <h1>Inspiration Board</h1>
      {errorMessage}

      <button
        onClick={() => setShowAddBoardForm(true)}
        className="button1"
      >
        ➕ Add New Board
      </button>

      <div>
        <h2>Your Boards</h2>
        <div>
          {showAddBoardForm && (
            <div>
              <NewBoardForm onBoardSubmit={addBoard} />
            </div>
          )}
          {boards.length === 0 && !showAddBoardForm ? (
            <p >No boards available. Click "Add New Board"</p>
          ) : (
            boards.map((board) => {
              if (selectedBoard && selectedBoard.board_id === board.board_id) {
                return (
                  <Board
                    key={board.board_id}
                    board={selectedBoard}
                    onAddCard={addCard}
                    onDeleteCard={deleteCard}
                  />
                );
              } else {
                return (
                  <div
                    key={board.board_id}
                    className={`board-item
                    ${selectedBoard && selectedBoard.board_id === board.board_id ? 'bg' : 'bg-gray'}
                    `}
                  >
                    <div onClick={() => handleBoardSelect(board)}>
                      <h3>{board.title}</h3>
                      <p>Owner: {board.owner}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBoard(board.board_id);
                      }}
                      aria-label={`Delete board ${board.title}`}
                      className="ml-4"
                      title="Delete board"
                    >
                      &times;
                    </button>
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
