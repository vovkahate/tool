import React from 'react';
import { Button, Radio } from 'antd';
import styles from './buttongroup.module.scss';
import './q.css';

const Routes = () => {
    return (
        <>
            <Radio.Group
                className="custom-button-group"
                defaultValue="a"
                buttonStyle="solid"
                size="large"
            >
                <Radio.Button value="a">Самый дешевый</Radio.Button>
                <Radio.Button value="b">Самый быстрый</Radio.Button>
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
