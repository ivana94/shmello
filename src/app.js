import React from 'react';
import axios from './axios';
import { userInfo, createNewBoard, toggleCreateBoardModal } from './actions';
import { connect } from "react-redux";
import Boards from './boards';
import Nav from './nav';
import CreateBoard from './CreateBoard';
import SingleBoard from './SingleBoard';
import { BrowserRouter, Link, Route } from 'react-router-dom';




class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};



    }



    componentDidMount() {
      this.props.dispatch(userInfo())
    }




    render() {

        return (

            <BrowserRouter>
                <div>
                    <Nav />

                    <Route exact path = "/" component = { Boards } />
                    <Route exact path = "/board/:id" component = { SingleBoard } />

                </div>
            </BrowserRouter>










        ) // END RETURN

    } // END RENDER

} // END COMPONENT








const mapStateToProps = state => {
    return {
        user: state.user,
        newBoard: state.newBoard,
        createBoardIsVisible: state.createBoardIsVisible,
        boards: state.boards
    }
}

export default connect(mapStateToProps)(App);
