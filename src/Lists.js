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
                            <CreateCard
                                listId = { list.id }
                            />
                        { props.cards && props.cards.map(card => {
                                if (list.id === card.list_id) {
                                    return (
                                        <div className = "card" key = { card.id }>
                                            <p>{ card.card }</p>
                                        </div>
                                    )
                                }
                            })
                        }
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
        lists: state.lists,
        cards: state.cards,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
