import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Player, SidebarLeft, SidebarRight } from '../../modules/Home';
import Header from '../../components/Header/Header';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollTopRedux } from '../../redux/action';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


// flex-none: chiếm cố định (0 0 auto)
// flex-auto: (flex-grow + flex-shrink + flex-basis: 1 1 auto): có thể co dãn
const PublicPage = () => {
    const { singer } = useParams();
    const { currentSongId } = useSelector(state => state.music);
    const dispatch = useDispatch();
    const [isShowSidebarRight, setIsShowSidebarRight] = useState(true);
    const [toggleSidebarRight, setToggleSidebarRight] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    // Theo dõi sự thay đổi chiều rộng
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Gắn sự kiện resize
        window.addEventListener('resize', handleResize);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log('Window width changed:', windowWidth);
    }, [windowWidth]);

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
                {windowWidth < 1385 &&
                    <button className={`absolute top-1/2 outline-none transition-all transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full
                    ${toggleSidebarRight ? 'right-[236px] duration-1000 z-50' : 'right-1 duration-700'}`}
                        onClick={() => setToggleSidebarRight(p => !p)}
                    >
                        {toggleSidebarRight ? <FaArrowRight size={16} /> : <FaArrowLeft size={16} />}
                    </button>
                }
                {(toggleSidebarRight && windowWidth < 1385) &&
                    <SidebarRight className={'absolute h-[calc(100vh-90px)] right-0 z-20 bg-CE flex flex-col'} />
                }
            </div>
            <Player setShowRightSidebar={setIsShowSidebarRight} />
        </div>
    );
};

export default PublicPage;