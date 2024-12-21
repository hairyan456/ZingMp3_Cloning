import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailPlaylist } from '../../services/musicService';
import { toast } from 'react-toastify';
import moment from 'moment';

const PLaylistPage = () => {
    const params = useParams();
    const [playList, setPlayList] = useState({});

    const fetchPlayList = async () => {
        try {
            const res = await getDetailPlaylist(params?.pid);
            if (res?.err === 0)
                setPlayList(res?.data ?? {});
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        if (params?.pid)
            fetchPlayList();
    }, [params?.pid]);

    return (
        <div className='w-full h-[calc(100vh-90px)] overflow-y-auto pb-24 flex flex-row px-12 pt-5 gap-8'>
            <div className='basis-2/6 flex flex-col text-center gap-3 px-4'>
                <div className='h-[250px] bg-cover bg-no-repeat bg-center transition-transform duration-300 ease-in-out 
                hover:scale-110 shadow-md'
                    style={{ backgroundImage: `url(${playList?.thumbnail})` }} />
                <h3 className='font-semibold text-lg text-gray-800'>{playList?.title}</h3>
                <div className='text-sm'>
                    <span>Cập nhật: </span>
                    <span className='font-light'>{moment.unix(playList?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                </div>
                <div className='text-xs text-gray-800'>{playList?.artistsNames}</div>
                <div className='text-xs font-light'>{`${playList?.like} người yêu thích`}</div>
            </div>

            <div className='basis-4/6'>

            </div>
        </div>
    );
};

export default PLaylistPage;