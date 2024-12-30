import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { SongItem } from '../../modules/Home';

const ChartComponent = ({ className = '' }) => {
    const chart = useSelector(state => state.app?.chart);
    const rank = useSelector(state => state.app?.rank);
    const [data, setData] = useState(null);

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
            legend: false
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
        <div className={`${className} `}>
            <div className='p-5 flex flex-col gap-3 rounded-md bg-[rgba(115,20,140,0.8)]'>
                <h3 className='font-semibold text-xl text-white'>#ZingChart</h3>
                <div className='flex gap-3'>
                    <div className='basis-1/3 flex flex-col gap-3'>
                        {rank?.length > 0 && rank.filter((item, index) => index < 3).map((item, index) => (
                            <SongItem key={item?.encodeId} data={item}
                                order={index + 1}
                                percent={Math.round((item?.score / chart?.totalScore) * 100)}
                            />
                        ))}
                    </div>
                    <div className='basis-2/3'>
                        {data && <Line data={data} options={options} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChartComponent);