import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.scss';
import { Spin } from 'antd';

import Logo from './components/logo/logo';
import Filt from './components/filters/filt';
import Routes from './components/flightRoutes/routes';
import TicketsList from './components/ticketsList/ticketsList';

import { getId } from './store/idSlice';
import { getTickets } from './store/ticketsSlice';

function App() {
    const dispatch = useDispatch();

    const { id, isLoading, error } = useSelector((state) => state.id);
    const { stop } = useSelector((state) => state.tickets);

    useEffect(() => {
        const fetchData = async () => {
            const fetchId = await dispatch(getId());
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const fetchTickets = await dispatch(getTickets(id));
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className={styles.App}>
            <div className={styles.wrapper}>
                <Logo />
                {isLoading && <Spin />}

                <div className={styles.main}>
                    <Filt />
                    <div className={styles.right}>
                        <Routes />
                        {!stop && <Spin />}
                        <TicketsList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
