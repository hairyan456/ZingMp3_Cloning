import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getDetailArtist } from '../../services/musicService';
import { useSelector } from 'react-redux';
import SectionComponent from '../../components/Section/SectionComponent';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import _ from 'lodash'

const PlaylistSearch = () => {
    const searchData = useSelector(state => state.music.searchData);
    const [playlists, setPlaylists] = useState([]);

    const fetchArtistPlaylist = async () => {
        try {
            let res = await getDetailArtist(searchData?.top?.alias);
            if (res?.err === 0) {
                setPlaylists(res?.data?.sections[1] ?? []);
            }
            else toast.warn(res?.msg);
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        if (searchData) {
            fetchArtistPlaylist();
        }
    }, [searchData]);

    if (playlists?.items?.length <= 0) return null;
    return (
        <>
            {_.isEmpty(playlists) ?
                <div className='w-full h-[60vh] flex items-center justify-center'>
                    <LoadingComponent width={50} height={50} />
                </div>
                :
                <div>
                    <SectionComponent className='px-6 md:px-[60px] pb-10' title={'Playlist / Album'} dataItems={playlists?.items} />
                </div>
            }
        </>

    );
};

export default React.memo(PlaylistSearch);