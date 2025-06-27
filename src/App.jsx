import { useState } from 'react';
import './App.css';
import BoardsList from './components/BoardsList';
import axios from 'axios';

const VITE_APP_BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
const dummyBoardsData = [
  {
    'board_id': 1,
    'title': 'inspiring board',
    'owner': 'Laura',
    'cards': [{'card_id':1,'message': 'hello', 'likes_count': 2}]
  }
]
function App() {
    const [boardsData, setBoardsData] = useState(dummyBoardsData);
    const [selectedBoard, setSelectedBoard] = useState({});
    const [showBoardForm, setShowBoardForm] = useState(false);

    const onBoardSelect = (id) => {
      axios.get(`${VITE_APP_BACKEND_URL}/${id}`)
        .then((response) => {
          setSelectedBoard(response.data);
        });
      // get board by id
      // update selectedBoard state
      // <CardsList boardId={id}>? - the cards list only shows when a board is selected, right? if so then we can create another updater fundtion that has an id param
    };
    const addNewBoard = () => {};

  return (
    <>
      <h1>Inspiration Board</h1>
      <div id="flex-boards-list">
        < BoardsList boards={boardsData} selectedBoardData={selectedBoard} selectBoard={onBoardSelect} showForm={showBoardForm} createBoard={addNewBoard}/>
      </div>
    </>
  )
}

export default App
