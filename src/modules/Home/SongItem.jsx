import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi'); // Thiết lập ngôn ngữ mặc định là tiếng Việt

const SongItem = ({ data = {} }) => {
    return (
        <div className='w-full flex-auto flex p-[10px] gap-3 cursor-pointer hover:rounded-md hover:bg-E7 hover:transition-colors 
        hover:ease-in-out hover:duration-500'
        >
            <img src={data?.thumbnail} alt="thumbnail" className='w-[60px] h-[60px] object-cover rounded-md' />
            <div className='flex flex-col'>
                <div className='text-sm font-semibold text-gray-800'>
                    {data?.title?.length > 40 ? data.title.slice(0, 39) + '...' : data.title}
                </div>
                <div className='text-xs font-light'>{data?.artistsNames}</div>
                <div className='text-xs font-light'>
                    {moment(data?.releaseDate * 1000).fromNow()}
                </div>
            </div>
        </div>
    );
};

export default React.memo(SongItem);
