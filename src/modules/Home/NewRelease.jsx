import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonComponent from '../../components/Button/ButtonComponent';
import _ from 'lodash';
import SongItem from './SongItem';

const NewRelease = ({ className = '', }) => {
    const newRelease = useSelector(state => state.app.newRelease);
    const [isVietNamSong, setIsActive] = useState(true);

    if (_.isEmpty(newRelease)) return null;
    const songs = isVietNamSong ? newRelease?.vPop : newRelease?.others;

    return (
        <div className={`${className} flex flex-col gap-5`}>
            <h3 className='font-semibold text-xl'>Mới phát hành</h3>
            <div className='flex items-center gap-5 text-xs'>
                <ButtonComponent text={'Việt Nam'} className={`${isVietNamSong && 'bg-[#0F7070] text-white'} transition-all outline-none`}
                    onClick={() => setIsActive(p => !p)} />
                <ButtonComponent text={'Quốc tế'} className={`${!isVietNamSong && 'bg-[#0F7070] text-white'} transition-all outline-none`}
                    onClick={() => setIsActive(p => !p)} />
            </div>
            <div className='w-full grid grid-cols-2 lg:grid-cols-3 gap-1'>
                {songs?.length > 0 && songs?.map(item => (
                    <SongItem key={item?.encodeId} data={item} />
                ))}
            </div>
        </div>
    );
};

export default NewRelease;