import React from 'react';
import styles from './filters.module.scss';

const Filters = () => {
    return (
        <div className={styles.filters_wrapper}>
            <h3>Количество пересадок</h3>
            <label>
                <input
                    type="checkbox"
                    name="all"
                    value="all"
                />
                Все
            </label>

            <label>
                <input
                    type="checkbox"
                    name="withoutTransfer"
                    value="without"
                />
                Без пересадок
            </label>
            <label>
                <input
                    type="checkbox"
                    name="withOneTransfer"
                    value="oneTransfer"
                />
                1 пересадка
            </label>
            <label>
                <input
                    type="checkbox"
                    name="withTwoTransfer"
                    value="twoTransfer"
                />
                2 пересадки
            </label>
            <label>
                <input
                    type="checkbox"
                    name="withThreeTransfer"
                    value="threeTransfer"
                />
                3 пересадки
            </label>
        </div>
    );
};

export default Filters;
