import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../modules/Home';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action';

// flex-none: chiếm cố định (0 0 auto)
// flex-auto: (flex-grow + flex-shrink + flex-basis: 1 1 auto): có thể co dãn

const PublicPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setCurrentSongRedux('Z7FAFOWF'));
    }, [])

    return (
        <div className='w-full min-h-screen flex flex-col bg-CE overflow-x-hidden'>
            <div className='w-full h-full flex flex-auto'>
                <SidebarLeft />
                <div className='flex-auto'>
                    <Outlet />
                </div>
                <SidebarRight />
            </div>
            <Player />
        </div>
    );
};

export default PublicPage;