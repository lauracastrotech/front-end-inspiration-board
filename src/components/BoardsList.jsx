import Board from "./Board";
import NewBoardForm from "./NewBoardForm";
import BoardView from "./BoardView";


// Container component that holds data about boards?
const BoardsList = ({boards, selectedBoardData, selectBoard, showForm, setShowForm, createBoard}) => {
    const addNewBoard = () => {
        setShowForm(prevShowForm => !prevShowForm);
    };

    const Boards = () => {
        return boards.map( board => {
            return (
                <li key={board.board_id}>
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
        <section>
            <h1>Boards</h1>
            <button onClick={addNewBoard}>New &#43;</button>
            {/* Placeholder to view selected board - */} 

            <BoardView selectedBoardData={selectedBoardData}/>

            <section>
                <ul>
                    {/*Conditional render based on isBoardFormVisible state*/}
                    {showForm && (<NewBoardForm onBoardSubmit={createBoard}/>)}
                    <Boards />
                </ul>
            </section>
        </section>
  );
};

BoardsList.propTypes = {
  // add proptypes here
};

export default BoardsList;