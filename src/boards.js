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

    componentDidUpdate(prevProps) {

        if (!this.props.boards || !prevProps.boards) {
            return null
        }

        // if this runs, then there's a new board
        // and its been successfully added to db and redux
        if (prevProps.boards.length + 1 === this.props.boards.length) {
            location.replace(`/board/${ this.props.boards[this.props.boards.length - 1].id }`);
        }
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

                <div className = "sidebar"></div>


                <h3 className = "current-boards-header">Current boards</h3>
                <div className = "boards-container">
                    { listOfUserBoards }
                    <Link to = "#" onClick = { this.handleClick } className = "create-new-board"></Link>
                </div>

                { createBoardIsVisible && <CreateBoard
                    handleClick = { this.handleClick }
                    createBoardIsVisible = { createBoardIsVisible }
                    /> }
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
