import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { createBoard } from './actions';



function CreateBoard(props) {



        return (
            <div>
                <form onSubmit = { e => {
                    e.preventDefault()
                    props.onClick(e)
                  }}>
                  <input placeholder = "Add Board Title" name = "board"></input>
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
