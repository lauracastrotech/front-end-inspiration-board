
const Board = ({title, owner, selectBoard}) => {
    
    const handleBoardSelect = () => {
        selectBoard();
    }

    return (
    <li>
        <p>{title}</p>
        <p>{owner}</p>
        <button onClick={handleBoardSelect}>View</button>
    </li>
  )
}

export default Board;