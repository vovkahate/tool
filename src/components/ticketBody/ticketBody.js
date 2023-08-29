import React from 'react';
import styles from './ticketBody.module.scss';
import S7 from '../../pics/S7.avif';
import AK from '../../pics/AK.avif';
import BT from '../../pics/BT.avif';
import DP from '../../pics/DP.avif';
import FV from '../../pics/FV.avif';
import U6 from '../../pics/U6.avif';
import UT from '../../pics/UT.avif';
import W6 from '../../pics/W6.avif';

const MemoizedImage = React.memo(({ carrier }) => (
    <img
        src={insertImage(carrier)}
        alt="carrier"
    />
));

function getStops(stops) {
    switch (stops) {
        case 0:
            return 'Без пересадок';
        case 1:
            return '1 пересадка';
        case 2:
            return '2 пересадки';
        case 3:
            return '3 пересадки';
        default:
            return '';
    }
}

const formatDate = (timestamp, minutes) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const currentMinutes = date.getMinutes();

    const formattedDate = `${hours.toString().padStart(2, '0')}:${currentMinutes
        .toString()
        .padStart(2, '0')}`;

    const updatedDate = new Date(date.getTime() + minutes * 60000);
    const updatedHours = updatedDate.getHours();
    const updatedMinutes = updatedDate.getMinutes();
    const formattedUpdatedDate = `${updatedHours
        .toString()
        .padStart(2, '0')}:${updatedMinutes.toString().padStart(2, '0')}`;

    return `${formattedDate} - ${formattedUpdatedDate}`;
};

const formatMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedTime = `${hours
        .toString()
        .padStart(2, '0')}ч ${remainingMinutes.toString().padStart(2, '0')}м`;
    return formattedTime;
};

function insertImage(key) {
    switch (key) {
        case 'S7':
            return S7;
        case 'AK':
            return AK;
        case 'BT':
            return BT;
        case 'DP':
            return DP;
        case 'FV':
            return FV;
        case 'U6':
            return U6;
        case 'UT':
            return UT;
        case 'W6':
            return W6;
        default:
            return null;
    }
}

function formatPrice(price) {
    // Преобразование числа в строку и замена точки на запятую (если необходимо)
    const priceString = price.toString().replace('.', ',');

    // Разделение строки на массив по разделителю (запятая)
    const parts = priceString.split(',');

    // Получение целой части числа
    const integerPart = parts[0];

    // Добавление пробелов между тысячами (каждые 3 символа справа)
    const formattedIntegerPart = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ' '
    );

    // Формирование окончательной строки с целой частью и десятичной частью (если есть)
    let formattedPrice = formattedIntegerPart;
    if (parts.length > 1) {
        const decimalPart = parts[1];
        formattedPrice += `,${decimalPart}`;
    }

    return formattedPrice;
}
const TicketBody = ({ id, carrier, price, segments }) => {
    return (
        <div className={styles.parent}>
            <div className={styles.price}>{formatPrice(price)} Р</div>
            <div
                id="image"
                className={styles.carrier}
            >
                <MemoizedImage carrier={carrier} />
            </div>
            <div className={styles.grey}>
                {segments[0].origin} - {segments[0].destination}
            </div>
            <div className={styles.grey}>в пути</div>
            <div className={styles.grey}>
                {getStops(segments[0].stops.length)}
            </div>
            <div className={styles.black}>
                {formatDate(segments[0].date, segments[0].duration)}
            </div>
            <div className={styles.black}>
                {formatMinutes(segments[0].duration)}
            </div>
            <div className={styles.black}>
                {segments[0].stops.length > 0
                    ? segments[0].stops.toString()
                    : '-'}
            </div>
            <div className={styles.grey}>
                {segments[1].origin} - {segments[1].destination}
            </div>
            <div className={styles.grey}>в пути</div>
            <div className={styles.grey}>
                {getStops(segments[1].stops.length)}
            </div>
            <div className={styles.black}>
                {formatDate(segments[1].date, segments[1].duration)}
            </div>
            <div className={styles.black}>
                {formatMinutes(segments[1].duration)}
            </div>
            <div className={styles.black}>
                {segments[1].stops.length > 0
                    ? segments[1].stops.toString()
                    : '-'}
            </div>
        </div>
    );
};

export default TicketBody;
