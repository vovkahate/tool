import React, { useState, useEffect } from 'react';
import TicketBody from '../ticketBody/ticketBody';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

const TicketsList = () => {
    // const [filter, setFilter] = useState('all');
    // const [conditions, setConditions] = useState('cheapest');

    const [visibleTickets, setVisibleTickets] = useState([]);
    const [ticketsToShow, setticketsToShow] = useState(5);
    const tickets = useSelector((state) => state.tickets.all);

    useEffect(() => {
        const newTickets = getNewTickets();
        setVisibleTickets(newTickets.slice(0, ticketsToShow));
    }, [tickets, ticketsToShow]);

    const getNewTickets = () => {
        const sortedTickets = _.orderBy(tickets, ['price'], ['asc']);
        return sortedTickets;
    };

    const showMoreTickets = () => {
        setticketsToShow((count) => count + 5);
    };

    return (
        <div style={{ marginTop: '10px' }}>
            {visibleTickets.map((ticket) => (
                <TicketBody {...ticket} />
            ))}
            <button onClick={showMoreTickets}>Показать еще</button>
        </div>
    );
};

export default TicketsList;
