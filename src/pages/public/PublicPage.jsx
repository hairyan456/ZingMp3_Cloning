import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicPage = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default PublicPage;