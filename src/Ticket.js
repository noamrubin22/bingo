import React from 'react';
import "./Ticket.css";

const Ticket = (props) => {
    const ticket = props.ticket;
    return (
        <div className={props.isWon ? "ticket win" : ticket.checked ? "ticket active" : "ticket" } onClick={() => props.onClick()}>
            <p>{ticket.ticket}</p> 
        </div>
    )
}

export default Ticket;