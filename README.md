import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TicketBody from '../ticketBody/ticketBody';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import \_ from 'lodash';
import { animateScroll as scroll } from 'react-scroll';
import './b.css';

import { createSelector } from 'reselect';

const filterSelector = createSelector(
(state) => state.filter,
(filter) => filter
);

const TicketsList = () => {
const [showScrollButton, setShowScrollButton] = useState(false);

    const handleScroll = useCallback(
        _.debounce(() => {
            setShowScrollButton(window.scrollY > 200);
        }, 200),
        []
    );
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            handleScroll.cancel(); // Отменить запланированные вызовы debounce
        };
    }, [handleScroll]);

    const scrollToBottom = () => {
        scroll.scrollToBottom({
            duration: 500,
            smooth: true,
        });
    };

    const showMoreTickets = useCallback(() => {
        setticketsToShow((count) => count + 5);
        scrollToBottom();
    }, []);

    const [ticketsToShow, setticketsToShow] = useState(5);

    //const filters = useSelector((state) => state.filter);

    const filters = useSelector(filterSelector);

    const tickets = useSelector((state) => {
        const { all, without, one, two, three } = filters;
        let filteredTickets = [];

        if (all) {
            return filteredTickets.push(...state.tickets.all);
        }
        if (without) {
            filteredTickets.push(...state.tickets[0]);
        }
        if (one) {
            filteredTickets.push(...state.tickets[1]);
        }
        if (two) {
            filteredTickets.push(...state.tickets[3]);
        }
        if (three) {
            filteredTickets.push(...state.tickets[4]);
        }

        return filteredTickets;
    });

    const newTickets = useMemo(() => {
        const sortedTickets = _.orderBy(tickets, ['price'], ['asc']);
        //const sortedTickets = tickets.slice().sort((a, b) => a.price - b.price);
        const removedDuplicates = _.uniq(sortedTickets);
        //const removedDuplicates = Array.from(new Set(sortedTickets));
        return removedDuplicates;
    }, [tickets]);

    const visibleTickets = useMemo(
        () => newTickets.slice(0, ticketsToShow),
        [newTickets, ticketsToShow]
    );

    return (
        <div style={{ marginTop: '10px' }}>
            {visibleTickets.map((ticket) => (
                <TicketBody {...ticket} />
            ))}
            <Button
                type="primary"
                block
                onClick={showMoreTickets}
                style={{ marginBottom: '20px' }}
            >
                Показать еще 5 билетов
            </Button>
            {showScrollButton && (
                <Button
                    className="scroll-button"
                    size="small"
                    onClick={() => scroll.scrollToTop()}
                >
                    Наверх
                </Button>
            )}
        </div>
    );

};

export default TicketsList;
