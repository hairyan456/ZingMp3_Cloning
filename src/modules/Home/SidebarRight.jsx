import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { SongItem } from './';
import { MdOutlineNavigateNext } from "react-icons/md";
import PerfectScrollbar from 'react-perfect-scrollbar';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import _ from 'lodash'

const SidebarRight = ({ className = '' }) => {
    const currentSongId = useSelector(state => state.music.currentSongId);
    const isPlaying = useSelector(state => state.music.isPlaying);
    const currentSongData = useSelector(state => state.music.currentSongData);
    const playLists = useSelector(state => state?.music?.playLists);
    const recentSongs = useSelector(state => state?.music?.recentSongs);
    const [isRecent, setIsRecent] = useState(false);

    useEffect(() => {
        if (isPlaying)
            setIsRecent(false);
    }, [isPlaying, currentSongId]);


    return (
        <div className={`w-[250px] flex-none animate-slideLeft border border-l-gray-400 
        ${className ? className : 'hidden sideBarRight:flex sideBarRight:flex-col'}`}>
            <div className='h-[70px] flex-none py-[14px] px-2 gap-8 flex items-center justify-between'>
                <div className='text-[10px] text-nowrap  gap-3 flex flex-auto justify-center bg-E7 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer'>
                    <span className={`py-[5px] flex-1 flex justify-center rounded-l-full rounded-r-full items-center
                    ${!isRecent && 'bg-DD font-medium'}`}
                        onClick={() => setIsRecent(p => !p)}
                    >
                        Danh sách phát
                    </span>
                    <span className={`py-[5px] flex-1 flex justify-center rounded-l-full rounded-r-full items-center
                    ${isRecent && 'bg-DD font-medium'}`}
                        onClick={() => setIsRecent(p => !p)}
                    >
                        Nghe gần đây
                    </span>
                </div>
                <span title='Xóa tất cả' className='p-2 rounded-full cursor-pointer transition-colors hover:bg-E7'>
                    <RiDeleteBin6Line size={14} />
                </span>
            </div>

            {_.isEmpty(playLists) ?
                <div className='w-full h-[60vh] flex items-center justify-center'>
                    <LoadingComponent width={50} height={50} />
                </div>
                :
                <>
                    {!isRecent ?
                        <div className='flex-auto flex-col text-xs px-2'>
                            {currentSongId && <SongItem data={currentSongData} sm={true} style={'bg-E7 rounded-lg'} />}
                            <div className='flex flex-col text-sm pt-4 px-2 pb-1'>
                                <span className='font-medium flex items-center'>Tiếp theo <MdOutlineNavigateNext size={14} /></span>
                                <span className='opacity-70 text-xs flex gap-2'>
                                    <span className='text-nowrap '>Từ playlist </span>
                                    <span className='font-semibold text-[10px] text-0F tracking-wider'>
                                        {currentSongData?.album?.title?.length > 30 ? currentSongData?.album?.title.slice(0, 30) + '...' : currentSongData?.album?.title}
                                    </span>
                                </span>
                            </div>
                            <PerfectScrollbar style={{ maxHeight: !currentSongId ? 'calc(100vh - 190px)' : 'calc(100vh - 310px)' }}>
                                <div className='flex flex-col'>
                                    {playLists?.song?.items?.length > 0 && playLists.song.items.map(item => (
                                        <SongItem key={item?.encodeId} data={item} sm={true} />
                                    ))}
                                </div>
                            </PerfectScrollbar>
                        </div>
                        :
                        <div>
                            <PerfectScrollbar style={{ maxHeight: !currentSongId ? 'calc(100vh - 70px)' : 'calc(100vh - 160px)' }}>
                                <div className='flex flex-col'>
                                    {recentSongs?.length > 0 && recentSongs.map(item => (
                                        <SongItem key={item?.encodeId} data={item} sm={true} />
                                    ))}
                                </div>
                            </PerfectScrollbar>
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default React.memo(SidebarRight);