import React from 'react';
import axios from './axios';
import { userInfo, createNewBoard, toggleCreateBoardModal } from './actions';
import { connect } from "react-redux";
import Boards from './boards';
import Nav from './nav';
import CreateBoard from './CreateBoard';



class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};

        this.handleClick = this.handleClick.bind(this)

    }

    handleClick() {
      const { createBoardIsVisible } = this.props
      this.props.dispatch(toggleCreateBoardModal(createBoardIsVisible))
    }

    componentDidMount() {
      this.props.dispatch(userInfo())
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
                  { elem.board }
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
                <Nav />
                <Boards />

                { listOfUserBoards }

                { createBoardIsVisible && <CreateBoard /> }
            </div>
        ) // END RETURN

    } // END RENDER

} // END COMPONENT








const mapStateToProps = state => {
    console.log("state in map: ", state);
  return {
    user: state.user,
    newBoard: state.newBoard,
    createBoardIsVisible: state.createBoardIsVisible,
    boards: state.boards
  }
}

export default connect(mapStateToProps)(App);
