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






////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// END BOARDS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////












////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// CARDS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// TOGGLE THE ADD CARD MODAL ON CLICK
export const toggleCreateCard = createCardModalIsVisible => {

    return {
        type: "SHOW_CREATE_CARD_MODAL",
        createCardModalIsVisible: !createCardModalIsVisible
    };

};


export const createCard = () => {

    console.log("yo!");

    return {
        type: "CREATE_CARD",
    };

};







////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// END CARDS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
