import NewCardForm from "./NewCardForm";
import CardList from "./CardList";

const BoardView = ({ selectedBoard, onPostCard, onDeleteCard, onLikeCard, cardDataState }) => {
    return (
            <section>
                <button>&lt; All Boards</button>
                {/* <h3>{selectedBoardData[0].title}</h3>
                <h3>{selectedBoardData[0].owner}</h3> */}
                {
                    selectedBoard && (
                        <>                        
                            <NewCardForm 
                                onPostCard={onPostCard} 
                                boardId={selectedBoard.id} /> 
                            <CardList
                                cards={cardDataState}
                                onDeleteCard={onDeleteCard}
                                onLikeCard={onLikeCard}
                            /> 
                        </>
                    )
                }
            </section>
  );
};

export default BoardView;
