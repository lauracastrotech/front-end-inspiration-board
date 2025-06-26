import { useState } from 'react'
import './App.css'
import BoardsList from './components/BoardsList'

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL
const dummyBoardsData = [
  {
    'board_id': 1,
    'title': 'inspiring board',
    'owner': 'Laura',
    'cards': []
  }
]
function App() {
    const [boardsData, setBoardsData] = useState(dummyBoardsData);
    const [selectedBoard, setSelectedBoard] = useState({});
    const [showBoardForm, setShowBoardForm] = useState(false);

    const onBoardSelect = (id) => {
        // use id to get board - axios get
        // set the selectedBoard to the board i get from request
        // <CardsList boardId={id}>
    };
    const addNewBoard = () => {};

  return (
    <>
      <h1>Inspiration Board</h1>
      <div id="flex-boards-list">
        < BoardsList boards={boardsData} selectBoard={onBoardSelect} showForm={showBoardForm} createBoard={addNewBoard}/>
      </div>
    </>
  )
}

export default App
