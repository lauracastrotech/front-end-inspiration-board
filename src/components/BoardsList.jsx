import Board from "./Board";
import NewBoardForm from "./NewBoardForm";
import BoardView from "./BoardView";


// Container component that holds data about boards?
const BoardsList = ({boards, selectedBoard, onSelectBoard, onDeleteCard, onLikeCard, onPostCard, onCreateBoard, showBoardForm, addNewBoard}) => {

    const Boards = () => {
        return boards.map( board => {
            return (
                <li key={board.id}>
                    <Board 
                        id={board.id}
                        title={board.title} 
                        owner={board.owner} 
                        cards={board.cards}
                        onSelectBoard={onSelectBoard}
                        onDeleteCard={onDeleteCard}
                        onLikeCard={onLikeCard}
                        onPostCard={onPostCard}
                    />
                </li>

            );
        });
    };

    return (
        <section>
            <h1>Boards</h1>
            <button onClick={addNewBoard}>New &#43;</button>
            {/* Placeholder to view selected board - */} 

            <BoardView viewingBoard={selectedBoard}/>

            <section>
                <ul>
                    {/*Conditional render based on isBoardFormVisible state*/}
                    {showBoardForm && (<NewBoardForm onBoardSubmit={onCreateBoard}/>)}
                    <Boards />
                </ul>
            </section>
        </section>
  );
};

// BoardsList.propTypes = {
  // add proptypes here
// };

export default BoardsList;