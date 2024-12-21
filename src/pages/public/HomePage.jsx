import React, { useEffect } from 'react';
import SliderComponent from '../../components/Slider/SliderComponent';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { bestOf2024, hotSongs } = useSelector(state => state.app);

    useEffect(() => {
        document.title = 'Zing Mp3 - Trang chủ'
    }, []);

    return (
        <div className='w-full h-[calc(100vh-90px)] overflow-y-auto pb-24'>
            <SliderComponent />

            <div className='best-of-2024 px-6 md:px-[59px] mb-10'>
                <h3 className='font-semibold text-xl mb-5'>Best of 2024</h3>
                <div className='w-full xl:max-w-[calc(100vw-240px-330px)] grid grid-cols-4 gap-x-5 gap-y-10'>
                    {bestOf2024?.length > 0 && bestOf2024.map(item => (
                        <div key={item?.encodeId} className={`w-full h-[330px] `}>
                            <div className='h-[230px] bg-cover bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                                style={{ backgroundImage: `url(${item?.thumbnail})` }} />
                            <div className='flex-auto text-center py-3 flex flex-col gap-3'>
                                <div className='font-semibold text-gray-700 tracking-wider'>{item?.title}</div>
                                <div className='text-xs text-gray-500 text-justify tracking-wide'>{item?.sortDescription}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='hot-songs px-6 md:px-[59px]  mb-10'>
                <h3 className='font-semibold text-xl mb-5'>Nhạc hot thịnh hành</h3>
                <div className='w-full xl:max-w-[calc(100vw-240px-330px)] grid grid-cols-3 gap-x-5 gap-y-14'>
                    {bestOf2024?.length > 0 && bestOf2024.map(item => (
                        <div key={item?.encodeId} className={`w-full h-[350px] `}>
                            <div className='h-[270px] bg-cover bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                                style={{ backgroundImage: `url(${item?.thumbnail})` }} />
                            <div className='flex-auto text-center py-3 flex flex-col gap-3'>
                                <div className='font-semibold text-gray-700 tracking-wider'>{item?.title}</div>
                                <div className='text-xs text-gray-500 text-justify tracking-wide'>{item?.sortDescription}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;