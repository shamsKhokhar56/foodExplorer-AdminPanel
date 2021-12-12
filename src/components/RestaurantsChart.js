
import React from 'react';
import { Chart } from 'primereact/chart';
import './RestaurantsChart.css'

const RestaurantsChart = () => {
    const chartData = {
        labels: ['Faisalabad', 'Islamabad', 'Karachi', 'Lahore', 'Rawalpindi'],
        datasets: [
            {
                data: [300, 500, 50, 200, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#E59934",
                    "#66BB6A",
                    "#FFE652",
                    "#98BAE7"

                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#E59934",
                    "#81C784",
                    "#FFE652",
                    "#98BAE7"
                ]
            }
        ]
    };

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };

    return (
        <div className="chartStyles">
            <Chart type="pie" data={chartData} options={lightOptions} style={{ width: '70%' }} />
        </div>
    )
}

export default RestaurantsChart;
                 