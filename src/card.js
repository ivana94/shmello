import React from 'react';

export default function Card(props) {

    return (

        <div
            className = "card"
            { ...props }
            ref = { props.innerRef }
            >
            <p>{ props.card }</p>
        </div>

    ) // END RETURN

} // END COMPONENT
