import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TicketsList = () => {
    const dispatch = useDispatch();
    const tickets = useSelector((state) => state.tickets);

    return <div>123</div>;
};

export default TicketsList;
