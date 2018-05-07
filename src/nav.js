import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";



function Nav(props) {

    if (!props.user) return null;

        return (
            <div>
                <p>{ props.user.first } <span className = "+">+</span></p>
                <a href = "/logout">logout</a>
            </div>
        ) // END RETURN

} // END COMPONENT



const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Nav);
