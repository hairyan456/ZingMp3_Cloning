import React from 'react';
import icons from '../../utils/icons';
import InputSearch from '../Input/InputSearch';

const { IoIosArrowRoundBack, IoIosArrowRoundForward } = icons;

const Header = () => {
    return (
        <div className='h-[70px] px-[59px] flex items-center'>
            <div className='basis-4/6 flex gap-5 items-center'>
                <div className='flex text-gray-500 gap-3 basis'>
                    <span className='cursor-pointer'> <IoIosArrowRoundBack size={25} /> </span>
                    <span className='cursor-pointer'> <IoIosArrowRoundForward size={25} /> </span>
                </div>
                <div className='ct-search flex-auto'>
                    <InputSearch />
                </div>
            </div>
            <div className='basis-2/6 flex justify-end'>
                Login
            </div>
        </div>
    );
};

export default Header;