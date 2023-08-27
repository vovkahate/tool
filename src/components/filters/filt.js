import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './f.css';
import styles from './filters.module.scss';

import {
    setAll,
    setWithout,
    setOne,
    setTwo,
    setThree,
} from '../../store/filterSlice';

const Filt = () => {
    const dispatch = useDispatch();

    const options = [
        'Без пересадок',
        '1 пересадка',
        '2 пересадки',
        '3 пересадки',
    ];

    const checkedList = useSelector((state) => {
        const { all, without, one, two, three } = state.filter;
        if (all) return options;

        const list = [];
        if (without) list.push('Без пересадок');
        if (one) list.push('1 пересадка');
        if (two) list.push('2 пересадки');
        if (three) list.push('3 пересадки');
        return list;
    });

    const checkAll = options.length === checkedList.length;

    const handleCheckboxChange = (option) => {
        let updatedList;
        if (checkedList.includes(option)) {
            updatedList = checkedList.filter((item) => item !== option);
        } else {
            updatedList = [...checkedList, option];
        }

        dispatch(setAll(updatedList.length === options.length));
        dispatch(setWithout(updatedList.includes('Без пересадок')));
        dispatch(setOne(updatedList.includes('1 пересадка')));
        dispatch(setTwo(updatedList.includes('2 пересадки')));
        dispatch(setThree(updatedList.includes('3 пересадки')));
    };

    const handleCheckAllChange = (event) => {
        const isChecked = event.target.checked;

        dispatch(setAll(isChecked));
        dispatch(setWithout(isChecked));
        dispatch(setOne(isChecked));
        dispatch(setTwo(isChecked));
        dispatch(setThree(isChecked));
    };

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
            <div className="checkbox-wrapper-42">
                <input
                    id="all"
                    type="checkbox"
                    checked={checkAll}
                    onChange={handleCheckAllChange}
                />
                <label
                    className="cbx"
                    htmlFor="all"
                ></label>
                <label
                    className="lbl"
                    htmlFor="all"
                >
                    Все
                </label>
            </div>

            {options.map((option, index) => (
                <div
                    className="checkbox-wrapper-42"
                    key={index}
                >
                    <input
                        id={index}
                        type="checkbox"
                        checked={checkedList.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    <label
                        className="cbx"
                        htmlFor={index}
                    ></label>
                    <label
                        className="lbl"
                        htmlFor={index}
                    >
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default Filt;
