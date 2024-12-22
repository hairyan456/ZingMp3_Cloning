import React from 'react';
import icons from '../../utils/icons';
import InputSearch from '../Input/InputSearch';
import { useNavigate } from 'react-router-dom';

const { IoIosArrowRoundBack, IoIosArrowRoundForward } = icons;

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='h-[70px] px-6 xs:px-10 md:px-[59px] flex items-center lg:gap-5 shadow-md mb-5'>
            <div className='basis-4/6 flex gap-5 items-center'>
                <div className='hidden md:flex text-gray-500 gap-3 basis'>
                    <span className='cursor-pointer' onClick={() => navigate(-1)} >
                        <IoIosArrowRoundBack size={25} />
                    </span>
                    <span className='cursor-pointer' onClick={() => navigate(1)}>
                        <IoIosArrowRoundForward size={25} />
                    </span>
                </div>
                <div className='ct-search flex-auto min-w-[100px]'>
                    <InputSearch />
                </div>
            </div>
            <div className='basis-2/6 flex justify-end '>
                <button className='w-fit px-2 py-1 ml-[15px] font-medium xs:ml-0 xs:px-4 xs:py-2 cursor-pointer  
                border border-gray-400 outline-none rounded-xl text-gray-600
                hover:bg-gray-200 hover:transition-all hover:ease-in-out hover:duration-300'>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Header;