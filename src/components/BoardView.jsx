const BoardView = ({ selectedBoardData }) => {
    console.log(selectedBoardData[0]);
    return (
            <section>
                <button>&lt; All Boards</button>
                <h3>{selectedBoardData[0].title}</h3>
                <h3>{selectedBoardData[0].owner}</h3>
            </section>
  );
};

export default BoardView;
