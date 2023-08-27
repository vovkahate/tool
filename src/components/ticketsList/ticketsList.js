import React, { useState, useEffect } from 'react';
import TicketBody from '../ticketBody/ticketBody';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import _ from 'lodash';
import { animateScroll as scroll, scrollSpy } from 'react-scroll';
import './b.css';

const TicketsList = () => {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [visibleTickets, setVisibleTickets] = useState([]);
    const [ticketsToShow, setticketsToShow] = useState(5);

    const filter = useSelector((state) => state.filter);

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
        scrollToBottom();
    };

    const scrollToBottom = () => {
        scroll.scrollToBottom({
            duration: 500, // Задайте желаемую продолжительность анимации в миллисекундах
            smooth: true, // Включите плавную анимацию
        });
    };

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
