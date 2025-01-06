import React, { useState } from 'react';
import { SlUserFollow } from "react-icons/sl";
import { TbSwitch3 } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Artist = ({ data = {}, ...props }) => {
    const [isHover, setIsHover] = useState(false);

    const handleNumber = (number) => {
        if (number > Math.pow(10, 6))
            return `${Math.round(number * 10 / Math.pow(10, 6)) / 10}M`;
        else if (number > Math.pow(10, 3))
            return `${Math.round(number * 10 / Math.pow(10, 3)) / 10}K`;
        return number;
    }

    return (
        <div className='h-fit flex flex-col items-center gap-4 cursor-pointer'>
            <Link className='w-[150px] xs:w-[180px] sm:w-[170px] md:w-[140px] lg:w-full flex justify-center' to={data?.link}>
                <div
                    className={`h-[150px] xs:h-[180px] sm:h-[170px] md:h-[140px] lg:h-[160px] xl:h-[200px] w-full max-w-[200px] rounded-full relative bg-cover bg-no-repeat bg-center
                ${isHover ? 'animate-scale-up-image' : 'animate-scale-down-image'}`}
                    style={{ backgroundImage: `url(${data?.thumbnail})` }}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    {isHover &&
                        <div className='absolute z-50 transition-all top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-full
                    flex items-center justify-center text-white'>
                            <TbSwitch3 size={25} />
                        </div>
                    }
                </div>
            </Link>

            <div className='flex-auto flex flex-col items-center gap-2'>
                <Link to={data?.link}>
                    <div className='text-base font-semibold text-gray-800 hover:text-0F hover:underline hover:transition-all'>
                        {data?.name}
                    </div>
                </Link>
                <div className='font-light text-xs'>{`${data?.totalFollow && handleNumber(+data.totalFollow)} người theo dõi`}</div>
                <div>
                    <button className=' flex bg-[#9b4de0] text-[#ffffff] px-4 py-2 rounded-xl items-center gap-2'>
                        <SlUserFollow /> <span>Quan tâm</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Artist;