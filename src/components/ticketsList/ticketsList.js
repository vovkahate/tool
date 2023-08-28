import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import TicketBody from '../ticketBody/ticketBody';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Alert } from 'antd';
import debounce from 'lodash/debounce';
import { animateScroll as scroll } from 'react-scroll';
import './b.css';
import { createSelector } from 'reselect';
import { v4 } from 'uuid';

const MemoizedTicketBody = memo(TicketBody);
const filterSelector = createSelector(
    (state) => state.filter,
    (filter) => filter
);

const TicketsList = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    const handleScroll = useCallback(
        debounce(() => {
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

    const scrollToBottom = useCallback(() => {
        scroll.scrollToBottom({
            duration: 500,
            smooth: true,
        });
    }, []);

    const showMoreTickets = useCallback(() => {
        setticketsToShow((count) => count + 5);
        scrollToBottom();
    }, [scrollToBottom]);

    const [ticketsToShow, setticketsToShow] = useState(5);

    const filters = useSelector(filterSelector);

    const ticketsSelector = createSelector(
        (state) => state.tickets,
        (tickets) => {
            const { all, without, one, two, three } = filters;
            let filteredTickets = [];
            if (all) {
                filteredTickets.push(...tickets.all);
                return filteredTickets;
            }
            if (without) {
                filteredTickets.push(...tickets[0]);
            }
            if (one) {
                filteredTickets.push(...tickets[1]);
            }
            if (two) {
                filteredTickets.push(...tickets[2]);
            }
            if (three) {
                filteredTickets.push(...tickets[3]);
            }

            return filteredTickets;
        }
    );
    const tickets = useSelector(ticketsSelector);

    const { cheapest, fastest } = useSelector((state) => state.options);

    const newTickets = useMemo(() => {
        const sortedTickets = [];
        if (cheapest) {
            sortedTickets.push(
                ...tickets.slice().sort((a, b) => a.price - b.price)
            );
        } else if (fastest) {
            sortedTickets.push(
                ...tickets
                    .slice()
                    .sort(
                        (a, b) =>
                            Math.min(
                                a.segments[0].duration,
                                a.segments[1].duration
                            ) -
                            Math.min(
                                b.segments[0].duration,
                                b.segments[1].duration
                            )
                    )
            );
        }

        const removedDuplicates = Array.from(new Set(sortedTickets));
        return removedDuplicates;
    }, [tickets]);

    const visibleTickets = useMemo(
        () => newTickets.slice(0, ticketsToShow),
        [newTickets, ticketsToShow]
    );

    return (
        <div style={{ marginTop: '10px' }}>
            {visibleTickets.length === 0 && (
                <Alert
                    message="Выберите параметры поиска"
                    type="info"
                    showIcon
                />
            )}
            {visibleTickets.map((ticket) => (
                <MemoizedTicketBody
                    {...ticket}
                    key={v4()}
                />
            ))}
            {visibleTickets.length > 0 && (
                <Button
                    type="primary"
                    block
                    onClick={showMoreTickets}
                    style={{ marginBottom: '20px' }}
                >
                    Показать еще 5 билетов
                </Button>
            )}
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
