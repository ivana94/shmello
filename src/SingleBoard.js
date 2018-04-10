import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { toggleCreateBoardModal } from './actions';
import CreateBoard from './CreateBoard';




function SingleBoard(props) {


    if (!props.boards) return null;

    const idOfBoard = props.match.params.id

    let singleBoard = props.boards.map(item => {
        if (item.id == idOfBoard) return item.board
    })


        return (

            <div className = "container">
                <h1>{ singleBoard }</h1>
            </div>

        ) // END RETURN



} // END COMPONENT








const mapStateToProps = state => {
    return {
        boards: state.boards
    }
}

export default connect(mapStateToProps)(SingleBoard);
