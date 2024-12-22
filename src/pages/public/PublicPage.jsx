import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../modules/Home';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/action';
import Header from '../../components/Header/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';

// flex-none: chiếm cố định (0 0 auto)
// flex-auto: (flex-grow + flex-shrink + flex-basis: 1 1 auto): có thể co dãn
const PublicPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setCurrentSongRedux('Z7FAFOWF'));
    }, [])

    return (
        <div className='w-full min-h-screen flex flex-col bg-CE relative'>
            <div className='w-full h-full flex flex-auto'>
                <SidebarLeft />
                <div className='flex-auto'>
                    <Header />
                    <PerfectScrollbar style={{ maxHeight: 'calc(100vh - 160px)' }}>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
                <SidebarRight />
            </div>
            <Player />
        </div>
    );
};

export default PublicPage;