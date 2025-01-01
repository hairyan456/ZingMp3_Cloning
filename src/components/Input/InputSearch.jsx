import React, { useState } from 'react';
import icons from '../../utils/icons';
import { searchSong } from '../../services/musicService';
import { toast } from 'react-toastify';

const { CiSearch } = icons;

const InputSearch = () => {
    const [keyword, setKeyword] = useState('');

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            try {
                let res = await searchSong(keyword ?? '');
                if (res?.err === 0) {
                    console.log(res?.data)
                }
                else
                    toast.error(res?.msg);
            } catch (error) {
                console.error("Error while searching song:", error);
                toast.error(error?.message);
            }
        }
    };

    return (
        <div className='w-full flex items-center relative'>
            <span className='absolute left-3 text-gray-500'><CiSearch size={21} /></span>
            <input
                type="text"
                className='outline-none pl-10 bg-DD px-4 py-2 rounded-3xl h-10 w-full text-gray-500 hover:border
                 hover:border-blue-500 hover:transition-colors ease-in-out duration-500'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown
            />
        </div>
    );
};

export default InputSearch;
