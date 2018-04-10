import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { toggleCreateBoardModal } from './actions';
import CreateBoard from './CreateBoard';
import { Link } from 'react-router-dom';


class Boards extends React.Component {

    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)

    }




    handleClick() {
      const { createBoardIsVisible } = this.props
      this.props.dispatch(toggleCreateBoardModal(createBoardIsVisible))
    }





    render() {



        let board;
        let listOfUserBoards;

        const { user, newBoard, createBoardIsVisible, boards } = this.props;

        if (!user) {
            return (
                <div className = "loading" >Loading...</div>
            );
        }

        if (boards.length) {
            listOfUserBoards = boards.map((elem, id) => (
                <div className = "current-boards" key = { id } >
                    <Link to = {`/board/${ elem.id }`}>{ elem.board }</Link>
                </div>
            ))
        } else {
            listOfUserBoards = (
                <div>No boards yet...</div>
            )
        }




        if (newBoard) {
                board = newBoard.map((elem, id) => (
                    <div className = "new-board" key = { id } >{ elem.board }</div>
                )
            )
        }

        return (

            <div className = "container">
                <p onClick = { this.handleClick }>toggle me!</p>

                { listOfUserBoards }

                { createBoardIsVisible && <CreateBoard /> }
            </div>

        ) // END RETURN

    }

} // END COMPONENT








const mapStateToProps = state => {
    return {
        user: state.user,
        newBoard: state.newBoard,
        createBoardIsVisible: state.createBoardIsVisible,
        boards: state.boards
    }
}

export default connect(mapStateToProps)(Boards);
