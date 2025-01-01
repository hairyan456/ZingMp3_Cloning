import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/tim-kiem')
            navigate('/tim-kiem/tat-ca');
    }, []);

    if (location.pathname === '/tim-kiem') return null;
    return (
        <>
            <div className='h-12 flex mb-7 items-center text-sm border-b border-b-gray-400 pl-[60px] pb-1'>
                <span className='text-[20px] font-semibold text-gray-800 pr-6 border-r border-gray-400'>
                    Kết quả tìm kiếm
                </span>
                <div className='flex items-center'>
                    <span className='px-4 cursor-pointer hover:transition-all hover:text-0F'>TẤT CẢ</span>
                    <span className='px-4 cursor-pointer hover:transition-all hover:text-0F'>BÀI HÁT</span>
                    <span className='px-4 cursor-pointer hover:transition-all hover:text-0F'>PLAYLIST/ALBUM</span>
                </div>
            </div>
            <Outlet />
        </>
    )
};

export default SearchPage;