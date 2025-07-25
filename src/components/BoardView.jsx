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
                            <button id="all-boards-btn" onClick={onHideSelectedBoard}>&lt; All Boards</button>                       
                            <section id='board-title-owner'>
                                <p id="board-title">{selectedBoard.title}</p>
                                <p id="board-owner">Created by {selectedBoard.owner}</p>
                            </section>
                            <NewCardForm 
                                onPostCard={onPostCard} 
                                boardId={selectedBoard.id} /> 
                            <div id="sort-container">
                                <label htmlFor="sortOption">Sort Cards By:</label>
                                <select id="sortOption" value={sortOption} onChange={handleSortChange}>
                                    <option value="">Default</option>
                                    <option value="alpha">Alphabetical</option>
                                    <option value="likes">Likes</option>
                                    <option value="id">ID</option>
                                </select>
                            </div>
                            <CardList
                                cards={getSortedCards()}
                                onDeleteCard={onDeleteCard}
                                onLikeCard={onLikeCard}
                                boardId={selectedBoard.id}
                            /> 
                        </>
                    )
                }
            </section>
    );
};

export default BoardView;
