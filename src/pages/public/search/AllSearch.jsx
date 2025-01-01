import React from 'react';
import { useSelector } from 'react-redux';

const AllSearch = () => {
    const searchData = useSelector(state => state.music.searchData);

    const handleNumber = (number) => {
        if (number > Math.pow(10, 6))
            return `${Math.round(number * 10 / Math.pow(10, 6)) / 10}M`;
        else
            return `${Math.round(number * 10 / Math.pow(10, 3)) / 10}K`
    }

    return (
        <div className='w-full flex flex-col px-[60px]'>
            <div className='flex flex-col'>
                <h3 className='text-base font-semibold mb-5'>Nổi bật</h3>
                <div className='grid grid-cols-3 gap-x-8'>
                    {searchData?.top &&
                        <div className='p-[10px] bg-E7 flex gap-6 items-center rounded-md'>
                            <img src={searchData?.top?.thumbnail} alt="avatar"
                                className={`w-16 h-w-16 object-cover ${searchData?.top?.objectType === 'artist' && "rounded-full"}`}
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
                    <div>
                        Song 1
                    </div>
                    <div>
                        Song 2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllSearch;