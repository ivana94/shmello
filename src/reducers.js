import React from 'react';

export default function reducer(state = {}, action) {

////////////////////////////////////////////////////////////////////////////////
/////////////////////////// FRIEND COMPONENT REDUCERS //////////////////////////
////////////////////////////////////////////////////////////////////////////////

    // PUT LOGGED IN USER INFO INTO REDUX STORE
    if (action.type == 'GET_USER_INFO') {
        state = {
            ...state,
            user: action.user,
            createBoardIsVisible: action.createBoardIsVisible,
            boards: action.boards
         };
    }




    // TOGGLE CREATE BOARD MODAL ON CLICK
    if (action.type == 'SHOW_CREATE_BOARD_MODAL') {
        state = { ...state, createBoardIsVisible: action.createBoardIsVisible };
    }



    if (action.type == 'CREATE_BOARD') {
      if (state.boards.length) {
        state = { ...state, boards: state.boards.concat( action.newBoard ) };
      } else {
        state = { ...state, boards: [ action.newBoard ] };
      }
    }



    // PUSH USER'S NEWEST COMMENT TO STATE
    if (action.type == 'GET_ALL_BOARD_NAMES') {
        state = Object.assign({}, state, { boards: action.boards });
    }









    console.log("I AM STATE IN REDUCER: ", state);
    return state;

}
