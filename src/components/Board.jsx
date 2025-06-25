
const Board = ({title, owner, selectBoard}) => {
    
    const handleBoardSelect = () => {
        selectBoard();
    }

    return (
    <div>
        <p>{title}</p>
        <p>{owner}</p>
        <button onClick={handleBoardSelect}>View</button>
    </div>
  )
}

export default Board;