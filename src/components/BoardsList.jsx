import Board from "./Board";
import NewBoardForm from "./NewBoardForm";


// Container component that holds data about boards?
const BoardsList = ({boards, selectBoard, showForm, createBoard}) => {

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
            {/* Placeholder to view selected board - */} 
            <ul>
                {/*Conditional render based on isBoardFormVisible state*/}
                {showForm && (<NewBoardForm onBoardSubmit={createBoard}/>)}
                <Boards />
            </ul>
        </section>
  );
};

BoardsList.propTypes = {
  // add proptypes here
};

export default BoardsList;