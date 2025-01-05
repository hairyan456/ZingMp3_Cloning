import React, { useEffect, useState } from 'react';
import logoMP3 from '../../assets/logo-mp3.svg';
import { sidebarMenu } from '../../utils/menu';
import { NavLink, useNavigate } from 'react-router-dom';
import mp3Icon from '/mp3-icon.png'

const SidebarLeft = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024); // Cập nhật trạng thái khi thay đổi kích thước
        };

        window.addEventListener('resize', handleResize); // Lắng nghe sự kiện thay đổi kích thước

        return () => {
            window.removeEventListener('resize', handleResize); // Dọn dẹp sự kiện khi unmount
        };
    }, []);

    return (
        <div className='w-fit lg:w-[240px] flex-none bg-DD flex flex-col'>
            <div className='w-full h-[70px] flex items-center justify-center lg:justify-start px-2 lg:pl-5'>
                <img
                    src={isMobile ? mp3Icon : logoMP3}
                    alt="mp3_logo"
                    className='w-[40px] lg:w-32 lg:h-10 object-contain cursor-pointer'
                    onClick={() => navigate('/')}
                />
            </div>
            <div className='flex flex-col'>
                {sidebarMenu?.length > 0 && sidebarMenu.map(item => (
                    <NavLink
                        key={item?.path}
                        to={item?.path}
                        className={({ isActive }) => `ct-sidebar-left 
                            ${isActive ? 'text-0F bg-E7 transition-colors ease-in-out duration-400' : 'text-32'}`
                        }
                    >
                        {item?.icon}
                        <span className='hidden lg:block'>{item?.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SidebarLeft;