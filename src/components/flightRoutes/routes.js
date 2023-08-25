import React, { useState } from 'react';
import { Radio } from 'antd';

const optionsButtons = [
    {
        label: 'Самый дешевый',
        value: 'Apple',
    },
    {
        label: 'Самый быстрый',
        value: 'Pear',
    },
    {
        label: 'Оптимальный',
        value: 'Orange',
    },
];
const Routes = () => {
    const [value, setValue] = useState('Apple');
    const onChange = ({ target: { value } }) => {
        console.log('radio checked', value);
        setValue(value);
    };
    return (
        <>
            <Radio.Group
                options={optionsButtons}
                onChange={onChange}
                value={value}
                optionType="button"
                buttonStyle="solid"
                size="large"
            />
        </>
    );
};
export default Routes;
