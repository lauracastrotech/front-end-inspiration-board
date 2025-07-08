import NewCardForm from "./NewCardForm";
import CardList from "./CardList";
import "../styles/BoardView.css";

const BoardView = ({ selectedBoard, onPostCard, onDeleteCard, onLikeCard, cardDataState }) => {
    return (
            <section>
                {
                    selectedBoard && (
                        <> 
                            <button id="go-back-btn">All Boards</button>                       
                            <NewCardForm 
                                onPostCard={onPostCard} 
                                boardId={selectedBoard.id} /> 
                            <div className="board-header">
                                <h2>{selectedBoard.title}</h2>
                                <h6>Created by {selectedBoard.owner}</h6>
                            </div>
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
