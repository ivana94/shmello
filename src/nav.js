import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';




function Nav(props) {

    if (!props.user) return null;

        return (
            <div className = "nav-div">

                <span className = "icon boards-icon">boards</span>
                <input className = "search-bar" />

                <Link className = "shmello-link" to = '/'>
                    <span className = "shmello-logo"></span>
                </Link>

                <div className = "header-user">
                    <span className = "logout" href = "/logout"></span>
                </div>

            </div>
        ) // END RETURN

} // END COMPONENT



const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Nav);
