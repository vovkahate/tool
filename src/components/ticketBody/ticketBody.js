import React from 'react';
import styles from './ticketBody.module.scss';

const TicketBody = ({ id, carrier, price }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div>{price}</div>
                <div>{carrier}</div>
            </div>
            <div className={styles.body}>туда</div>
            <div className={styles.bottom}>обратно</div>
        </div>
    );
};

export default TicketBody;
