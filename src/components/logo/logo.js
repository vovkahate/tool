import React from 'react';
import logo from '../../pics/Logo.svg';
import styles from './logo.module.scss';

const Logo = () => {
    return (
        <div className={styles.logo}>
            <img
                src={logo}
                alt="logo"
            />
        </div>
    );
};

export default Logo;
