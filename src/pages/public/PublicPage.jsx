import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../modules/Home';
import Header from '../../components/Header/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollTopRedux } from '../../redux/action';

// flex-none: chiếm cố định (0 0 auto)
// flex-auto: (flex-grow + flex-shrink + flex-basis: 1 1 auto): có thể co dãn
const PublicPage = () => {
    const { singer } = useParams();
    const { currentSongId } = useSelector(state => state.music);
    const dispatch = useDispatch();
    const [isShowSidebarRight, setIsShowSidebarRight] = useState(true);

    const outletRef = useRef(null);
    const [outletHeight, setOutletHeight] = useState(0);

    const handleScrollTop = (e) => {
        if (singer) {
            dispatch(setScrollTopRedux(e?.target?.scrollTop === 0 ? true : false));
        }
    };

    useEffect(() => {
        const outletElement = outletRef.current;

        const resizeObserver = new ResizeObserver(() => {
            // Cập nhật lại chiều cao khi thay đổi
            setOutletHeight(outletElement.offsetHeight);
        });

        // Bắt đầu theo dõi thay đổi chiều cao
        if (outletElement) {
            resizeObserver.observe(outletElement);
        }

        // Dọn dẹp observer khi component bị hủy
        return () => {
            if (outletElement) {
                resizeObserver.unobserve(outletElement);
            }
        };
    }, [outletHeight]);

    return (
        <div className='w-full min-h-screen flex flex-col bg-CE relative'>
            <div className='w-full h-full flex flex-auto'>
                <SidebarLeft />
                <div className='flex-auto'>
                    <Header />
                    <PerfectScrollbar
                        style={{ maxHeight: !currentSongId ? 'calc(100vh - 90px)' : 'calc(100vh - 160px)' }}
                        onScroll={handleScrollTop}
                    >
                        <div ref={outletRef}>
                            <Outlet />
                        </div>
                    </PerfectScrollbar>
                </div>
                {isShowSidebarRight && <SidebarRight />}
            </div>
            <Player setShowRightSidebar={setIsShowSidebarRight} />
        </div>
    );
};

export default PublicPage;