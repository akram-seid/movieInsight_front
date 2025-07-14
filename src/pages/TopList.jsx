import HeaderNav from "../Header.jsx";
import {useEffect, useState} from "react";
import {MovieService} from "../ApiService.js";

const TopList = () => {
    const [topN, setTopN] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [topList, setTopList] = useState([]);

    useEffect(() => {


        const fetchAllData = async () => {
            try {
                setLoading(true);
                const data = await MovieService.getTopN(topN);
                if (data.status === true) {
                    setTopList(data.ts);
                }

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();

    }, [topN]);

    const formatDate = (dateInput) => {
        let date;

        // Handle different date formats
        if (typeof dateInput === 'number') {
            // If it's milliseconds
            date = new Date(dateInput);
        } else if (typeof dateInput === 'string') {
            // If it's a string date
            date = new Date(dateInput);
        } else {
            // Fallback
            date = new Date(dateInput);
        }

        // Format as "Jan 23 2013"
        return date.toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
                <HeaderNav tab="top"/>
                <h2 className="text-3xl font-bold mb-8">Top-N Lists</h2>
                <div className="w-full max-w-xs mb-4">
                    <label htmlFor="number" className="block text-sm font-medium text-white mb-1">
                        Select top number
                    </label>
                    <select
                        id="number"
                        name="number"
                        value={topN}
                        onChange={(e) => setTopN(Number(e.target.value))}
                        className="block w-full px-3 py-2 border border-gray-300 bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {topList.map((data) => (
                        <div key={data.genre} className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Top {data.genre} Movies</h2>
                            <ol className="space-y-3">
                                {data.summaries.map((movie) => (
                                    <li key={movie.title} className="flex justify-between items-center">
                  <span className="font-medium">
                    {movie.title}
                  </span>
                                        <span className="text-sm text-gray-400">
                    {formatDate(movie.year)} • {movie.vote.toFixed(1)}
                  </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopList;
