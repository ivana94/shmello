import React from 'react';
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
                <div className = "loading" ></div>
            );
        }

        if (boards.length) {
            listOfUserBoards = boards.map((elem, id) => (
                <Link to = {`/board/${ elem.id }`} key = { id }>

                        <div className = "current-boards">
                            { elem.board }
                        </div>
                    </Link>
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

                <div className = "boards-container">
                    { listOfUserBoards }
                </div>

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
