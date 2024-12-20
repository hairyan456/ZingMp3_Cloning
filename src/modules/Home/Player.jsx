import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDetailSong } from '../../services/musicService';
import { toast } from 'react-toastify';
import { CiHeart } from "react-icons/ci";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Player = () => {
    const { currentSongId } = useSelector(state => state.music);
    const [infoSong, setInfoSong] = useState({});

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
        fetchDetailSong()
    }, [currentSongId]);


    if (!currentSongId)
        return null;
    return (
        <div className='w-full h-[90px] flex-none flex bg-C0 px-5 animate-slideUp'>
            <div className='basis-1/4 flex items-center gap-6'>
                <img src={infoSong?.thumbnail} alt="thumbnail" className='w-14 h-14 object-cover rounded-md' />
                <div className='flex flex-col text-xs gap-2'>
                    <span className='font-medium text-gray-700'>{infoSong?.title}</span>
                    <span className='text-gray-500'>{infoSong?.artistsNames}</span>
                </div>
                <div className='flex flex-auto justify-around'>
                    <span className='cursor-pointer'><CiHeart size={16} /></span>
                    <span><HiOutlineDotsHorizontal size={16} /></span>
                </div>
            </div>
            <div className='basis-2/4 bg-yellow-200'>b</div>
            <div className='basis-1/4 bg-green-200'>c</div>
        </div>
    );
};

export default Player;