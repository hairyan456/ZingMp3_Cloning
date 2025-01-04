import React, { useEffect, useState } from 'react';
import { ListSongItem } from '../Playlist';

const ChartRank = ({ className = '', data = [], hideButton = false, ...props }) => {
    const [isShowAll, setShowAll] = useState(false);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        if (data?.length > 0)
            setSongs(!isShowAll ? data?.filter(((item, index) => index < 10)) : data);
    }, [isShowAll, data]);

    return (
        <div className={`w-full ${className}`}>
            {songs?.length > 0 && songs.map((item, index) => (
                <ListSongItem key={item?.encodeId} showAlbum={props?.showAlbum} songData={item} order={index + 1} />
            ))}
            {!hideButton &&
                <div className='flex items-center justify-center mt-4'>
                    <button className='px-6 py-2 border text-sm w-fit text-0F border-[#0E8080] rounded-l-full 
            rounded-r-full hover:text-white hover:bg-0F hover:transition-colors'
                        onClick={() => { setShowAll(p => !p) }}
                    >
                        {isShowAll ? 'Ẩn bớt' : 'Xem tất cả'}
                    </button>
                </div>}
        </div>
    );
};

export default React.memo(ChartRank);