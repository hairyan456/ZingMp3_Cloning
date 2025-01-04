import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getChartHome } from '../../services/musicService';
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import _ from 'lodash';
import { SongItem } from '../../modules/Home';
import icons from '../../utils/icons';
import { ListSongItem } from '../../modules/Playlist';

const { FaRegPlayCircle } = icons;

const ZingChartPage = () => {
    const [chartData, setChartData] = useState([]);
    const [data, setData] = useState(null);
    const [isShowAll, setShowAll] = useState(false);
    const [songs, setSongs] = useState([]);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const chartRef = useRef();
    const [tooltipData, setTooltipData] = useState(null)

    const options = useMemo(() => ({
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(0,0,0,0.2)', drawTicks: false },
                min: chartData?.RTChart?.chart?.minScore,
                max: chartData?.RTChart?.chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'gray' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef?.current) return
                    if (+tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
                        return
                    }
                    const counters = [];
                    if (chartData?.RTChart?.chart?.items) {
                        for (let i = 0; i < 3; i++) {
                            counters.push({
                                encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
                                data: chartData?.RTChart?.chart?.items[Object.keys(chartData?.RTChart?.chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter)
                            })
                        }
                    }
                    setTooltipData(counters.find(i => i.data.some(n => n === +tooltip.body[0].lines[0].replace(',', '')))?.encodeId)
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY,
                    }
                    if (!_.isEqual(tooltipState, newTooltipData))
                        setTooltipState(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }), [chartData]);

    const fetchChartHome = async () => {
        try {
            let res = await getChartHome();
            if (res?.err === 0) {
                setChartData(res?.data)
            }
            else toast.warn(res?.msg);
        } catch (error) {
            console.log(error);
            toast.error(error?.message);
        }
    }

    useEffect(() => {
        document.title = '#zingchart | Xem bài hát, Album hiện hành';
        fetchChartHome();
    }, []);


    useEffect(() => {
        if (chartData?.RTChart?.chart?.times && chartData?.RTChart?.chart?.items) {
            const labels = chartData.RTChart.chart.times.filter(item => +item.hour % 2 === 0).map(item => `${item.hour}:00`);
            const datasets = Object.keys(chartData.RTChart.chart.items).slice(0, 3).map((key, i) => ({
                data: chartData.RTChart.chart.items[key].filter(item => +item.hour % 2 === 0).map(item => item.counter),
                borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                tension: 0.3,
                borderWidth: 2,
                pointHoverRadius: 5,
                pointBackgroundColor: 'white',
                pointHitRadius: 4,
                pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
                animation: false,
                pointHoverBorderWidth: 4
            }));
            setData({ labels, datasets });
        }
    }, [chartData]);

    useEffect(() => {
        if (chartData?.RTChart?.items?.length > 0)
            setSongs(!isShowAll ? chartData?.RTChart?.items?.filter(((item, index) => index < 10))
                : chartData?.RTChart?.items);
    }, [isShowAll, chartData]);

    return (
        <div className='w-full flex flex-col px-[60px] gap-y-8 pb-10'>
            <div className='flex gap-2 items-center text-0F'>
                <h3 className='font-semibold text-xl  cursor-pointer hover:text-opacity-45'>#ZingChart</h3>
                <span><FaRegPlayCircle size={25} /></span>
            </div>
            <div className='w-[98%] h-[300px] relative' onMouseLeave={() => setTooltipState(prev => ({ ...prev, opacity: 0 }))}>
                {data && (
                    <Line data={data} ref={chartRef} options={options} />
                )}

                <div className='tooltip text-white'
                    style={{
                        top: tooltipState.top, left: tooltipState.left, position: 'absolute',
                        opacity: tooltipState.opacity
                    }}
                >
                    <SongItem data={chartData?.RTChart?.items?.find(item => item?.encodeId === tooltipData)}
                        style={'bg-white text-black rounded-md'}
                    />
                </div>
            </div>
            <div className='w-full'>
                {songs?.length > 0 && songs.map((item, index) => (
                    <ListSongItem key={item?.encodeId} songData={item} order={index + 1} />
                ))}
            </div>
            <button className='px-6 mx-auto py-2 border text-sm w-fit text-0F border-[#0E8080] rounded-l-full 
            rounded-r-full hover:text-white hover:bg-0F hover:transition-colors'
                onClick={() => {setShowAll(p => !p)}}
            >
                {isShowAll ? 'Ẩn bớt' : 'Xem tất cả'}
            </button>
        </div>
    );
};

export default React.memo(ZingChartPage);

