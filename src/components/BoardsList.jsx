import Board from "./Board";
import NewBoardForm from "./NewBoardForm";
import BoardView from "./BoardView";


// Container component that holds data about boards?
const BoardsList = ({boards, cardDataState, updateShowForm, selectedBoard, onSelectBoard, onDeleteCard, onLikeCard, onPostCard, showBoardForm, addNewBoard}) => {

    const Boards = () => {
        return boards.map( board => {
            return (
                <li key={board.id}>
                    <Board 
                        id={board.id}
                        title={board.title} 
                        owner={board.owner} 
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
            <button onClick={updateShowForm}>New &#43;</button>
            {/* Placeholder to view selected board - */} 

            <BoardView selectedBoard={selectedBoard} onPostCard={onPostCard} onDeleteCard={onDeleteCard} onLikeCard={onLikeCard} cardDataState={cardDataState}/>

            <section>
                <ul>
                    {/*Conditional render based on isBoardFormVisible state*/}
                    {showBoardForm && (<NewBoardForm onBoardSubmit={addNewBoard}/>)}
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