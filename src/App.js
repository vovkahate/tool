import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './app.module.scss';

import Logo from './components/logo/logo';
import Filt from './components/filters/filt';
import Routes from './components/flightRoutes/routes';
import TicketsList from './components/ticketsList/ticketsList';

import { getId } from './store/idSlice';
import { getTickets } from './store/ticketsSlice';

import Loader from './components/loader/loader';

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
                <div className={styles.main}>
                    <Filt />
                    <div className={styles.right}>
                        <Routes />
                        {!stop && <Loader />}
                        <TicketsList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
