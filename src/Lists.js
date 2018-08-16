import React from 'react'
import { connect } from "react-redux";
import CreateCard from './CreateCard'



function Lists(props) {

    if (!props.lists) return null



    return (
        <div>

            { props.lists && props.lists.map(list => {
                    return (
                        <div className = "list" key = { list.id }>
                            <p>{list.list}</p>
                            <CreateCard />
                        </div>
                    )
                })
            }

        </div>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        onListClick: (e, idOfCurrentBoard, createListModalIsVisible) => {
            dispatch(createList(e.target.querySelector('input[name="list"]').value, idOfCurrentBoard, createListModalIsVisible))
        }
    }
}

const mapStateToProps = state => {
    return {
        createListModalIsVisible: state.createListModalIsVisible,
        idOfCurrentBoard: state.idOfCurrentBoard,
        lists: state.lists
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
