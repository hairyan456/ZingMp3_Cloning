import React from 'react';
import icons from '../../utils/icons';

const { CiSearch } = icons;

const InputSearch = () => {
    return (
        <div className='w-full flex items-center relative'>
            <span className='absolute left-3  text-gray-500'><CiSearch size={21} /></span>
            <input type="text"
                className='outline-none pl-10 bg-DD px-4 py-2 rounded-3xl h-10 w-full text-gray-500 hover:border
                 hover:border-blue-500 hover:transition-colors ease-in-out duration-500'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...' />
        </div>
    );
};

export default InputSearch;