import React from 'react';
import moment from 'moment';
import icons from '../../utils/icons';

const { CiHeart, HiOutlineDotsHorizontal } = icons;
const Thumbnail = ({ thumbnail = '', title = '', contentLastUpdate = '', artistsNames = '', like = 0 }) => {
    return (
        <>
            <div className='h-[250px] bg-cover bg-no-repeat bg-center transition-transform duration-300 ease-in-out 
                hover:scale-110 shadow-md'
                style={{ backgroundImage: `url(${thumbnail})` }} />
            <h3 className='font-semibold text-lg text-gray-800'>{title}</h3>
            <div className='text-sm'>
                <span>Cập nhật: </span>
                <span className='font-light'>{moment.unix(contentLastUpdate).format("DD/MM/YYYY")}</span>
            </div>
            <div className='text-xs text-gray-800'>{artistsNames}</div>
            <div className='text-xs font-light'>{`${like} người yêu thích`}</div>
            <div>
                <button className='bg-[#9b4de0] text-[#ffffff] px-6 py-3 rounded-xl text-lg'>Phát tất cả</button>
            </div>
            <div className='mt-5 flex justify-center gap-4'>
                <span title='Thêm vào thư viện' className='cursor-pointer'><CiHeart size={24} /></span>
                <span title='Khác' className='cursor-pointer'><HiOutlineDotsHorizontal size={24} /></span>
            </div>
        </>
    );
};

export default Thumbnail;