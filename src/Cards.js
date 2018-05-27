import React from 'react';
import { connect } from "react-redux";
// import { createCard } from './actions';
// import { Link } from 'react-router-dom';



function Cards(props) {

    const listOfCards = props.cards.map(card => {
        return (
            <div className = "card" key = { card.id }>
                <p>{card.card}</p>
            </div>
        )
    })

            return (

                <div>
                    { listOfCards }
                </div>

            ) // END RETURN



} // END COMPONENT


const mapStateToProps = state => {
    return {
        cards: state.cards
    }
}



export default connect(mapStateToProps)(Cards);
