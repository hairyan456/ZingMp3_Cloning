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
    return <Outlet />
};

export default SearchPage;