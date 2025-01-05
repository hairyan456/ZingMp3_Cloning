import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import icons from '../../utils/icons';
import ChartRank from '../../modules/Chart/ChartRank';
import _ from 'lodash';
import LoadingComponent from '../../components/Loading/LoadingComponent';

const { FaRegPlayCircle } = icons;

const WeekRankPage = ({ weekChart = [] }) => {
    const { title, pid } = useParams();
    console.log(weekChart?.find(item => item?.link?.includes(pid)))

    useEffect(() => {
        document.title = '#zingchart Tuần';
    }, []);

    if ((!title && !pid) || weekChart?.length <= 0) return null;
    return (
        <>
            {_.isEmpty(weekChart) ?
                <div className='w-full h-[60vh] flex items-center justify-center'>
                    <LoadingComponent width={50} height={50} />
                </div>
                :
                <div className='w-full px-[60px] flex flex-col gap-y-8 pb-10'>
                    <div className='flex gap-2 items-center text-0F'>
                        <h3 className='font-semibold text-2xl  cursor-pointer hover:text-opacity-45'>Bảng xếp hạng tuần</h3>
                        <span><FaRegPlayCircle size={28} /></span>
                    </div>

                    <div className='flex items-center'>
                        {weekChart?.length > 0 && weekChart.map(item => (
                            <NavLink key={item?.link} to={`${item?.link?.split('.')[0]}`}
                                className={({ isActive }) => `text-lg uppercase px-4
                            ${isActive ? 'text-0F border-b-2  border-green-900 leading-[52px] font-bold transition-colors ease-in-out duration-400'
                                        : 'text-32 font-medium '}`
                                }
                            >
                                {item?.country === 'vn' ? 'VIỆT NAM' : item?.country === 'us' ? 'US-UK' : 'KPOP'}
                            </NavLink>
                        ))}
                    </div>

                    <ChartRank data={weekChart?.find(item => item?.link?.includes(pid))?.items} />

                </div>
            }
        </>
    );
};

export default WeekRankPage;