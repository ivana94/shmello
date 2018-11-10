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


    constructor() {
        super();
    }



    componentDidMount() {
      this.props.dispatch(userInfo())
    }

    componentWillMount() {

    }




    render() {

        return (

            <BrowserRouter>
                <div className = "app">

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
        idOfCurrentBoard: state.idOfCurrentBoard
    }
}

export default connect(null)(App);
