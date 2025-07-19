import HeaderNav from "../Header.jsx";
import {useEffect, useState} from "react";
import {MovieService} from "../ApiService.js";
import SkeletonCatalog from "../components/SkeletonCatalog.jsx";
import RatingTrendChart from "../components/RatingTrendChart.jsx";
import BudgetVsRevenueChart from "../components/budgetVsRevenue.jsx";
import AverageRuntimeChart from "../components/AverageRuntimeCard.jsx";

const Analytics = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [yearTrend, setYearTrend] = useState(null);
    const [genres, setGenreDistribution] = useState(null);
    const [revenueVsBudget, setRevenueVsBudget] = useState(null);
    const [runtime, setRuntime] = useState(null);
    const [fromDate, setFromDate] = useState("2010-01-01");
    const [toDate, setToDate] = useState("2017-01-01");


    useEffect(() => {

        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch all data in parallel
                const [trends, revenueBudget, runtime, genres] = await Promise.all([
                    MovieService.getRatingTrend(fromDate, toDate),
                    MovieService.getBudgetVsRevenue(fromDate, toDate),
                    MovieService.getAvgRuntime(),
                    MovieService.genreHeatMap(),
                ]);

                // Update state
                setYearTrend(trends.ts);
                setRevenueVsBudget(revenueBudget.ts);
                setRuntime(runtime.ts);
                setGenreDistribution(genres.ts)
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);
    return (
        <>{loading ? <SkeletonCatalog/> : (

            <div className="min-h-screen bg-gray-900 text-white">
                <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
                    <HeaderNav tab="analytics"/>
                    <h2 className="text-3xl font-bold mb-8">Analytics Dashboard</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">


                        {/* Rating Trend Chart */}
                        <RatingTrendChart yearTrend={yearTrend}/>
                        {/* Budget vs Revenue Chart */}
                        <BudgetVsRevenueChart revenueVsBudget={revenueVsBudget}/>
                    </div>

                    {/* Runtime & Genre Heatmap */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AverageRuntimeChart runtime={runtime}/>
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">
                                Genre Popularity Heatmap
                            </h2>
                            <div className="h-64 grid grid-cols-3 grid-rows-3 gap-2">
                                {genres.slice(0, 9).map((movie) => (
                                    <div
                                        key={movie._id}
                                        className="flex items-center justify-center p-2 bg-opacity-70 rounded-lg text-center"
                                        style={{
                                            backgroundColor: `rgba(59, 130, 246,)`,
                                        }}
                                    >
                                        <div>
                                            <div className="font-medium">{movie._id}</div>
                                            <div className="text-xs mt-1">
                                                {movie.titleCount} titles
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )}


        </>
    );
};

export default Analytics;
