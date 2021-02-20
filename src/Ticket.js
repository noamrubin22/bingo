import React from 'react';
import "./Ticket.css";

const Ticket = (props) => {
    const {ticket} = props;

    let ticketName;
    
    if (props.index === 12) {
        ticketName = "ticket music";
    } else if (props.isWon) {
        ticketName = "ticket win";
    } else if (ticket.checked) {
        ticketName = "ticket active";
    } else {
        ticketName = "ticket";
    }

    return (
        <div className={ticketName} onClick={() => props.onClick()}>
            <p>{ticket.ticket}</p> 
        </div>
    )
}

export default Ticket;