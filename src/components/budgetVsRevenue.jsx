import {useState} from "react";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import {Bar} from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
);

export default function BudgetVsRevenueChart({revenueVsBudget}) {
    const [visibleBars, setVisibleBars] = useState(8);

    const filteredData = revenueVsBudget.slice(0, visibleBars);

    const chartData = {
        labels: filteredData.map((item, i) => `${item.year}`),
        datasets: [
            {
                label: "Budget (Expense)",
                data: filteredData.map((item) => item.expense),
                backgroundColor: "#10b981",
            },
            {
                label: "Revenue (Income)",
                data: filteredData.map((item) => item.income),
                backgroundColor: "#3b82f6",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Budget vs Revenue",
                color: "#fff",
                font: {size: 18},
            },
            legend: {
                labels: {color: "#fff"},
            },
            tooltip: {
                callbacks: {
                    label: (context) => `$${context.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            x: {
                stacked: false,
                ticks: {color: "#fff"},
                grid: {color: "rgba(255,255,255,0.1)"},
            },
            y: {
                ticks: {
                    color: "#fff",
                    callback: (value) => `$${value / 1000}k`,
                },
                grid: {color: "rgba(255,255,255,0.1)"},
            },
        },
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <Bar data={chartData} options={chartOptions}/>
        </div>
    );
}
