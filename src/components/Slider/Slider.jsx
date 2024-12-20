import React from 'react';
import { useSelector } from 'react-redux';

const Slider = () => {
    const { banner } = useSelector(state => state.app);

    return (
        <div className='w-full bg-red-300 flex flex-col'>
            {banner?.length > 0 && banner.map(item => (
                <img key={item?.encodeId} src={item?.banner ?? ''} alt=""
                    className='w-full h-full object-cover'
                />
            ))}
        </div>
    );
};

export default Slider;