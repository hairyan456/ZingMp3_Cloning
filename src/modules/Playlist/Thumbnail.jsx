import React, { useEffect } from 'react';
import moment from 'moment';
import icons from '../../utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import AdioSpinner from '../../components/Audio/AdioSpinner';
import { setIsPLayingRedux } from '../../redux/action/musicAction';

const { CiHeart, HiOutlineDotsHorizontal, FaRegPlayCircle } = icons;
const Thumbnail = ({ playlists = {} }) => {
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.music.isPlaying);
    const currentSongId = useSelector(state => state.music.currentSongId);

    const checkCurrentSong = (playlist = [], curSongId) => {
        if (playlist?.length <= 0 || !curSongId) return;
        const isSongInPlaylist = playlist.some(song => song.encodeId === curSongId);
        return isSongInPlaylist;
    };

    return (
        <>
            <div className='w-full max-w-[250px] relative overflow-hidden cursor-pointer' onClick={() => dispatch(setIsPLayingRedux(!isPlaying))}>
                <div style={{ backgroundImage: `url(${playlists?.thumbnail})` }}
                    className={`h-[250px] bg-cover bg-no-repeat bg-center ${isPlaying && checkCurrentSong(playlists?.song?.items, currentSongId) ? 'animate-rotateCenter' : 'animate-none'}`}
                />
                <div className={`overlay absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay-30 ${isPlaying ? 'hover:rounded-full' : 'rounded-none'} hover:transition-all flex items-center justify-center`}>
                    {(isPlaying && checkCurrentSong(playlists?.song?.items, currentSongId)) ? <AdioSpinner /> : <FaRegPlayCircle className='text-white' size={50} />}
                </div>
            </div>
            <h3 className='font-semibold text-lg text-gray-800'>{playlists?.title}</h3>
            <div className='text-sm'>
                <span>Cập nhật: </span>
                <span className='font-light'>{moment.unix(playlists?.contentLastUpdate).format("DD/MM/YYYY")}</span>
            </div>
            <div className='text-xs text-gray-800'>{playlists?.artistsNames}</div>
            <div className='text-xs font-light'>{`${playlists?.like ?? 0} người yêu thích`}</div>
            <div>
                <button className='bg-[#9b4de0] text-[#ffffff] px-6 py-3 rounded-xl text-lg'>Phát tất cả</button>
            </div>
            <div className='mt-5 flex justify-center gap-4'>
                <span title='Thêm vào thư viện' className='cursor-pointer'><CiHeart size={24} /></span>
                <span title='Khác' className='cursor-pointer'><HiOutlineDotsHorizontal size={24} /></span>
            </div>
        </>
    );
};

export default Thumbnail;