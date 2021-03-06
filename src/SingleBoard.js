import React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import {
    toggleCreateBoardModal,
    deleteBoard,
    toggleCreateCard,
    addIdAndCardsOfBoardToStore,
    toggleCreateList,
    removeBoardId
} from './actions';

import CreateCard from './create-card'
import CreateBoard from './CreateBoard';
import CreateList from './CreateList';
import Lists from './Lists';
import { DragDropContext } from 'react-beautiful-dnd'




class SingleBoard extends React.Component {

    constructor(props) {
        super(props)
    }



    componentDidMount() {
        const idOfBoard = this.props.match.params.id
        this.props.addIdAndCardsOfBoardToStore(idOfBoard)
    }

    componentWillUnmount() {
        this.props.removeBoardId(this.props.idOfCurrentBoard)
    }

    onDragEnd(result) {
        // responsible for updating state SYNC
        // when drag n drop finished
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
                    <div className = "single-board-background"></div>

                    <div className = "single-board-container">
                        <h1>{ nameOfBoard }</h1>
                        <p className = "create-list-p" onClick = { () => toggleCreateListModal(createListModalIsVisible) }>+ create list</p>
                        { createListModalIsVisible && <CreateList />}


                        <DragDropContext onDragEnd = { this.onDragEnd }>
                            <Lists />
                        </DragDropContext>


                        <Link to = "/" onClick = { () => this.props.delete(idOfBoard) } className = "delete-board-button">delete this board</Link>
                    </div>
                </div>

            ) // END RETURN

    }

} // END COMPONENT








const mapStateToProps = state => {
    return {
        boards: state.boards,
        createCardModalIsVisible: state.createCardModalIsVisible,
        createListModalIsVisible: state.createListModalIsVisible,
        idOfCurrentBoard: state.idOfCurrentBoard
    }
}

const mapDispatchToProps = dispatch => {
    return {

        delete: idOfBoard => {
            dispatch(deleteBoard(idOfBoard))
            location.replace("/")
        },

        toggleCreateListModal: createListModalIsVisible => {
            dispatch(toggleCreateList(createListModalIsVisible))
        },

        addIdAndCardsOfBoardToStore: idOfBoard => {
            dispatch(addIdAndCardsOfBoardToStore(idOfBoard))
        },

        removeBoardId: idOfBoard => {
            dispatch(removeBoardId(idOfBoard))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard);
