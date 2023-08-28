import React from 'react';
import { Radio } from 'antd';
import styles from './buttongroup.module.scss';
import './q.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCheapest, setFastest } from '../../store/optionSlice';

const Routes = () => {
    const dispatch = useDispatch();

    const handleOptionsChange = (e) => {
        dispatch(setCheapest(e.target.value === 'a'));
        dispatch(setFastest(e.target.value === 'b'));
    };
    return (
        <>
            <Radio.Group
                className="custom-button-group"
                defaultValue="a"
                buttonStyle="solid"
                size="large"
            >
                <Radio.Button
                    value="a"
                    onChange={handleOptionsChange}
                >
                    Самый дешевый
                </Radio.Button>
                <Radio.Button
                    value="b"
                    onChange={handleOptionsChange}
                >
                    Самый быстрый
                </Radio.Button>
                <Radio.Button
                    value="c"
                    disabled
                >
                    Оптимальный
                </Radio.Button>
            </Radio.Group>
        </>
    );
};
export default Routes;
