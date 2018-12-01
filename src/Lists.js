import React from 'react'
import { connect } from "react-redux";
import CreateCard from './CreateCard'
import { dropList } from './actions'



class Lists extends React.Component {


    constructor(props) {
        super(props)
        this.state = { dragId: null }
    }


    onDragOver(evt) {
        evt.preventDefault()
    }

    onDragStart(evt, id) {
        // store id of item we're dragging in dataTransfer object
        // this ensures that the element being dragged is stored in the event object
        // and is available for use when required.
        // It may be required while dropping on a target.
        evt.dataTransfer.setData("id", id)
        this.setState({ dragId: id })
    }


    onDrop(evt, category) {

        // id of list to move
        let id = evt.dataTransfer.getData('id')
        let i;

        let itemToMove = this.props.lists.filter((list, idx) => {
            if (list.id == id) {
                i = idx
                return list
            }
        })

        itemToMove = itemToMove[0]

        this.props.dispatch(dropList(id, i, itemToMove))

        let filteredList = this.props.lists.filter(list=> {
            if (list.id != id) {
                return list
            }
        })

        filteredList.concat(itemToMove)
        this.setState({ dragId: null })
    }

    onMouseOver() {
        console.log("mouse over!");
    }

    onMouseUp() {
        console.log("************* mouse up!");
    }


    render() {


        if (!this.props.lists) return null


        return (
            <div
                className = 'list-container'
                onDragOver = { ( e => this.onDragOver(e) ) }
                onDrop = { e => this.onDrop(e, 'complete') }
            >

                { this.props.lists && this.props.lists.map(list => {
                        return (
                            <div
                                onDragStart = { e => this.onDragStart(e, list.id) }
                                draggable
                                className = {"list " + ( this.state.dragId === list.id ? "dragging" : "" )}
                                onMouseOver = { this.onMouseOver }
                                onMouseUp = { this.onMouseUp }
                                key = { list.id }
                            >
                                <h3 className = "list-title">{list.list}</h3>
                                <CreateCard listId = { list.id } />
                            { this.props.cards && this.props.cards.map(card => {
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
