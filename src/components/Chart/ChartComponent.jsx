import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';

const options = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 4,
    scales: {
        y: {
            ticks: { display: false },
            grid: { borderDash: [1, 4], color: 'gray' }
        },
        x: {
            ticks: { color: 'white' },
            grid: { color: 'transparent' }
        }
    },
    plugins: {
        legend: false
    }
}

const ChartComponent = ({ className = '' }) => {
    const chart = useSelector(state => state.app?.chart);
    const rank = useSelector(state => state.app?.rank);

    const [data, setData] = useState(null);

    useEffect(() => {
        if (chart?.times && chart?.items) {
            const labels = chart.times.filter(item => +item.hour % 2 === 0).map(item => item.hour);
            const datasets = Object.keys(chart.items).slice(0, 3).map((key, i) => ({
                data: chart.items[key].filter(item => +item.hour % 2 === 0).map(item => item.counter),
                borderColor: ['blue', 'yellow', 'red'][i], // Lấy màu theo chỉ số
                tension: 0.2,
                borderWidth: 2
            }));
            setData({ labels, datasets });
        }
    }, [chart]);


    return (
        <div className={`${className} `}>
            <div className='p-5 flex flex-col gap-3 rounded-md bg-[rgba(115,20,140,0.8)]'>
                <h3 className='font-semibold text-xl text-white'>#ZingChart</h3>
                <div className='flex gap-4'>
                    <div className='basis-1/3  border border-white'>rank</div>
                    <div className='basis-2/3 '>
                        {data && <Line data={data} options={options} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ChartComponent);