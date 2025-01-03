import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDetailArtist } from '../../services/musicService';
import { toast } from 'react-toastify';
import { SlUserFollow } from "react-icons/sl";
import icons from '../../utils/icons';
import ListSongItem from '../../modules/Playlist/ListSongItem';
import SectionComponent from '../../components/Section/SectionComponent';
import Artist from '../../modules/Artist/Artist';

const { FaRegPlayCircle } = icons;

const SingerPage = () => {
    const params = useParams();
    const [singerData, setSingerData] = useState(null);
    const singerRef = useRef(null);

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
        if (singerRef?.current)
            singerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        if (params?.singer)
            fetchDetailArtist(params.singer);
    }, [params?.singer]);

    if (!params?.singer) return null;
    return (
        <div className='w-full flex flex-col'>
            <div ref={singerRef} className='w-full relative'>
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

            <div className='w-full mt-[30px] px-[60px] flex gap-5 mb-6'>
                <div className='basis-2/5 flex flex-col gap-y-5'>
                    <h3 className='font-semibold text-base text-gray-800'>Album nổi bật</h3>
                    <div className='flex gap-x-4 p-4 pr-11 bg-[#C4CDCC] rounded-md'>
                        <img src={singerData?.sections[2]?.items[0]?.thumbnail} alt="thumbnail"
                            className='w-[100px] h-[100px] object-cover rounded-md' />
                        <div className='flex flex-col text-xs gap-3 opacity-80'>
                            <span className='text-gray-500'>{singerData?.sections[2]?.items[0]?.textType}</span>
                            <div className='flex flex-col'>
                                <span className='text-sm font-semibold text-gray-800 opacity-100'>{singerData?.sections[2]?.items[0]?.title}</span>
                                <span className='text-xs'>{singerData?.sections[2]?.items[0]?.artistsNames}</span>
                            </div>
                            <span >{singerData?.sections[2]?.items[0]?.releaseDate}</span>
                        </div>
                    </div>
                </div>
                <div className='basis-3/5 flex flex-col gap-y-5'>
                    <h3 className='font-semibold text-base text-gray-800 ml-2'>Bài hát nổi bật</h3>
                    <div className='w-full grid grid-cols-2 gap-x-5 gap-y-2'>
                        {singerData?.sections?.find(item => item?.sectionType === 'song')?.items?.filter((item, index) => index < 6)
                            ?.map(item => (
                                <ListSongItem key={item?.encodeId} songData={item} showAlbum={false} />
                            ))}
                    </div>
                </div>
            </div>

            <div className='w-full'>
                {singerData?.sections?.filter(item => item.sectionType === 'playlist')?.map((item, index) => (
                    <div key={index} className='w-full mb-6'>
                        <SectionComponent className='px-6 md:px-[60px]'
                            title={item?.title}
                            dataItems={item?.items} />
                    </div>
                ))}
            </div>

            <div className='artists w-full px-[60px] flex flex-col mb-6'>
                <h3 className='text-base font-semibold mb-5'>
                    {singerData?.sections?.find(item => item.sectionType === 'artist')?.title}
                </h3>
                <div className='w-full grid grid-cols-4 gap-x-5 gap-y-4'>
                    {singerData?.sections?.find(item => item.sectionType === 'artist')?.items?.map(item => (
                        <Artist key={item?.id} data={item} />
                    ))}
                </div>
            </div>

            <div className='about w-full px-[60px]'>
                <h3 className='text-base font-semibold mb-5'>{`Về ${singerData?.name}`}</h3>
                <div className='flex gap-8'>
                    <img src={singerData?.thumbnailM} alt="thumbnail_artist"
                        className='w-[45%] h-[330px] flex-none object-cover rounded-md'
                    />
                    <div className='flex flex-col gap-8 text-xs leading-5 font-light'>
                        <p dangerouslySetInnerHTML={{ __html: singerData?.biography }} />
                        <div className='flex flex-col'>
                            <span className='text-[20px] font-semibold text-gray-700'>{Number(singerData?.follow?.toFixed(1)).toLocaleString()}</span>
                            <span> Người quan tâm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingerPage;