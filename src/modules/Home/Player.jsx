import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailSong, getSong } from '../../services/musicService';
import { toast } from 'react-toastify';
import icons from '../../utils/icons';
import moment from 'moment';

const { FaHeart, HiOutlineDotsHorizontal, CiHeart, CiRepeat, MdOutlineSkipNext, MdOutlineSkipPrevious, CiShuffle,
    FaRegPlayCircle, FaRegPauseCircle } = icons;

let intervalId = null;
const Player = () => {
    const { currentSongId } = useSelector(state => state.music);
    const dispatch = useDispatch();

    const [infoSong, setInfoSong] = useState({});
    const [sourceSong, setSourceSong] = useState('');
    const [isLike, setIsLike] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [currentSeconds, setCurrentSeconds] = useState(0);

    const audio = useRef(new Audio());
    const thumbRef = useRef();

    const fetchSong = async () => {
        try {
            const res = await getSong(currentSongId);
            if (res?.err === 0)
                setSourceSong(res?.data['128']);
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    const fetchDetailSong = async () => {
        try {
            const res = await getDetailSong(currentSongId);
            if (res?.err === 0)
                setInfoSong(res?.data ?? {});
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        if (currentSongId) {
            fetchDetailSong();
            fetchSong();
            setIsPlaying(true);
        }
    }, [currentSongId]);

    // Xử lý phát nhạc
    useEffect(() => {
        if (sourceSong) {
            if (isFirstLoad) {
                setIsFirstLoad(false);
                setIsPlaying(false);
                return;
            }

            if (audio.current.src !== sourceSong) {
                // Nếu source khác với source hiện tại, thì cập nhật và tải lại audio
                audio.current.src = sourceSong;
                audio.current.load();
            }

            if (isPlaying) {
                audio.current.play().catch(err => console.error('Audio play error:', err));
            } else {
                audio.current.pause();
            }
        }

        // Cleanup khi unmount component
        return () => {
            audio.current.pause();
        };
    }, [sourceSong, isPlaying, isFirstLoad]);


    // Xử lý progress bar khi phát nhạc
    useEffect(() => {
        if (isPlaying) {
            intervalId = setInterval(() => {
                let percent = Math.round(audio.current.currentTime * 10000 / infoSong?.duration) / 100;
                thumbRef.current.style.cssText = `right:${100 - percent}%`;
                setCurrentSeconds(Math.round(audio.current.currentTime));
            }, 200);
        }
        else
            intervalId && clearInterval(intervalId);

        return () => {
            // Cleanup: clear interval when effect is unmounted or dependencies change
            intervalId && clearInterval(intervalId);
        };
    }, [isPlaying]);

    if (!currentSongId) return null;
    return (
        <div className='w-full h-[90px] flex-none flex bg-C0 px-5 animate-slideUp fixed bottom-0'>
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
                <div className='flex items-center gap-6'>
                    <span title='Bật phát ngẫu nhiên' className='ct-icon-music-player'> <CiShuffle size={24} /></span>
                    <span className='ct-icon-music-player'><MdOutlineSkipPrevious size={25} /></span>
                    <span className='ct-icon-music-player' onClick={() => setIsPlaying(p => !p)}>
                        {!isPlaying ? <FaRegPlayCircle size={28} /> : <FaRegPauseCircle size={28} />}
                    </span>
                    <span className='ct-icon-music-player'><MdOutlineSkipNext size={25} /></span>
                    <span title='Bật phát lại tất cả' className='ct-icon-music-player'><CiRepeat size={24} /></span>
                </div>

                <div className='w-[80%] flex items-center justify-center gap-5'>
                    <span className='start-time text-xs'>{moment.utc(currentSeconds * 1000).format("mm:ss")}</span>
                    <div className='w-full h-[3px] rounded-full relative bg-[rgba(0,0,0,0.1)]'>
                        <div ref={thumbRef} className='absolute rounded-full top-0 left-0 h-[3px] bg-[#0e8080]' />
                    </div>
                    <span className='end-time text-xs'>
                        {infoSong?.duration && moment.utc(infoSong?.duration * 1000).format("mm:ss")}
                    </span>
                </div>
            </div>
            <div className='basis-1/4 border border-l-gray-200'>c</div>
        </div>
    );
};

export default Player;