import Board from "./Board";
import NewBoardForm from "./NewBoardForm";
import BoardView from "./BoardView";
import "../styles/BoardsList.css";
import '../styles/NewBoardForm.css';

const BoardsList = ({boards, cardDataState, updateShowForm, selectedBoard, onSelectBoard, onDeleteCard, onLikeCard, onPostCard, showBoardForm, addNewBoard}) => {

    const Boards = () => {
        return boards.map(board => {
            return (
                <li key={board.id} className="board">
                    <Board 
                        id={board.id}
                        title={board.title} 
                        owner={board.owner} 
                        onSelectBoard={onSelectBoard}
                    />
                </li>
            );
        });
    };

    return (
        <div>
            <section id="all-boards" className="boards-section">
                <h1>Boards</h1>
                <button onClick={updateShowForm} id="new-btn">New</button>
            </section>

            <section className="boards-section">
                <BoardView 
                    selectedBoard={selectedBoard} 
                    onPostCard={onPostCard}
                    cardDataState={cardDataState}
                    onDeleteCard={onDeleteCard}
                    onLikeCard={onLikeCard}/>
            </section>
        
            <section className="boards-section">
                    {showBoardForm && (
                        <div id="show-form-bg">
                            <NewBoardForm onBoardSubmit={addNewBoard}/>
                        </div>
                    )}
                <ul id="boards-list">
                    <Boards />
                </ul>
            </section>
        </div>
        
  );
};

// BoardsList.propTypes = {
  // add proptypes here
// };

export default BoardsList;