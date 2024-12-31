import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { SongItem } from '../../modules/Home';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { path } from '../../utils/constant';
import icons from '../../utils/icons';

const { FaRegPlayCircle } = icons;

const ChartComponent = ({ className = '' }) => {
    const chart = useSelector(state => state.app?.chart);
    const rank = useSelector(state => state.app?.rank);
    const [data, setData] = useState(null);
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
                grid: { color: 'rgba(255,255,255,0.2)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: 'white' },
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
                    for (let i = 0; i < 3; i++) {
                        counters.push({
                            encodeId: Object.keys(chart?.items)[i],
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter)
                        })
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
    }), []);

    useEffect(() => {
        if (chart?.times && chart?.items) {
            const labels = chart.times.filter(item => +item.hour % 2 === 0).map(item => `${item.hour}:00`);
            const datasets = Object.keys(chart.items).slice(0, 3).map((key, i) => ({
                data: chart.items[key].filter(item => +item.hour % 2 === 0).map(item => item.counter),
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
    }, [chart]);

    return (
        <div className={`${className} rounded-md`}>
            <div className='p-5 flex flex-col gap-3 rounded-md bg-[rgba(115,20,140,0.8)]'>
                <Link to={path.ZING_CHART} className='flex gap-2 items-center'>
                    <h3 className='font-semibold text-xl text-white cursor-pointer hover:text-opacity-45'> #ZingChart</h3>
                    <span className='text-white'><FaRegPlayCircle size={25} /></span>
                </Link>
                <div className='flex gap-3'>
                    <div className='basis-1/3 flex flex-col gap-3'>
                        {rank?.length > 0 && rank.filter((item, index) => index < 3).map((item, index) => (
                            <SongItem key={item?.encodeId} data={item}
                                order={index + 1}
                                percent={Math.round((item?.score / chart?.totalScore) * 100)}
                                style={'text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#A874B8]'}
                            />
                        ))}
                        <Link to={path.ZING_CHART}
                            className='text-white mx-auto px-4 py-2 rounded-l-full rounded-r-full border border-white w-fit'>
                            Xem thêm
                        </Link>
                    </div>
                    <div className='basis-2/3 relative' onMouseLeave={() => setTooltipState(prev => ({ ...prev, opacity: 0 }))}>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div className='tooltip text-white'
                            style={{
                                top: tooltipState.top, left: tooltipState.left, position: 'absolute',
                                opacity: tooltipState.opacity
                            }}
                        >
                            <SongItem data={rank?.find(item => item?.encodeId === tooltipData)}
                                style={'bg-white text-black rounded-md'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChartComponent);