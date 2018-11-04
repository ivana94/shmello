import React from 'react';
import axios from 'axios';



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// BOARDS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////



// GET USER INFO AND PUT IN REDUX STORE
export const userInfo = () => {
    return axios.get('/user').then(({ data }) => {
        return {
          type: "GET_USER_INFO",
          user: data.user,
          createBoardIsVisible: false,
          createCardModalIsVisible: false,
          createListModalIsVisible: false,
          boards: data.boards
      };
    });
};


// TOGGLE THE CREATE BOARD MODAL ON CLICK
export const toggleCreateBoardModal = createBoardIsVisible => {
    return {
        type: "SHOW_CREATE_BOARD_MODAL",
        createBoardIsVisible: !createBoardIsVisible
    };
};




// GET ALL BOARD NAMES FROM DATABASE AND PUSH TO STATE
export const allBoardNames = () => {
    return axios.get('/allBoardNamesFromDatabase/').then(boards => {
        return { type: "GET_ALL_BOARD_NAMES", boards: boards.data.boards };
    });
};


// CREATE BOARD & SEND NEW BOARD TO DB AND REDUX STORE
export const createBoard = newBoard => {
    return axios.post('/createBoard/', { newBoard }).then(newBoard => {
        return { type: "CREATE_BOARD", newBoard: newBoard.data.boards[0] };
    });
};



// DELETE BOARD
export const deleteBoard = idOfBoardToDelete => {
    return axios.post('/delete-board/', { idOfBoardToDelete }).then(({ data }) => {
        return { type: "DELETE_BOARD", idOfBoardToDelete };
    });
};

export const addIdAndCardsOfBoardToStore = idOfBoard => {

    return axios.post("/get-cards", {idOfBoard}).then(({ data }) => {

        return {
            type: "ADD_ID_AND_CARDS_OF_BOARD_TO_STORE",
            idOfBoard,
            cards: data.cards,
            lists: data.lists
        }
    })
}


////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// END BOARDS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////












////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// CARDS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export const createCard = (card, idOfCurrentBoard, userId, createCardModalIsVisible, listId) => {

    const data = {
        card,
        idOfCurrentBoard,
        userId,
        listId
    }

    return axios.post("/create-card", data).then(({ data }) => {
        return {
            type: "CREATE_CARD",
            newCard: data.newCard,
            createCardModalIsVisible: !createCardModalIsVisible
        };
    })
};







////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// END CARDS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

















////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// LIST ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// TOGGLE THE ADD CARD MODAL ON CLICK
export const toggleCreateList = createListModalIsVisible => {

    return {
        type: "SHOW_CREATE_LIST_MODAL",
        createListModalIsVisible: !createListModalIsVisible,
    };

};


export const createList = async (list, idOfCurrentBoard, createListModalIsVisible) => {
    let data = {
        list,
        idOfCurrentBoard
    }

    let resp = await axios.post("/create-list", data)
    let newList = resp.data.results

    return {
        type: "CREATE_LIST",
        createListModalIsVisible: !createListModalIsVisible,
        newList
    };

};
