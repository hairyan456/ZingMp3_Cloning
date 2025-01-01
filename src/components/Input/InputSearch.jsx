import React, { useState } from 'react';
import icons from '../../utils/icons';
import { useDispatch } from 'react-redux';
import { searchDataRedux } from '../../redux/action/musicAction';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

const { CiSearch } = icons;

const InputSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            dispatch(searchDataRedux(keyword));
            navigate(`/${path.SEACH}/${path.ALL}?q=${keyword }`)
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
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default InputSearch;
