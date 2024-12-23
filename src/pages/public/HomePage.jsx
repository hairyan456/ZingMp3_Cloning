import React, { useEffect } from 'react';
import SliderComponent from '../../components/Slider/SliderComponent';
import { useSelector } from 'react-redux';
import SectionComponent from '../../components/Section/SectionComponent';

const HomePage = () => {
    const bestOf2024 = useSelector(state => state.app.bestOf2024);
    const hotSongs = useSelector(state => state.app.hotSongs);

    useEffect(() => {
        document.title = 'Zing Mp3 - Trang chủ'
    }, []);

    return (
        <div className='w-full pb-5'>
            <SliderComponent />
            <SectionComponent className='best-of-2024 px-6 md:px-[59px] mb-10' dataItems={bestOf2024} />
            <SectionComponent className='hot-songs px-6 md:px-[59px]  mb-10' dataItems={hotSongs} />
        </div>
    );
};

export default HomePage;