import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { createBoard } from './actions';



function CreateBoard(props) {



        return (
            <div className = "create-board-div">
                <div onClick = { props.handleClick } className = "create-board-overlay"></div>

                <form className = "create-board-form" onSubmit = { e => {
                    e.preventDefault()
                    props.onClick(e)
                }}>
                    <input autocomplete = "off" className = "board-title-input" placeholder = "Add Board Title" name = "board"></input>
                    <button>Create Board</button>
                </form>
            </div>
        ) // END RETURN

} // END COMPONENT



const mapStateToProps = state => {
    return {
        user: state.user
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onClick: e => {
          dispatch(createBoard(e.target.querySelector('input[name="board"]').value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);
