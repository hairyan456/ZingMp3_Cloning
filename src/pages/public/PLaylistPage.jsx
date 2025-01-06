import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import { Thumbnail, ListSongs } from '../../modules/Playlist';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailPlaylistRedux } from '../../redux/action';
import * as actions from '../../redux/action'
import Artist from '../../modules/Artist/Artist';
import LoadingComponent from '../../components/Loading/LoadingComponent';

const PLaylistPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    const playLists = useSelector(state => state?.music?.playLists);
    const playlistRef = useRef(null);

    useEffect(() => {
        if (playlistRef?.current) {
            playlistRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    }, []);

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
        <>
            {_.isEmpty(playLists) ?
                <div className='w-full h-[60vh] flex items-center justify-center'>
                    <LoadingComponent width={50} height={50} />
                </div>
                :
                <div className='w-full px-3 sm:px-6 md:px-12' ref={playlistRef}>
                    <div className='w-full flex flex-row pt-5 gap-5 mb-12'>
                        <div className='basis-2/6 h-fit flex flex-col text-center items-center gap-3 px-4'>
                            <Thumbnail playlists={playLists} />
                        </div>

                        <div className='basis-4/6'>
                            <div className='mb-4'>
                                <span className='text-gray-600'>Lời tựa:  </span>
                                <span className='text-[11px] md:text-[13px] tracking-wide'> {playLists?.sortDescription}</span>
                            </div>
                            <ListSongs />
                        </div>
                    </div>

                    <div className='mb-10'>
                        <div className='text-lg md:text-xl font-[600] text-gray-800 mb-4'>Nghệ sĩ tham gia</div>
                        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-5 gap-y-10'>
                            {playLists?.artists?.length > 0 && playLists.artists.map(item => (
                                <Artist key={item?.id} data={item} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PLaylistPage;