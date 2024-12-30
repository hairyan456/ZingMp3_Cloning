import React from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/action'

moment.locale('vi'); // Thiết lập ngôn ngữ mặc định là tiếng Việt

const SongItem = ({ data = {}, ...props }) => {
    const dispatch = useDispatch();

    const playSong = (sId) => {
        if (!sId) return;
        dispatch(actions.setCurrentSongRedux(sId));
    };

    return (
        <div className={`w-full flex-auto flex p-[10px] items-center justify-between cursor-pointer hover:rounded-md hover:transition-colors 
        hover:ease-in-out hover:duration-300 
        ${props?.order ? 'text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#A874B8]' : 'text-black hover:bg-E7'}`}
            onClick={() => playSong(data?.encodeId)}
        >
            <div className='flex gap-3 items-center'>
                {props?.order &&
                    <span className={`text-[30px] text-white drop-shadow-md`}>
                        {props.order}
                    </span>
                }
                <img src={data?.thumbnail} alt="thumbnail"
                    className={`w-10 h-10 ${props?.order ? 'xl:w-[40px] xl:h-[40px]' : 'xl:w-[60px] xl:h-[60px]'} object-cover rounded-md`} />
                <div className='flex flex-col gap-1'>
                    <div className={`text-[12px] lg:text-sm font-semibold  ${!props?.order && 'text-gray-700'}`}>
                        {data?.title?.length > 40 ? data.title.slice(0, 39) + '...' : data.title}
                    </div>
                    <div className='text-[10px] lg:text-xs font-light'>
                        {data?.artistsNames?.length > 30 ? data.artistsNames.slice(0, 29) + '...' : data.artistsNames}
                    </div>
                    {!props?.order &&
                        <div className='text-[10px] lg:text-xs font-light'>
                            {moment(data?.releaseDate * 1000).fromNow()}
                        </div>
                    }
                </div>
            </div>
            {props?.percent && <span>{props.percent}%</span>}
        </div>
    );
};

export default React.memo(SongItem);
