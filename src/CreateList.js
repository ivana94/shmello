import React from 'react';
import { connect } from "react-redux";
import { createCard } from './actions';
import { Link } from 'react-router-dom';
import { createList } from './actions';


function CreateList(props) {

            return (

                <div className = "create-list-container">
                    <form onSubmit = { e => {
                        e.preventDefault()
                        props.onListClick(e, props.idOfCurrentBoard, props.createListModalIsVisible)
                    }}>
                        <input autoComplete = "off" placeholder = "Add List" name = "list"></input>
                        <button>Create List</button>
                    </form>
                </div>

            ) // END RETURN



} // END COMPONENT




const mapDispatchToProps = dispatch => {
    return {
        onListClick: (e, idOfCurrentBoard, createListModalIsVisible) => {
            dispatch(createList(e.target.querySelector('input[name="list"]').value, idOfCurrentBoard, createListModalIsVisible))
        }
    }
}

const mapStateToProps = state => {
    return {
        createListModalIsVisible: state.createListModalIsVisible,
        idOfCurrentBoard: state.idOfCurrentBoard,
        lists: state.lists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateList)
