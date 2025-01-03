import React, { useEffect } from 'react';
import SliderComponent from '../../components/Slider/SliderComponent';
import { useSelector } from 'react-redux';
import SectionComponent from '../../components/Section/SectionComponent';
import NewRelease from '../../modules/Home/NewRelease';
import { useNavigate } from 'react-router-dom';
import ChartComponent from '../../components/Chart/ChartComponent';

const HomePage = () => {
    const navigate = useNavigate();

    const bestOf2024 = useSelector(state => state.app.bestOf2024);
    const hotSongs = useSelector(state => state.app.hotSongs);
    const chill = useSelector(state => state.app.chill);
    const top100 = useSelector(state => state.app.top100);
    const banner2 = useSelector(state => state.app.banner2);
    const albumHot = useSelector(state => state.app.albumHot);

    useEffect(() => {
        document.title = 'Zing Mp3 - Trang chủ'
    }, []);

    return (
        <div className='w-full'>
            <SliderComponent />
            <SectionComponent className='best-of-2024 px-6 md:px-[59px] mb-10' title={'Best of 2024'} dataItems={bestOf2024} />
            <SectionComponent className='hot-songs px-6 md:px-[59px] mb-10' title={'Nhạc hot hiện hành'} dataItems={hotSongs} />
            <ChartComponent className={'chart px-6 md:px-[59px] mb-10'} />
            <div className='w-full px-6 md:px-[59px] grid grid-cols-3 gap-x-4 mb-10'>
                {banner2?.length > 0 && banner2.map((item, index) => (
                    <div key={index} className='h-[150px] bg-cover bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-90'
                        style={{ backgroundImage: `url(${item?.banner})` }}
                        onClick={() => navigate(item?.link?.replace('.html', ''))}
                    />
                ))}
            </div>
            <SectionComponent className='chill px-6 md:px-[59px] mb-10' title={'Nhạc chill'} dataItems={chill} />
            <SectionComponent className='top-100 px-6 md:px-[59px] mb-10' title={'Top 100'} dataItems={top100} />
            <NewRelease className={'new-release px-6 md:px-[59px] mb-10'} />
            <SectionComponent className='album-hot px-6 md:px-[59px]' title={'Album Hot'} dataItems={albumHot} />
        </div>
    );
};

export default HomePage;