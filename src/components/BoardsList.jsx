import { useState } from "react";
import Board from "./Board";
import NewBoardForm from "./NewBoardForm";

const dummyBoardsData = [
        {
            'board_id': 1,
            'title': 'Inspiring Board',
            'owner': '1st Owner',
            'cards': []
        },
        {
            'board_id': 2,
            'title': 'Very Inspiring Board',
            'owner': '2nd Owner',
            'cards': []
        }
    ];

// Container component that holds data about boards?
const BoardsList = () => {
    const [boardsData, setBoardsData] = useState(dummyBoardsData);
    const [selectedBoard, setSelectedBoard] = useState({})
    const [isBoardFormVisible, setIsBoardFormVisible] = useState(false)

    const onBoardSelect = () => {};
    const addNewBoard = () => {};

    const Boards = () => {
        return boardsData.map( board => {
            return (
                <Board 
                    key={board.board_id}
                    title={board.title} 
                    owner={board.owner} 
                    cards={board.cards}
                    selectBoard={onBoardSelect}
                />

            );
        });
    };

    return (
        <section>
            <h1>Boards</h1>
            {/* Placeholder to view selected board */}
            <ul>
                {/*Conditional render based on isBoardFormVisible state*/}
                <NewBoardForm onBoardSubmit={addNewBoard}/>
                <Boards />
            </ul>
        </section>
  )
}

export default BoardsList;