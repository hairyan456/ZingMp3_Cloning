import React from 'react';
import { ListSongItem } from './';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const ListSongs = ({ songsData = [] }) => {
    const playLists = useSelector(state => state?.music?.playLists);
    const data = playLists?.song ?? {};

    const converTotalDuration = (totalDuration = 0) => {
        const hours = Math.floor(totalDuration / 3600); // Tính số giờ
        const minutes = Math.floor((totalDuration % 3600) / 60); // Tính số phút

        return `${hours} giờ ${minutes} phút`;
    };

    if (_.isEmpty(data)) return null;
    return (
        <div className='w-full flex flex-col'>
            <div className='title flex uppercase p-[10px]'>
                <div className='basis-2/5 text-[10px] md:text-xs text-gray-600 font-semibold'>Bài hát</div>
                <div className='basis-2/5 text-[10px] md:text-xs text-gray-600 text-center font-semibold'>Album</div>
                <div className='basis-1/5 text-[10px] md:text-xs text-right text-gray-600 font-semibold'>Thời gian</div>
            </div>

            {songsData?.length > 0 ?
                <div className='flex flex-col gap-5'>
                    {songsData.map(item => (
                        <ListSongItem key={item?.encodeId} songData={item} />
                    ))}
                </div>
                :
                <>
                    <div className='flex flex-col gap-5'>
                        {data?.items?.length > 0 && data?.items?.map(item => (
                            <ListSongItem key={item?.encodeId} songData={item} />
                        ))}
                    </div>

                    <div className='mt-3 text-[12px]'>
                        {`${data?.total} bài hát - ${converTotalDuration(data?.totalDuration)}`}
                    </div>
                </>
            }
        </div>
    );
};

export default React.memo(ListSongs);