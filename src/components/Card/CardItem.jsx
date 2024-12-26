import React from 'react';

const CardItem = ({ className = '', item = {}, navigate = () => { } }) => {
    return (
        <div key={item?.encodeId} className={`${className}`}>
            <div className='h-[230px] bg-cover bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                style={{ backgroundImage: `url(${item?.thumbnail})` }}
                onClick={() => navigate(item?.link)} />
            <div className='flex-auto text-center py-3 flex flex-col gap-3'>
                <div className='font-semibold text-gray-700 tracking-wider'>
                    {item.title}
                </div>
                <div className='text-xs text-gray-500 text-justify tracking-wide'>
                    {item?.sortDescription?.length > 55 ? item.sortDescription.slice(0, 54) + '...' : item.sortDescription}
                </div>
            </div>
        </div>
    );
};

export default CardItem;