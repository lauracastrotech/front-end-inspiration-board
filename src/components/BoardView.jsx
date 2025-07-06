import NewCardForm from "./NewCardForm";
import CardList from "./CardList";

const BoardView = ({ selectedBoard, onPostCard, onDeleteCard, onLikeCard, cardDataState }) => {
    return (
            <section>
                {
                    selectedBoard && (
                        <> 
                            <button>&lt; All Boards</button>                       
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
