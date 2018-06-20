import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';




function Nav(props) {

    if (!props.user) return null;

        return (
            <div className = "nav-div">
                <Link to = '/'><p className = "first-name">{ props.user.first }<span className = "+">+</span></p></Link>
                <a className = "logout" href = "/logout">logout</a>
            </div>
        ) // END RETURN

} // END COMPONENT



const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Nav);
