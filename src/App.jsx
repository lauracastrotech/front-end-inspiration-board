import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board';
import NewBoardForm from './components/NewBoardForm';

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL

// Main App component:
// - Fetches boards from the backend (GET request)
// - Allows creating a new board (POST request)
// - Lets users select a board to display its cards
// - Supports deleting and liking cards, and counting card likes

const createBoard = async (boardName) => {
  const response = await fetch(`${VITE_APP_BACKEND_URL}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: boardName }),
  });
  return response.json();
};

const App = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [cards, setCards] = useState([]);

  // Fetch all boards on mount
  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch(`${VITE_APP_BACKEND_URL}/boards`);
      const data = await response.json();
      setBoards(data);
    };
    fetchBoards();
  }, []);

  // Fetch cards for selected board
  useEffect(() => {
    if (selectedBoard) {
      const fetchCards = async () => {
        const response = await fetch(`${VITE_APP_BACKEND_URL}/boards/${selectedBoard.id}/cards`);
        const data = await response.json();
        setCards(data);
      };
      fetchCards();
    } else {
      setCards([]);
    }
  }, [selectedBoard]);

  const handleCreateBoard = async (boardName) => {
    const newBoard = await createBoard(boardName);
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
  };

  const handleDeleteCard = async (cardId) => {
    await fetch(`${VITE_APP_BACKEND_URL}/cards/${cardId}`, { method: 'DELETE' });
    setCards((prevCards) => prevCards.filter(card => card.id !== cardId));
  };

  const handleLikeCard = async (cardId) => {
    const response = await fetch(`${VITE_APP_BACKEND_URL}/cards/${cardId}/like`, { method: 'PATCH' });
    const updatedCard = await response.json();
    setCards((prevCards) =>
      prevCards.map(card => card.id === cardId ? updatedCard : card)
    );
  };

  return (
    <div className="app">
      <h1>Inspiration Board</h1>
      <NewBoardForm onCreateBoard={handleCreateBoard} />
      <div className="boards-list">
        <h2>Boards</h2>
        <ul>
          {boards.map(board => (
            <li key={board.id}>
              <button onClick={() => handleSelectBoard(board)}>
                {board.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedBoard && (
        <Board
          board={selectedBoard}
          cards={cards}
          onDeleteCard={handleDeleteCard}
          onLikeCard={handleLikeCard}
        />
      )}
    </div>
  );
};

export default App;
