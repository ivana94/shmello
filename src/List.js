import React from 'react'
import { connect } from "react-redux";

function List() {


    return (
        <div>
            <h1>List component up!</h1>
        </div>
    )

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(null)(List)
