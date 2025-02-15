import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailSong, getSong } from '../../services/musicService';
import { toast } from 'react-toastify';
import icons from '../../utils/icons';
import moment from 'moment';
import { setCurrentSongRedux, setIsPLayingRedux, setCurrentSongDataRedux } from '../../redux/action';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import _ from 'lodash';

const { FaHeart, HiOutlineDotsHorizontal, CiHeart, CiRepeat, MdOutlineSkipNext, MdOutlineSkipPrevious, CiShuffle,
    FaRegPlayCircle, FaRegPauseCircle, LuRepeat1, RiPlayListFill, FaVolumeMute, FaVolumeUp,
    IoMdVolumeHigh, FaVolumeDown } = icons;

let intervalId = null;
const Player = ({ setShowRightSidebar = () => { }, ...props }) => {
    // viết tách rời useSelector giúp component chỉ re-render khi 1 trong các state này thay đổi
    const currentSongId = useSelector(state => state.music.currentSongId);
    const playLists = useSelector(state => state.music.playLists);
    const isPlaying = useSelector(state => state.music.isPlaying);

    const dispatch = useDispatch();

    const [infoSong, setInfoSong] = useState({});
    const [sourceSong, setSourceSong] = useState('');
    const [isLike, setIsLike] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isShuffle, setIsShuffle] = useState(false); // lặp bài hát ngẫu nhiên
    const [isRepeat, setIsRepeat] = useState(0);
    const [isLoadingSong, setIsLoadingSong] = useState(false);
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [volume, setVolume] = useState(50);
    const [isHoverVolume, setHoverVolume] = useState(false);

    const audio = useRef(new Audio());
    const thumbRef = useRef();
    const trackRef = useRef();
    const volumeRef = useRef();

    const fetchSong = async () => {
        try {
            const res = await getSong(currentSongId);
            if (res?.err === 0)
                setSourceSong(res?.data['128']);
            else {
                setSourceSong('');
                toast.warn(res?.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    const fetchDetailSong = async () => {
        setIsLoadingSong(true);
        try {
            const res = await getDetailSong(currentSongId);
            if (res?.err === 0) {
                setInfoSong(res?.data ?? {});
                dispatch(setCurrentSongDataRedux(res?.data ?? {}));
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
        finally {
            setIsLoadingSong(false);
        }
    }

    useEffect(() => {
        if (currentSongId) {
            fetchDetailSong();
            fetchSong();
        }
    }, [currentSongId]);

    useEffect(() => {
        if (sourceSong) {
            if (isFirstLoad) {
                setIsFirstLoad(false);
                dispatch(setIsPLayingRedux(false))
                audio.current.src = sourceSong;
                audio.current.load();
                return;
            }

            if (audio.current.src !== sourceSong) { // Nếu chuyển bài hát
                audio.current.src = sourceSong;
                audio.current.load();
                dispatch(setIsPLayingRedux(true))
            }

            if (isPlaying) {
                audio.current.play().catch(err => console.error('Audio play error:', err));
            } else {
                audio.current.pause();
            }
        } else {
            // Xử lý khi không có source
            dispatch(setIsPLayingRedux(false))
            setCurrentSeconds(0)
            if (thumbRef?.current)
                thumbRef.current.style.cssText = `right: 100%`;
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
                let percent = Math.round(audio?.current?.currentTime * 10000 / infoSong?.duration) / 100;
                thumbRef.current.style.cssText = `right:${100 - percent}%`;
                setCurrentSeconds(Math.round(audio?.current?.currentTime));
            }, 200);
        }
        else
            intervalId && clearInterval(intervalId);

        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, [isPlaying]);

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle)
                handleShuffle()
            else if (isRepeat === 1 || isRepeat === 2) {
                isRepeat === 1 ? handleNextSong() : audio.current.play();
            }
            else
                dispatch(setIsPLayingRedux(false))
        };

        // Gắn addEventListener vào audio.current khi audio được load
        if (audio.current) {
            audio.current.addEventListener('ended', handleEnded);
        }

        // Cleanup khi component unmount hoặc audio thay đổi
        return () => {
            if (audio.current) {
                audio.current.removeEventListener('ended', handleEnded);
            }
        };
    }, [audio.current, isShuffle, isRepeat]); // Thêm vào dependencies để xử lý khi audio thay đổi

    useEffect(() => {
        audio.current.volume = volume / 100;

        if (volumeRef?.current) {
            volumeRef.current.style.cssText = `right: ${100 - volume}%`;
        }
    }, [volume]);

    // hàm click vào thanh progress bar để chuyển thời lượng phát nhạc
    const handleClickProgressBar = (e) => {
        try {
            if (!trackRef.current || !infoSong?.duration) return;
            const trackRect = trackRef.current.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            let percent = ((clientX - trackRect.left) / trackRect.width) * 100;
            percent = Math.min(100, Math.max(0, percent));
            thumbRef.current.style.cssText = `right:${100 - percent}%`;
            audio.current.currentTime = (percent / 100) * infoSong.duration;
            setCurrentSeconds(Math.round(audio.current.currentTime));
        } catch (error) {
            console.error('Error in handleClickProgressBar:', error);
        }
    };

    const handleToggleShuffle = () => {
        setIsShuffle(p => !p);
        setIsRepeat(0);
    }

    const handleToggleRepeat = () => {
        setIsRepeat(p => p === 2 ? 0 : p + 1);
        setIsShuffle(false);
    }

    const handlePrevSong = () => {
        if (playLists?.song?.items?.length > 0) {
            const currentIndex = playLists.song.items.findIndex(item => item.encodeId === currentSongId);
            if (currentIndex !== -1) {
                const prevIndex = (currentIndex - 1 + playLists.song.items.length) % playLists.song.items.length;
                dispatch(setCurrentSongRedux(playLists.song.items[prevIndex].encodeId));
            }
        }
    };

    const handleNextSong = () => {
        if (playLists?.song?.items?.length > 0) {
            const currentIndex = playLists.song.items.findIndex(item => item.encodeId === currentSongId);
            if (currentIndex !== -1) {
                const nextIndex = (currentIndex + 1) % playLists.song.items.length;
                dispatch(setCurrentSongRedux(playLists.song.items[nextIndex].encodeId));
            }
        }
    };

    const handleShuffle = () => {
        if (playLists?.song?.items?.length > 0) {
            const randomIndex = Math.round(Math.random() * playLists.song.items.length) - 1;
            dispatch(setCurrentSongRedux(playLists.song.items[randomIndex].encodeId));
        }
    };

    if (!currentSongId) return null;
    return (
        <div className='w-full h-20 md:h-[90px] flex-none flex bg-C0 px-5 animate-slideUp fixed bottom-0'>
            {_.isEmpty(infoSong) ?
                <div className='basis-2/4 sm:basis-1/4 flex items-center justify-center'>
                    <LoadingComponent />
                </div>
                :
                <div className='basis-2/4 sm:basis-1/4 flex items-center gap-3 lg:gap-6 '>
                    <img src={infoSong?.thumbnail} alt="thumbnail" className='w-10 h-10 md:w-14 md:h-14 object-cover rounded-md' />
                    <div className='flex flex-col text-xs gap-2'>
                        <span className='font-medium text-gray-700'>
                            {infoSong?.title?.length > 20 ? infoSong.title.slice(0, 20) + '...' : infoSong.title}
                        </span>
                        <span className='text-gray-500'>{infoSong?.artistsNames}</span>
                    </div>
                    <div className='hidden lg:flex flex-auto justify-around'>
                        <span className='cursor-pointer' onClick={() => setIsLike(p => !p)}>
                            {!isLike ? <CiHeart size={16} /> : <FaHeart size={13} />}
                        </span>
                        <span><HiOutlineDotsHorizontal size={16} /></span>
                    </div>
                </div>
            }
            <div className='basis-2/4 flex flex-col items-center justify-center gap-4'>
                <div className='flex items-center gap-6'>
                    <span title='Bật phát ngẫu nhiên' className={`${isShuffle ? 'text-0F cursor-pointer' : 'ct-icon-music-player'}`}
                        onClick={handleToggleShuffle}>
                        <CiShuffle size={24} />
                    </span>
                    <span className='ct-icon-music-player' onClick={isShuffle ? handleShuffle : handlePrevSong}>
                        <MdOutlineSkipPrevious size={25} />
                    </span>
                    <span className='ct-icon-music-player' onClick={() => dispatch(setIsPLayingRedux(!isPlaying))}>
                        {isLoadingSong ? <LoadingComponent /> : !isPlaying ? <FaRegPlayCircle size={28} /> : <FaRegPauseCircle size={28} />
                        }
                    </span>
                    <span className={`${playLists?.song?.items?.length > 0 ? 'ct-icon-music-player' : 'opacity-20 cursor-not-allowed'}`}
                        onClick={isShuffle ? handleShuffle : handleNextSong}>
                        <MdOutlineSkipNext size={25} />
                    </span>
                    <span title='Bật phát lại tất cả' className={`${isRepeat !== 0 ? 'text-0F cursor-pointer' : 'ct-icon-music-player'}`}
                        onClick={handleToggleRepeat}>
                        {isRepeat !== 2 ? <CiRepeat size={24} /> : <LuRepeat1 size={24} />}
                    </span>
                </div>

                <div className='w-[80%] flex items-center justify-center gap-5'>
                    <span className='start-time text-xs'>{moment.utc(currentSeconds * 1000).format("mm:ss")}</span>
                    <div ref={trackRef}
                        className='w-full h-[3px] hover:h-[8px] cursor-pointer rounded-full relative bg-[rgba(0,0,0,0.1)]'
                        onClick={handleClickProgressBar}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 rounded-full bg-[#0e8080]' />
                    </div>
                    <span className='end-time text-xs'>
                        {infoSong?.duration && moment.utc(infoSong?.duration * 1000).format("mm:ss")}
                    </span>
                </div>
            </div>
            <div className='basis-1/4 hidden sm:flex items-center justify-end gap-3'>
                <div className='flex gap-2 items-center'
                    onMouseEnter={() => setHoverVolume(true)}
                    onMouseLeave={() => setHoverVolume(false)}
                >
                    <span className='cursor-pointer' onClick={() => setVolume(p => +p === 0 ? 70 : 0)}>
                        {+volume >= 70 ? <FaVolumeUp size={23} /> : +volume >= 40 ? <IoMdVolumeHigh size={23} /> :
                            +volume > 0 ? <FaVolumeDown size={23} /> : <FaVolumeMute size={23} />}
                    </span>
                    <div className={`w-20 md:w-[130px] h-1 bg-white rounded-l-full rounded-r-full ${isHoverVolume ? 'hidden' : 'relative'}`}>
                        <div ref={volumeRef} className='absolute left-0 bg-0F bottom-0 top-0 rounded-l-full 
                            rounded-r-full'/>
                    </div>
                    <input type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(+e.target.value)}
                        className={`w-20 md:w-[130px] ${isHoverVolume ? 'inline' : 'hidden'}`}
                    />
                </div>
                <span title='Danh sách phát' className='hidden sideBarRight:block sideBarRight:ct-icon-music-player'
                    onClick={() => setShowRightSidebar(p => !p)}>
                    <RiPlayListFill size={25} />
                </span>
            </div>
        </div>
    );
};

export default React.memo(Player);