import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarLeft, SidebarRight } from '../../modules/Home';

// flex-none: chiếm cố định (0 0 auto)
// flex-auto: (flex-grow + flex-shrink + flex-basis: 1 1 auto)

const PublicPage = () => {
    return (
        <div className='w-full flex bg-CE'>
            <SidebarLeft />
            <div className='flex-auto'>
                <Outlet />
            </div>
            <SidebarRight />
        </div>
    );
};

export default PublicPage;