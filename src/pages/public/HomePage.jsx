import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import SliderComponent from '../../components/Slider/SliderComponent';

const HomePage = () => {

    useEffect(() => {
        document.title = 'Zing Mp3 - Trang chủ'
    }, []);

    return (
        <div className='w-full overflow-y-auto'>
            <Header />
            <SliderComponent />
        </div>
    );
};

export default HomePage;