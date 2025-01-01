import React, { useEffect } from 'react';
import _ from 'lodash';
import icons from '../../utils/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action'
import { useLocation } from 'react-router-dom';

const { CiMusicNote1 } = icons;

const ListSongItem = ({ songData = {} }) => {
    const dispatch = useDispatch();
    const currentSongId = useSelector(state => state.music.currentSongId);

    const playSong = (sId) => {
        if (!sId) return;
        dispatch(actions.setCurrentSongRedux(sId));
        dispatch(actions.setRecentSongsRedux(songData));
    };

    if (_.isEmpty(songData)) return null;
    return (
        <div className={`flex items-center py-2 gap-6 hover:bg-E7 hover:transition-colors 
        hover:ease-in-out hover:duration-500 ${songData?.encodeId === currentSongId ? 'bg-E7' : ''}`}>
            <div className='basis-2/5 flex items-center gap-2 cursor-pointer' onClick={() => playSong(songData?.encodeId)}>
                <span><CiMusicNote1 /></span>
                <img src={songData?.thumbnail ?? ''} alt="thumbnail" className='w-8 h-w-8 object-cover rounded-md' />
                <div className='flex flex-col items-start gap-2'>
                    <div className='text-xs font-medium'>
                        {songData?.title?.length > 20 ? `${songData.title.slice(0, 19)}...` : songData.title}
                    </div>
                    <div className='text-xs text-gray-600'>{songData?.artistsNames}</div>
                </div>
            </div>
            <div className='basis-2/5 text-xs font-light'>
                {songData?.album?.title}
            </div>
            <div className='basis-1/5 text-xs font-light'>
                {songData?.duration && moment.utc(songData?.duration * 1000).format("mm:ss")}
            </div>
        </div>
    );
};

export default React.memo(ListSongItem);