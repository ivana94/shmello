import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { toggleCreateBoardModal, deleteBoard } from './actions';
import CreateBoard from './CreateBoard';




function SingleBoard(props) {
    const idOfBoard = props.match.params.id
    
    if (!props.boards) return null;

    let nameOfBoard = props.boards.map(item => {
        if (item.id == idOfBoard) return item.board
    })


        return (

            <div className = "container">
                <button onClick = { () => props.onClick(idOfBoard) } className = "delete-board-button">delete this board</button>
                <h1>{ nameOfBoard }</h1>
            </div>

        ) // END RETURN



} // END COMPONENT








const mapStateToProps = state => {
    return {
        boards: state.boards
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClick: idOfBoard => {
          dispatch(deleteBoard(idOfBoard))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard);
