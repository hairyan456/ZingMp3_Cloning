import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/action'

moment.locale('vi'); // Thiết lập ngôn ngữ mặc định là tiếng Việt

const SongItem = ({ data = {} }) => {
    const dispatch = useDispatch();

    const playSong = (sId) => {
        if (!sId) return;
        dispatch(actions.setCurrentSongRedux(sId));
    };

    return (
        <div className='w-full flex-auto flex p-[10px] gap-3 cursor-pointer hover:rounded-md hover:bg-E7 hover:transition-colors 
        hover:ease-in-out hover:duration-500'
            onClick={() => playSong(data?.encodeId)}
        >
            <img src={data?.thumbnail} alt="thumbnail" className='w-10 h-10 xl:w-[60px] xl:h-[60px] object-cover rounded-md' />
            <div className='flex flex-col gap-1'>
                <div className='text-[12px] lg:text-sm font-semibold text-gray-800'>
                    {data?.title?.length > 40 ? data.title.slice(0, 39) + '...' : data.title}
                </div>
                <div className='text-[10px] lg:text-xs font-light'>
                    {data?.artistsNames?.length > 30 ? data.artistsNames.slice(0, 29) + '...' : data.artistsNames}
                </div>
                <div className='text-[10px] lg:text-xs font-light'>
                    {moment(data?.releaseDate * 1000).fromNow()}
                </div>
            </div>
        </div>
    );
};

export default React.memo(SongItem);
