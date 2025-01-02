import React, { useState } from 'react';
import icons from '../../utils/icons';
import { useNavigate } from 'react-router-dom';

const { FaHeart, CiHeart, HiOutlineDotsHorizontal, FaRegPlayCircle } = icons;

const CardItem = ({ className = '', item = {}, }) => {
    const [isHover, setIsHover] = useState(false);
    const [isLike, setIsLike] = useState(false);
    const navigate = useNavigate();

    const navigateDetailPlayList = (url, option = {}) => {
        const match = url.match(/\/album\/(.*?)\.html/);
        if (match)
            navigate(`/playlist/${match[1]}`, option);
    }

    return (
        <div className={`${className}`}>
            <div style={{ backgroundImage: `url(${item?.thumbnail})` }}
                className='h-[230px] rounded-md relative bg-cover bg-no-repeat bg-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110'
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {isHover &&
                    <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md
                    flex items-center justify-between text-white px-10'
                        onClick={() => navigateDetailPlayList(item?.link)}
                    >
                        <span onClick={(e) => { e.stopPropagation(); setIsLike(p => !p); }}>
                            {!isLike ? <CiHeart size={25} /> : <FaHeart size={25} />}
                        </span>
                        <span onClick={(e) => { e.stopPropagation(); navigateDetailPlayList(item?.link, { state: { playAlbum: true } }) }}>
                            <FaRegPlayCircle size={25} />
                        </span>
                        <span><HiOutlineDotsHorizontal size={25} /></span>
                    </div>
                }
            </div >
            <div className='flex-auto text-center py-3 flex flex-col gap-3'>
                <div className='font-semibold text-gray-700 tracking-wider'>
                    {item?.title?.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                </div>
                <div className='text-xs text-gray-500 text-justify tracking-wide'>
                    {item?.sortDescription?.length > 50 ? item.sortDescription.slice(0, 50) + '...' : item.sortDescription}
                </div>
            </div>
        </div >
    );
};

export default React.memo(CardItem);