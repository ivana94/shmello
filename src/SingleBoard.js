import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { toggleCreateBoardModal } from './actions';
import CreateBoard from './CreateBoard';




function SingleBoard(props) {


    if (!props.boards) return null;


        return (

            <div className = "container">
                <h1>{ props.boards[0].board }</h1>
            </div>

        ) // END RETURN



} // END COMPONENT








const mapStateToProps = state => {
    return {
        user: state.user,
        newBoard: state.newBoard,
        createBoardIsVisible: state.createBoardIsVisible,
        boards: state.boards
    }
}

export default connect(mapStateToProps)(SingleBoard);
