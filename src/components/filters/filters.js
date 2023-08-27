import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './filters.module.scss';

import {
    setAll,
    setWithout,
    setOne,
    setTwo,
    setThree,
} from '../../store/filterSlice';

const Filters = () => {
    const CheckboxGroup = Checkbox.Group;
    const options = [
        'Без пересадок',
        '1 пересадка',
        '2 пересадки',
        '3 пересадки',
    ];

    const dispatch = useDispatch();

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

    const onChange = (list) => {
        dispatch(setAll(list.length === options.length));
        dispatch(setWithout(list.includes('Без пересадок')));
        dispatch(setOne(list.includes('1 пересадка')));
        dispatch(setTwo(list.includes('2 пересадки')));
        dispatch(setThree(list.includes('3 пересадки')));
    };

    const onCheckAllChange = (e) => {
        dispatch(setAll(e.target.checked));
        dispatch(setWithout(e.target.checked));
        dispatch(setOne(e.target.checked));
        dispatch(setTwo(e.target.checked));
        dispatch(setThree(e.target.checked));
    };

    return (
        <div className={styles.filters_wrapper}>
            <h3>Количество пересадок</h3>

            <Checkbox
                onChange={onCheckAllChange}
                checked={checkAll}
            >
                Все
            </Checkbox>

            <CheckboxGroup
                options={options}
                value={checkedList}
                onChange={onChange}
            />
        </div>
    );
};

export default Filters;
