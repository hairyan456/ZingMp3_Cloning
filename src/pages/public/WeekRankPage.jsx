import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import icons from '../../utils/icons';

const { FaRegPlayCircle } = icons;

const searchMenu = [
    { path: '/zing-chart-tuan/Bai-hat-Viet-Nam/IWZ9Z08I', text: 'Việt Nam' },
    { path: '/zing-chart-tuan/Bai-hat-US-UK/IWZ9Z0BW', text: 'US-UK' },
    { path: 'playlist', text: 'KPOP' },
];

const WeekRankPage = () => {
    const { title, pid } = useParams();

    if (!title && !pid) return null;
    return (
        <div className='w-full px-[60px] flex flex-col gap-y-8 pb-10'>
            <div className='flex gap-2 items-center text-0F'>
                <h3 className='font-semibold text-2xl  cursor-pointer hover:text-opacity-45'>Bảng xếp hạng tuần</h3>
                <span><FaRegPlayCircle size={28} /></span>
            </div>

            <div className='flex items-center'>
                {searchMenu?.length > 0 && searchMenu.map(item => (
                    <NavLink key={item?.path} to={`${item?.path}?q=${''}`}
                        className={({ isActive }) => `text-xl uppercase px-4
                            ${isActive ? 'text-0F border-b-2  border-green-900 leading-[52px] font-bold transition-colors ease-in-out duration-400'
                                : 'text-32 font-medium '}`
                        }
                    >
                        {item.text}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default WeekRankPage;