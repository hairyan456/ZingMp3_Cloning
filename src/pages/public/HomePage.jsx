import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Slider from '../../components/Slider/Slider';

const HomePage = () => {

    useEffect(() => {
        document.title = 'Zing Mp3 - Trang chủ'
    }, []);

    return (
        <div className='overflow-y-auto'>
            <Header />
            <Slider />
        </div>
    );
};

export default HomePage;