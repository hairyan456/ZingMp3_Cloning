import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistSongsRedux } from '../../redux/action';
import { ListSongs } from '../Playlist';
import _ from 'lodash';
import LoadingComponent from '../../components/Loading/LoadingComponent';

const SongSearch = () => {
    const searchData = useSelector(state => state.music.searchData);
    const artistSongs = useSelector(state => state.music.artistSongs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtistSongsRedux(searchData?.top?.id));
    }, [searchData]);

    if (artistSongs?.length <= 0) return null;
    return (
        <>
            {_.isEmpty(artistSongs) ?
                <div className='w-full h-[60vh] flex items-center justify-center'>
                    <LoadingComponent width={50} height={50} />
                </div>
                :
                <div className='w-full px-[60px] pb-10'>
                    <ListSongs songsData={artistSongs ?? []} />
                </div>
            }
        </>

    );
};

export default React.memo(SongSearch);