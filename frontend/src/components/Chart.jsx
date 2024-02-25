import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

const LineChart = ({ data, judul }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartRef && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');

            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels.reverse(),
                    datasets: [
                        {
                            label: judul,
                            data: data.values.reverse(),
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: [
                            {
                                type: 'linear',
                                position: 'bottom',
                            },
                        ],
                        y: [
                            {
                                type: 'linear',
                                position: 'left',
                            },
                        ],
                    },
                },
            });
        }
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default LineChart;
