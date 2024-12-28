import React, { useEffect } from 'react';
import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import { Thumbnail, ListSongs } from '../../modules/Playlist';
import { SlUserFollow } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailPlaylistRedux } from '../../redux/action';
import * as actions from '../../redux/action'

const PLaylistPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    const playLists = useSelector(state => state?.music?.playLists);

    useEffect(() => {
        if (params?.pid)
            dispatch(fetchDetailPlaylistRedux(params.pid));
    }, [params?.pid]);

    useEffect(() => {
        if (location?.state?.playAlbum && !_.isEmpty(playLists?.song)) {
            const randomIndex = Math.floor(Math.random() * +playLists.song?.total);
            dispatch(actions.setCurrentSongRedux(playLists.song?.items[randomIndex]?.encodeId));
        }
    }, [playLists]);

    //xl:max-w-[calc(100vw-240px-330px)]
    if (!params?.pid) return null;
    return (
        <div className='w-full'>
            <div className='w-full flex flex-row px-12 pt-5 gap-5 mb-12'>
                <div className='basis-2/6 h-fit flex flex-col text-center items-center gap-3 px-4'>
                    <Thumbnail
                        thumbnail={playLists?.thumbnail} title={playLists?.playList}
                        contentLastUpdate={playLists?.contentLastUpdate} artistsNames={playLists?.artistsNames}
                        like={playLists?.like} />
                </div>

                <div className='basis-4/6'>
                    <div className='mb-4'>
                        <span className='text-gray-600'>Lời tựa:  </span>
                        <span className='text-[13px] tracking-wide'> {playLists?.sortDescription}</span>
                    </div>
                    <ListSongs />
                </div>
            </div>

            <div className='px-12 mb-10'>
                <div className='text-xl font-[600] text-gray-800 mb-4'>Nghệ sĩ tham gia</div>
                <div className='w-full grid grid-cols-4 gap-x-5 gap-y-10'>
                    {playLists?.artists?.length > 0 && playLists.artists.map(item => (
                        <div key={item?.id} className='h-[330px] flex flex-col items-center gap-4'>
                            <div
                                className='h-[200px] w-full max-w-[200px] rounded-full  bg-cover bg-no-repeat bg-center transition-transform duration-300 ease-in-out hover:scale-110'
                                style={{ backgroundImage: `url(${item?.thumbnail})` }}
                            />
                            <div className='flex-auto flex flex-col items-center gap-2'>
                                <div className='text-base font-semibold text-gray-800'>{item?.name}</div>
                                <div className='font-light text-xs'>{`${item?.totalFollow} người theo dõi`}</div>
                                <div>
                                    <button className=' flex bg-[#9b4de0] text-[#ffffff] px-4 py-2 rounded-xl items-center gap-2'>
                                        <SlUserFollow /> <span>Quan tâm</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
};

export default PLaylistPage;