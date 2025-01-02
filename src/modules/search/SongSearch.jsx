import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistSongsRedux } from '../../redux/action';
import { ListSongs } from '../Playlist';
import _ from 'lodash';

const SongSearch = () => {
    const searchData = useSelector(state => state.music.searchData);
    const artistSongs = useSelector(state => state.music.artistSongs);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtistSongsRedux(searchData?.top?.id));
    }, [searchData]);

    if (artistSongs?.length <= 0) return null;
    return (
        <div className='w-full px-[60px] pb-10'>
            <ListSongs songsData={artistSongs ?? []} />
        </div>
    );
};

export default React.memo(SongSearch);