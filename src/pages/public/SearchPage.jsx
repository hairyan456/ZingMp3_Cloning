import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { searchMenu } from '../../utils/menu';
import { useDispatch, useSelector } from 'react-redux';
import { searchDataRedux } from '../../redux/action';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const keyword = useSelector(state => state.music.keyword);

    useEffect(() => {
        if (location.pathname === '/tim-kiem')
            navigate('/tim-kiem/tat-ca');
    }, []);

    useEffect(() => {
        dispatch(searchDataRedux(keyword?.trim()));

    }, [keyword]);

    if (location.pathname === '/tim-kiem') return null;
    return (
        <>
            <div className='h-12 flex mb-7 items-center text-sm border-b border-b-gray-400 pl-[60px] pb-1'>
                <span className='text-[20px] font-semibold text-gray-800 pr-6 border-r border-gray-400'>
                    Kết quả tìm kiếm
                </span>
                <div className='flex items-center'>
                    {searchMenu?.length > 0 && searchMenu.map(item => (
                        <NavLink key={item?.path} to={`${item?.path}?q=${keyword}`}
                            className={({ isActive }) => `
                            ${isActive ? 'text-0F border-b-2 border-green-900 leading-[52px] font-bold transition-colors ease-in-out duration-400 px-4'
                                    : 'text-32 font-medium px-4'}`
                            }
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
            </div>
            <Outlet />
        </>
    )
};

export default SearchPage;