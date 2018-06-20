import React from 'react';

export default function reducer(state = {}, action) {

////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// BOARD REDUCERS ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

    // PUT LOGGED IN USER INFO INTO REDUX STORE
    if (action.type == 'GET_USER_INFO') {
        state = {
            ...state,
            user: action.user,
            createBoardIsVisible: action.createBoardIsVisible,
            createCardModalIsVisible: action.createCardModalIsVisible,
            createListModalIsVisible: action.createListModalIsVisible,
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


    // DELETE BOARD FROM REDUX STATE
    if (action.type == 'DELETE_BOARD') {
        state = Object.assign({}, state, {
            boards: state.boards.filter(item => action.idOfBoardToDelete != item.id)
        });
    }



    // PUSH USER'S NEWEST COMMENT TO STATE
    if (action.type == 'GET_ALL_BOARD_NAMES') {
        state = Object.assign({}, state, { boards: action.boards });
    }

    if (action.type == "ADD_ID_AND_CARDS_OF_BOARD_TO_STORE") {
        state = {
            ...state,
            idOfCurrentBoard: action.idOfBoard,
            cards: action.cards
        }
    }


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// END BOARD //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////












////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// CARD REDUCERS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




    if (action.type == "SHOW_CREATE_CARD_MODAL") {
        state = {
            ...state,
            createCardModalIsVisible: action.createCardModalIsVisible,
            idOfBoard: action.idOfBoard
        };
    }


    // if (action.type == "CREATE_CARD") {
    //     state = { ...state, card: action.card };
    // }

    if (action.type == 'CREATE_CARD') {
        if (state.cards) {
            state = {
                ...state,
                cards: state.cards.concat( action.newCard ),
                createCardModalIsVisible: action.createCardModalIsVisible
            };
        } else {
            state = {
                ...state,
                cards: [ action.newCard ],
                 createCardModalIsVisible: action.createCardModalIsVisible
            };
        }
    }





    if (action.type == "SHOW_CREATE_LIST_MODAL") {
        state = {
            ...state,
            createListModalIsVisible: action.createListModalIsVisible
        };
    }



////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// END CARD REDUCERS //////////////////////////////
////////////////////////////////////////////////////////////////////////////////







    console.log("I AM STATE IN REDUCER: ", state);
    return state;

}
