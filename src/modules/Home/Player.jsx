import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailSong, getSong } from '../../services/musicService';
import { toast } from 'react-toastify';
import icons from '../../utils/icons';
import { setPlayingSongRedux } from '../../redux/action/musicAction';

const { FaHeart, HiOutlineDotsHorizontal, CiHeart, CiRepeat, MdOutlineSkipNext, MdOutlineSkipPrevious, CiShuffle,
    FaRegPlayCircle, FaRegPauseCircle } = icons;

const Player = () => {
    const { currentSongId, isPlaying } = useSelector(state => state.music);
    const dispatch = useDispatch();

    const [infoSong, setInfoSong] = useState({});
    const [sourceSong, setSourceSong] = useState('');
    const [isLike, setIsLike] = useState(false);
    const audio = new Audio(sourceSong);

    const fetchSong = async () => {
        try {
            const res = await getSong('Z7FAFOWF');
            if (res?.err === 0)
                setSourceSong(res?.data['128']);
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    const fetchDetailSong = async () => {
        try {
            const res = await getDetailSong('Z7FAFOWF');
            if (res?.err === 0)
                setInfoSong(res?.data ?? {});
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        fetchDetailSong();
        fetchSong();

    }, [currentSongId]);

    const handleTogglePlaying = () => {
        dispatch(setPlayingSongRedux(!isPlaying));
    }

    if (!currentSongId) return null;
    return (
        <div className='w-full h-[90px] flex-none flex bg-C0 px-5 animate-slideUp'>
            <div className='basis-1/4 flex items-center gap-6 border border-r-gray-200'>
                <img src={infoSong?.thumbnail} alt="thumbnail" className='w-14 h-14 object-cover rounded-md' />
                <div className='flex flex-col text-xs gap-2'>
                    <span className='font-medium text-gray-700'>{infoSong?.title}</span>
                    <span className='text-gray-500'>{infoSong?.artistsNames}</span>
                </div>
                <div className='flex flex-auto justify-around'>
                    <span className='cursor-pointer' onClick={() => setIsLike(p => !p)}>
                        {!isLike ? <CiHeart size={16} /> : <FaHeart size={13} />}
                    </span>
                    <span><HiOutlineDotsHorizontal size={16} /></span>
                </div>
            </div>
            <div className='basis-2/4 flex flex-col items-center justify-center gap-4'>
                <div className='flex  items-center gap-6'>
                    <span title='Bật phát ngẫu nhiên' className='ct-icon-music-player'> <CiShuffle size={24} /></span>
                    <span className='ct-icon-music-player'><MdOutlineSkipPrevious size={25} /></span>
                    <span className='ct-icon-music-player' onClick={handleTogglePlaying}>
                        {!isPlaying ? <FaRegPlayCircle size={28} /> : <FaRegPauseCircle size={28} />}
                    </span>
                    <span className='ct-icon-music-player'><MdOutlineSkipNext size={25} /></span>
                    <span title='Bật phát lại tất cả' className='ct-icon-music-player'><CiRepeat size={24} /></span>
                </div>
                <div>
                    Progress bar
                </div>
            </div>
            <div className='basis-1/4 border border-l-gray-200'>c</div>
        </div>
    );
};

export default Player;