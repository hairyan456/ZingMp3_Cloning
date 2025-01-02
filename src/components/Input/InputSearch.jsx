import React, { useState } from 'react';
import icons from '../../utils/icons';
import { useDispatch } from 'react-redux';
import { setKeywordRedux } from '../../redux/action/musicAction';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { IoMdClose } from "react-icons/io";

const { CiSearch } = icons;

const InputSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            dispatch(setKeywordRedux(keyword.trim()));
            navigate(`/${path.SEACH}/${path.ALL}?q=${keyword}`)
        }
    };

    return (
        <div className='w-full flex items-center relative'>
            <span className='absolute left-3 text-gray-500'><CiSearch size={21} /></span>
            <input
                type="text"
                className='outline-none px-10 bg-DD py-2 rounded-3xl h-10 w-full text-gray-500 hover:border
                 hover:border-blue-500 hover:transition-colors ease-in-out duration-500'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <span className='pl-5 cursor-pointer absolute right-3 text-gray-500'
                onClick={() => setKeyword('')}
            >
                <IoMdClose size={21} />
            </span>
        </div>
    );
};

export default InputSearch;
