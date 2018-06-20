import React from 'react';
import { connect } from "react-redux";

import {
    toggleCreateBoardModal,
    deleteBoard,
    toggleCreateCard,
    addIdAndCardsOfBoardToStore,
    toggleCreateList
} from './actions';

import CreateCard from './CreateCard'
import Cards from './Cards'
import { Link } from 'react-router-dom';
import CreateBoard from './CreateBoard';
import List from './List';



class SingleBoard extends React.Component {

    constructor(props) {
        super(props)
    }



    componentDidMount() {
        const idOfBoard = this.props.match.params.id
        this.props.addIdAndCardsOfBoardToStore(idOfBoard)
    }



    render() {


        const { createCardModalIsVisible, createListModalIsVisible, toggleCreateCardModal, toggleCreateListModal } = this.props
        const idOfBoard = this.props.match.params.id

        if (!this.props.boards) return null;

        let nameOfBoard = this.props.boards.map(item => {
            if (item.id == idOfBoard) return item.board
        })



            return (

                <div className = "container">
                    <Link to = "/" onClick = { () => this.props.delete(idOfBoard) } className = "delete-board-button">delete this board</Link>
                    <h1>{ nameOfBoard }</h1>
                    <p onClick = { () => toggleCreateCardModal(createCardModalIsVisible) }>click to create card</p>
                    <p onClick = { () => toggleCreateListModal(createListModalIsVisible) }>click to create list</p>

                    <Cards />
                    { createListModalIsVisible && <List />}
                    { createCardModalIsVisible && <CreateCard /> }
                </div>

            ) // END RETURN

    }

} // END COMPONENT








const mapStateToProps = state => {
    return {
        boards: state.boards,
        createCardModalIsVisible: state.createCardModalIsVisible,
        createListModalIsVisible: state.createListModalIsVisible
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

        toggleCreateListModal: createListModalIsVisible => {
            dispatch(toggleCreateList(createListModalIsVisible))
        },

        addIdAndCardsOfBoardToStore: idOfBoard => {
            dispatch(addIdAndCardsOfBoardToStore(idOfBoard))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard);
