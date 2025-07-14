import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Title,
    Legend
);

export default function AverageRuntimeChart({runtime}) {
    // Only show last 20 years for better visibility
    const filteredRuntime = runtime.slice(-20);

    const chartData = {
        labels: filteredRuntime.map((item) => item.year || `Y${item._id}`),
        datasets: [
            {
                label: "Avg Runtime (min)",
                data: filteredRuntime.map((item) => item.time),
                backgroundColor: "#f59e0b",
                borderRadius: 4,
                barThickness: 18,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Average Runtime Per Year (in minutes)",
                color: "#fff",
                font: {size: 18},
            },
            legend: {display: false},
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y} min`,
                },
            },
        },
        scales: {
            x: {
                ticks: {color: "#fff"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
            y: {
                ticks: {
                    color: "#fff",
                    callback: (value) => `${value}m`,
                },
                grid: {color: "rgba(255,255,255,0.1)"},
            },
        },
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">
                Average Runtime Per Year (in minutes)
            </h2>
            <Bar data={chartData} options={chartOptions}/>
        </div>
    );
}
