import React from 'react';
import { Radio } from 'antd';

const Routes = () => {
    return (
        <>
            <Radio.Group
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
