import NewCardForm from "./NewCardForm";
import CardList from "./CardList";
import "../styles/BoardView.css";
import { useState, useEffect } from "react";

const BoardView = ({ selectedBoard, onPostCard, onDeleteCard, onLikeCard, cardDataState, onHideSelectedBoard }) => {
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        setSortOption("");
    }, [selectedBoard]);

    const getSortedCards = () => {
        if (sortOption === "alpha") {
            return cardDataState.sort((a, b) => a.message.localeCompare(b.message));
        } else if (sortOption === "likes") {
            return cardDataState.sort((a, b) => b.likesCount - a.likesCount);
        } else if (sortOption === "id") {
            return cardDataState.sort((a, b) => a.id - b.id);
        }
        return cardDataState;
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
            <section>
                {
                    selectedBoard && (
                        <> 
                            <button onClick={onHideSelectedBoard}>&lt; All Boards</button>                       
                            <NewCardForm 
                                onPostCard={onPostCard} 
                                boardId={selectedBoard.id} /> 
                            <label htmlFor="sortOption">Sort Cards By:</label>
                            <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                                <option value="">Default</option>
                                <option value="alpha">Alphabetical</option>
                                <option value="likes">Likes</option>
                                <option value="id">ID</option>
                            </select>
                            <CardList
                                cards={getSortedCards()}
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
