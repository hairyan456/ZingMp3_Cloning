import React from 'react';
import { Outlet } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../modules/Home';
import Header from '../../components/Header/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';

// flex-none: chiếm cố định (0 0 auto)
// flex-auto: (flex-grow + flex-shrink + flex-basis: 1 1 auto): có thể co dãn
const PublicPage = () => {
    const { currentSongId } = useSelector(state => state.music);

    return (
        <div className='w-full min-h-screen flex flex-col bg-CE relative'>
            <div className='w-full h-full flex flex-auto'>
                <SidebarLeft />
                <div className='flex-auto'>
                    <Header />
                    <PerfectScrollbar style={{
                        maxHeight: !currentSongId ? 'calc(100vh - 90px)' : 'calc(100vh - 160px)'
                    }}>
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