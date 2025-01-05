import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import _ from 'lodash';
import { SongItem } from '../../modules/Home';
import icons from '../../utils/icons';
import ChartRank from '../../modules/Chart/ChartRank';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/Loading/LoadingComponent';

const { FaRegPlayCircle } = icons;

const ZingChartPage = ({ chartData = {} }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0,
    });
    const chartRef = useRef();
    const [tooltipData, setTooltipData] = useState(null)
    const zingChartRef = useRef(null);

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

    useEffect(() => {
        if (zingChartRef?.current)
            zingChartRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        document.title = '#zingchart | Xem bài hát, Album hiện hành';
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

    if (_.isEmpty(chartData)) return null;
    return (
        <>
            {_.isEmpty(chartData) ?
                <div className='w-full h-[60vh] flex items-center justify-center'>
                    <LoadingComponent width={50} height={50} />
                </div>
                :
                <div className='w-full flex flex-col px-[60px] gap-y-8 pb-10' ref={zingChartRef}>
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
                    <ChartRank data={chartData?.RTChart?.items} />
                    <div className='w-full flex flex-col gap-8'>
                        <h3 className='text-0F font-semibold text-2xl mt-4'>Bảng Xếp Hạng Tuần</h3>
                        <div className='w-full grid grid-cols-3 gap-x-4'>
                            {chartData?.weekChart && Object.entries(chartData.weekChart)?.map((item) => (
                                <div className='flex flex-col gap-4 bg-gray-200 rounded-lg px-[10px] py-5 relative' key={item[0]}>
                                    <div className='flex gap-2 text-xl uppercase items-center text-0F justify-center'>
                                        <h3 className='font-semibold '>
                                            {item[0] === 'vn' ? 'Việt Nam' : item[0] === 'us' ? 'US-UK' : item[0] === 'korea' ? 'Kpop' : ''}
                                        </h3>
                                        <span><FaRegPlayCircle size={20} /></span>
                                    </div>
                                    <ChartRank className='mb-12'
                                        data={item[1]?.items?.filter((item2, index) => index < 5)}
                                        showAlbum={false} hideButton={true}
                                    />
                                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
                                        <button className='px-4 py-2 border text-xs w-fit text-0F border-0F rounded-full 
                        hover:text-white hover:bg-0F hover:transition-colors'
                                            onClick={() => navigate(item[1]?.link?.replace('.html', ''))}
                                        >
                                            Xem tất cả
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>

    );
};

export default React.memo(ZingChartPage);

