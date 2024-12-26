import React, { useEffect } from 'react';
import moment from 'moment';
import icons from '../../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import AdioSpinner from '../../components/Audio/AdioSpinner';
import { setIsPLayingRedux } from '../../redux/action/musicAction';

const { CiHeart, HiOutlineDotsHorizontal, FaRegPlayCircle } = icons;
const Thumbnail = ({ thumbnail = '', title = '', contentLastUpdate = '', artistsNames = '', like = 0 }) => {
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.music.isPlaying);

    return (
        <>
            <div className='w-full max-w-[250px] relative overflow-hidden cursor-pointer' onClick={() => dispatch(setIsPLayingRedux(!isPlaying))}>
                <div style={{ backgroundImage: `url(${thumbnail})` }}
                    className={`h-[250px] bg-cover bg-no-repeat bg-center ${isPlaying ? 'animate-rotateCenter' : 'animate-none'}`}
                />
                <div className={`overlay absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay-30 ${isPlaying ? 'hover:rounded-full' : 'rounded-none'} hover:transition-all flex items-center justify-center`}>
                    {isPlaying ? <AdioSpinner /> : <FaRegPlayCircle className='text-white' size={50} />}
                </div>
            </div>
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