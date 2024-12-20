import React from 'react';
import logoMP3 from '../../assets/logo-mp3.svg';
import { sidebarMenu } from '../../utils/menu';
import { NavLink, useNavigate } from 'react-router-dom';

const SidebarLeft = () => {
    const navigate = useNavigate();

    return (
        <div className='w-40 md:w-[240px] flex-none bg-DD flex flex-col'>
            <div className='w-full h-[70px] flex items-center justify-start pl-5 '>
                <img src={logoMP3} alt="mp3_logo"
                    className='w-24 md:w-32 h-10 object-contain cursor-pointer'
                    onClick={() => navigate('/')} />
            </div>
            <div className='flex flex-col'>
                {sidebarMenu?.length > 0 && sidebarMenu.map(item => (
                    <NavLink
                        key={item?.path}
                        to={item?.path}
                        className={({ isActive }) => `ct-sidebar-left 
                            ${isActive ? 'text-0F transition-colors ease-in-out duration-400' : 'text-32'}`
                        }
                    >
                        {item?.icon}
                        <span>{item?.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default SidebarLeft;