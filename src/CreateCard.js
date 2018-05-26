import React from 'react';
import { connect } from "react-redux";
import { createCard } from './actions';
import { Link } from 'react-router-dom';



function CreateCard(props) {

            return (

                <div>
                    <form onSubmit = { e => {
                        e.preventDefault()
                        props.onCardClick(e, props.idOfCurrentBoard, props.userId)
                    }}>
                        <input placeholder = "Add Card" name = "card"></input>
                        <button>Create Card</button>
                    </form>
                </div>

            ) // END RETURN



} // END COMPONENT


const mapStateToProps = state => {
    return {
        idOfCurrentBoard: state.idOfCurrentBoard,
        userId: state.user.id,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onCardClick: (e, idOfCurrentBoard, userId) => {
            dispatch(createCard(e.target.querySelector('input[name="card"]').value, idOfCurrentBoard, userId))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateCard);
