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
        ${props?.style ? props.style : 'text-black hover:bg-E7'}`}
            onClick={() => playSong(data?.encodeId)}
        >
            <div className='flex gap-3 items-center'>
                {props?.order &&
                    <span className={`text-[30px] text-[rgba(115,20,140,0.8)] ${props?.order === 1 ? 'ct-text-shadow-no1' : props?.order === 2 ? 'ct-text-shadow-no2'
                        : 'ct-text-shadow-no3'}`}>
                        {props.order}
                    </span>
                }
                <img src={data?.thumbnail} alt="thumbnail"
                    className={`w-10 h-10 ${props?.sm ? 'xl:w-10 xl:h-10' : 'xl:w-[60px] xl:h-[60px]'} object-cover rounded-md`} />
                <div className='flex flex-col gap-1'>
                    <div className={`text-xs font-semibold  ${!props?.order && 'text-gray-700'}`}>
                        {data?.title?.length > 30 ? data.title.slice(0, 30) + '...' : data.title}
                    </div>
                    <div className='text-[10px] lg:text-xs font-light'>
                        {data?.artistsNames?.length > 30 ? data.artistsNames.slice(0, 30) + '...' : data.artistsNames}
                    </div>
                    {!props?.sm &&
                        <div className='text-[10px] lg:text-xs font-light'>
                            {moment(data?.releaseDate * 1000).fromNow()}
                        </div>
                    }
                </div>
            </div>
            {props?.percent && <span className='font-bold'>{props.percent}%</span>}
        </div>
    );
};

export default React.memo(SongItem);
