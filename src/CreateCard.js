import React from 'react';
import { connect } from "react-redux";
import { createCard } from './actions';
import { Link } from 'react-router-dom';



function CreateCard() {

            return (

                <div>
                    <form onSubmit = { e => {
                        e.preventDefault()
                        props.onCardClick(e)
                    }}>
                        <input placeholder = "Add Card" name = "card"></input>
                        <button>Create Card</button>
                    </form>
                </div>

            ) // END RETURN



} // END COMPONENT



const mapDispatchToProps = dispatch => {
    return {
        onCardClick: e => {
            dispatch(createCard(e.target.querySelector('input[name="card"]').value))
        }
    }
}


export default connect(null, mapDispatchToProps)(CreateCard);
