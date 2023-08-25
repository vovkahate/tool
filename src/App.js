import Filters from './components/filters/filters';
import Logo from './components/logo/logo';
import styles from './app.module.scss';
import { useDispatch } from 'react-redux';
import { getId } from './store/idSlice';
import { getTickets } from './store/ticketsSlice';
import Routes from './components/flightRoutes/routes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();

    const { id, isLoading, error } = useSelector((state) => state.id);

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
                <p>
                    search id: {id} ; error: {error}; isLoading: {isLoading}
                </p>
                <div className={styles.main}>
                    <Filters />
                    <div>
                        <Routes />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
