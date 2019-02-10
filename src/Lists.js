import React from 'react'
import { connect } from "react-redux";
import { dropList } from './actions'
import { Droppable } from 'react-beautiful-dnd'
import List from './list'


class Lists extends React.Component {


    constructor(props) {
        super(props)
        this.state = { dragId: null }
    }



    render() {


        if (!this.props.lists) return null


        return (

                <div
                    className = 'list-container'
                >

                    { this.props.lists && this.props.lists.map(list => {
                            return (
                                <Droppable droppableId = { list.id } key = { list.id }>
                                    { (provided) => (
                                    <List
                                        innerRef = { provided.innerRef }
                                        { ...provided.droppableProps }
                                        className = "list "
                                        key = { list.id }
                                        listId = { list.id }
                                        list = { list.list }
                                        cards = { this.props.cards }
                                    >
                                    { provided.placeholder }
                                </List>
                            )
                        }
                    </Droppable>
                        )
                    })
                }
                </div>

        )
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

export default connect(mapStateToProps)(Lists)
