import { useState } from "react";
import Board from "./Board";

const dummyBoardsData = [
        {
            'board_id': 1,
            'title': 'Inspiring Board',
            'owner': '1st Owner'
        },
        {
            'board_id': 2,
            'title': 'Very Inspiring Board',
            'owner': '2nd Owner'
        }
    ];

// Container component that holds data about boards?
const BoardsList = () => {
    const [boardsData, setBoardsData] = useState(dummyBoardsData);
    // const [selectedBoard, setSelectedBoard] = useState({})
    // const [isBoardFormVisible, setIsBoardFormVisible] = useState(false)

    const onBoardSelect = () => {};
    const Boards = () => {
        return boardsData.map( board => {
            return (
                <li key={board.id}>
                    <Board title={board.title} owner={board.owner} selectBoard={onBoardSelect}/>
                </li>
            )
        })
    }

    // conditionally render selected board
    return (
        <ul>
            <Boards />
        </ul>
  )
}

export default BoardsList;