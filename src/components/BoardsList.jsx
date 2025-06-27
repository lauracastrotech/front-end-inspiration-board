import Board from "./Board";
import NewBoardForm from "./NewBoardForm";
import BoardView from "./BoardView";
import "../styles/BoardsList.css";
import '../styles/Board.css';
import '../styles/NewBoardForm.css';

// Container component that holds data about boards?
const BoardsList = ({boards, selectedBoardData, selectBoard, showForm, setShowForm, createBoard}) => {
    const addNewBoard = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    const Boards = () => {
        return boards.map( board => {
            return (
                <li key={board.board_id} className="board">
                    <Board 
                        id={board.board_id}
                        title={board.title} 
                        owner={board.owner} 
                        cards={board.cards}
                        selectBoard={selectBoard}
                    />
                </li>

            );
        });
    };

    return (
        <div>
            <section id="all-boards" className="boards-section">
                <h1>Boards</h1>
                <button onClick={addNewBoard} id="new-btn">New</button>
            </section>

            {/* <section className="boards-section"> */}
                {/* Placeholder to view selected board - */} 
                {/* <BoardView selectedBoardData={selectedBoardData}/> */}
            {/* </section> */}

            <section className="boards-section">
                {/*Conditional render based on isBoardFormVisible state*/}
                {showForm && (<NewBoardForm onBoardSubmit={createBoard}/>)}
                <ul id="boards-list">
                    <Boards />
                </ul>
            </section>
        </div>
        
  );
};

BoardsList.propTypes = {
  // add proptypes here
};

export default BoardsList;