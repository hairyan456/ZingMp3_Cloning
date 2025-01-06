import React, { useEffect } from 'react';
import _ from 'lodash';
import icons from '../../utils/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action'
import { useLocation } from 'react-router-dom';

const { CiMusicNote1 } = icons;

const ListSongItem = ({ songData = {}, showAlbum = true, ...props }) => {
    const dispatch = useDispatch();
    const currentSongId = useSelector(state => state.music.currentSongId);

    const playSong = (sId) => {
        if (!sId) return;
        dispatch(actions.setCurrentSongRedux(sId));
        dispatch(actions.setRecentSongsRedux(songData));
    };

    if (_.isEmpty(songData)) return null;
    return (
        <div className={`flex items-center px-2 py-2 gap-4 md:gap-6 hover:bg-E7 hover:rounded-md hover:transition-colors hover:ease-in-out hover:duration-500 
        ${songData?.encodeId === currentSongId ? 'bg-E7 rounded-md' : ''}`}
        >
            <div className={`${!showAlbum ? 'basis-4/5' : 'basis-2/5'} flex items-center gap-2 cursor-pointer`}
                onClick={() => playSong(songData?.encodeId)}
            >
                {props?.order ?
                    <span className={`${showAlbum ? 'text-[30px]' : 'text-base'} text-[rgba(115,20,140,0.8)]  
                    ${showAlbum ? 'w-16 max-w-16 flex items-center justify-center' : 'w-3 max-w-3'}
                    ${props?.order === 1 ? 'ct-text-shadow-no1' : props?.order === 2 ? 'ct-text-shadow-no2' : props?.order === 3 ?
                            'ct-text-shadow-no3' : 'ct-text-shadow-other'}`}
                    >
                        {props.order}
                    </span>
                    :
                    showAlbum && <span><CiMusicNote1 /></span>
                }
                <img src={songData?.thumbnail ?? ''} alt="thumbnail" className='w-8 h-w-8 object-cover rounded-md' />
                <div className='flex flex-col items-start gap-2'>
                    <div className='text-xs font-medium'>
                        {songData?.title?.length > 20 ? `${songData.title.slice(0, 19)}...` : songData.title}
                    </div>
                    <div className='text-[10px] md:text-xs text-gray-600'>{songData?.artistsNames}</div>
                </div>
            </div>
            {showAlbum &&
                <div className='basis-2/5 text-[10px] md:text-xs text-center font-light'>
                    {songData?.album?.title}
                </div>
            }

            <div className={`${!showAlbum ? 'basis-1/5 ' : 'basis-1/5 '}flex justify-end text-[10px] md:text-xs font-light`}>
                {songData?.duration && moment.utc(songData?.duration * 1000).format("mm:ss")}
            </div>
        </div>
    );
};

export default React.memo(ListSongItem);