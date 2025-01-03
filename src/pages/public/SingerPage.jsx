import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailArtist } from '../../services/musicService';
import { toast } from 'react-toastify';
import { SlUserFollow } from "react-icons/sl";
import icons from '../../utils/icons';

const { FaRegPlayCircle } = icons;

const SingerPage = () => {
    const params = useParams();
    const [singerData, setSingerData] = useState(null);

    const fetchDetailArtist = async (singer) => {
        try {
            let res = await getDetailArtist(singer);
            if (res?.err === 0) {
                setSingerData(res?.data);
            }
            else toast.warn(res?.msg);
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        if (params?.singer)
            fetchDetailArtist(params.singer);
    }, [params?.singer]);

    if (!params?.singer) return null;
    return (
        <div className='w-full flex flex-col'>
            <div className='w-full relative'>
                <img src={singerData?.cover} alt="singer_img" className='h-[400px] object-cover w-full' />
                <div className={`overlay absolute top-0 left-0 right-0 bottom-0 bg-overlay-30 text-white`} >
                    <div className='absolute bottom-0 pb-6 px-[60px]'>
                        <div className='flex gap-8 items-center'>
                            <h1 className='text-5xl font-semibold'>{singerData?.name}</h1>
                            <span className='text-0F hover:transition-colors hover:text-white cursor-pointer'>
                                <FaRegPlayCircle size={40} />
                            </span>
                        </div>
                        <div className='flex items-center gap-6 mt-4'>
                            <span className='text-sm'>
                                {`${Number(singerData?.totalFollow.toFixed(1)).toLocaleString().replace(',', '.')} người quan tâm`}
                            </span>
                            <button className=' flex bg-0F text-[#ffffff] px-4 py-1 rounded-l-full rounded-r-full 
                            items-center gap-2'
                            >
                                <SlUserFollow /> <span className='text-xs opacity-90'>Quan tâm</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SingerPage;