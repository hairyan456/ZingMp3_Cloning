import React from 'react';
import CardItem from '../Card/CardItem';
import { useNavigate } from 'react-router-dom';

const SectionComponent = ({ className = '', dataItems = [] }) => {
    const navigate = useNavigate();

    const navigateDetailPlayList = (url) => {
        const match = url.match(/\/album\/(.*?)\.html/);
        if (match)
            navigate(`/playlist/${match[1]}`);
    }

    return (
        <div className={`${className} `}>
            <h3 className='font-semibold text-xl mb-5'>Best of 2024</h3>
            <div className='w-full xl:max-w-[calc(100vw-240px)] grid grid-cols-4 gap-x-5 gap-y-10'>
                {dataItems?.length > 0 && dataItems.map(item => (
                    <CardItem key={item?.encodeId} className={`w-full h-[330px] `}
                        item={item}
                        navigate={() => navigateDetailPlayList(item?.link)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SectionComponent;