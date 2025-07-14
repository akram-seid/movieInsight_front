import {useState} from "react";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

export default function RatingTrendChart({yearTrend}) {
    const [visibleYears, setVisibleYears] = useState(5);

    const filteredTrend = yearTrend.slice(0, visibleYears);

    const chartData = {
        labels: filteredTrend.map((item) => item._id),
        datasets: [
            {
                label: "Average Rating",
                data: filteredTrend.map((item) => item.avgRating),
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                tension: 0.3,
                pointRadius: 4,
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {position: "top", labels: {color: "#fff"}},
            title: {
                display: true,
                text: "Rating Trend Over Time",
                color: "#fff",
                font: {size: 18},
            },
        },
        scales: {
            x: {
                ticks: {color: "#fff"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
            y: {
                min: 1,
                max: 5,
                ticks: {color: "#fff", stepSize: 1},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
        },
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <Line data={chartData} options={chartOptions}/>
        </div>
    );
}
