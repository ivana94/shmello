import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";

import {
    toggleCreateBoardModal,
    deleteBoard,
    toggleCreateCard,
    addIdAndCardsOfBoardToStore
} from './actions';

import CreateCard from './CreateCard'
import Cards from './Cards'
import { Link } from 'react-router-dom';
import CreateBoard from './CreateBoard';



class SingleBoard extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const idOfBoard = this.props.match.params.id
        this.props.addIdAndCardsOfBoardToStore(idOfBoard)
    }



    render() {


        const { createCardModalIsVisible } = this.props
        const idOfBoard = this.props.match.params.id

        if (!this.props.boards) return null;

        let nameOfBoard = this.props.boards.map(item => {
            if (item.id == idOfBoard) return item.board
        })



            return (

                <div className = "container">
                    <Link to = "/" onClick = { () => this.props.delete(idOfBoard) } className = "delete-board-button">delete this board</Link>
                    <h1>{ nameOfBoard }</h1>
                    <p onClick = { () => this.props.toggleCreateCardModal(this.props.createCardModalIsVisible) }>click me for a free console log!</p>

                    <Cards />
                    { createCardModalIsVisible && <CreateCard /> }
                </div>

            ) // END RETURN

    }

} // END COMPONENT








const mapStateToProps = state => {
    return {
        boards: state.boards,
        createCardModalIsVisible: state.createCardModalIsVisible
    }
}

const mapDispatchToProps = dispatch => {
    return {

        delete: idOfBoard => {
            dispatch(deleteBoard(idOfBoard))
            location.replace("/")
        },

        toggleCreateCardModal: createCardModalIsVisible => {
            dispatch(toggleCreateCard(createCardModalIsVisible))
        },

        addIdAndCardsOfBoardToStore: idOfBoard => {
            dispatch(addIdAndCardsOfBoardToStore(idOfBoard))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard);
