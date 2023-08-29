import React from 'react';
import styles from './loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <span className={styles.load}></span>
        </div>
    );
};

export default Loader;
