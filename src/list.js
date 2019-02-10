import React from 'react'
import CreateCard from './create-card'
import Card from './card'
import { Draggable } from 'react-beautiful-dnd'



export default function List(props) {

    return (
        <div
            className = 'list'
            { ...props }
            ref = { props.innerRef }
        >
        <h3 className = "list-title" >{ props.list }</h3>
        <CreateCard listId = { props.listId } />

        { props.cards.map((card, index) => {
            if (props.listId === card.list_id) {
                return (
                    <Draggable
                        draggableId = { card.id }
                        index = { index }
                        key = { card.id }
                    >
                        {( provided ) => (
                            <Card
                                innerRef = { provided.innerRef }
                                { ...provided.draggableProps }
                                { ...provided.dragHandleProps }
                                key = { card.id }
                                cardId = { card.id }
                                card = { card.card }
                                index = { index }
                            >
                            <h4>drag me</h4>
                            </Card>
                        )}
                    </Draggable>
                )
            }
        })
    }

        </div>
    )
}
