import React from 'react';
import { useSelector } from 'react-redux';
import { SongItem } from '../Home';
import { ListSongItem } from '../Playlist';
import SectionComponent from '../../components/Section/SectionComponent';
import Artist from '../Artist/Artist';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const AllSearch = () => {
    const searchData = useSelector(state => state.music.searchData);
    const navigate = useNavigate();

    const handleNumber = (number) => {
        if (number > Math.pow(10, 6))
            return `${Math.round(number * 10 / Math.pow(10, 6)) / 10}M`;
        else
            return `${Math.round(number * 10 / Math.pow(10, 3)) / 10}K`
    }

    if (_.isEmpty(searchData)) return <div className='w-full font-medium text-lg px-[60px]'>Không tìm thấy dữ liệu !</div>
    return (
        <div className='w-full flex flex-col px-[60px] pb-10 gap-12'>
            <div className='special flex flex-col'>
                <h3 className='text-base font-semibold mb-5'>Nổi bật</h3>
                <div className='grid grid-cols-3 gap-x-8'>
                    {searchData?.top &&
                        <div className='p-[10px] bg-E7 flex gap-6 items-center rounded-md cursor-pointer'
                            onClick={() => navigate(searchData.artists[0]?.link)}
                        >
                            <img src={searchData?.top?.thumbnail} alt="avatar"
                                className={`w-16 h-w-16 object-cover 
                                ${searchData?.top?.objectType === 'artist' && "rounded-full"}`}
                            />
                            <div className='flex flex-col gap-1'>
                                <span className='font-medium text-xs'>
                                    {searchData?.top?.objectType === 'artist' ? "Nghệ sĩ" : 'Bài hát'}
                                </span>
                                <span className='text-gray-800 font-semibold text-sm'>{searchData?.top?.name ?? searchData?.top?.title}</span>
                                {searchData?.top?.objectType === 'artist' &&
                                    <span className='text-xs'>
                                        {handleNumber(searchData.artists[0]?.totalFollow) + '  quan tâm'}
                                    </span>
                                }
                            </div>
                        </div>
                    }
                    {searchData?.songs?.filter((item, index) => [...Array(2).keys()].some(i => i === index))?.map(item => (
                        <SongItem key={item?.encodeId} data={item} style={'bg-DD rounded-md'} />
                    ))}
                </div>
            </div>

            <div className='songs flex flex-col'>
                <h3 className='text-base font-semibold mb-5'>Bài hát</h3>
                <div className='w-full grid grid-cols-2 gap-x-10 gap-y-2'>
                    {searchData?.songs?.length > 0 && searchData?.songs?.map(item => (
                        <ListSongItem key={item?.encodeId} songData={item} showAlbum={false} />
                    ))}     
                </div>
            </div>


            <div className='album w-full'>
                {searchData?.playlists?.length > 0 &&
                    <SectionComponent title={'Playlist / Album'} dataItems={searchData.playlists} />
                }
            </div>

            <div className='artists flex flex-col'>
                <h3 className='text-base font-semibold mb-5'>Nghệ sĩ tham gia</h3>
                <div className='w-full grid grid-cols-4 gap-x-5 gap-y-10'>
                    {searchData?.artists?.length > 0 && searchData.artists.map(item => (
                        <Artist key={item?.id} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllSearch;