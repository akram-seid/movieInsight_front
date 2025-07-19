import React, {useState} from "react";
import HeaderNav from "../Header.jsx";

const ForumAnalytics = () => {
    const [replies, setReplies] = useState([
        {
            id: 1,
            user: "MovieBuff2023",
            avatar: "https://picsum.photos/id/106/200/200",
            content:
                "This film completely blew my mind! The cinematography was stunning.",
            timestamp: "2 hours ago",
        },
        {
            id: 2,
            user: "CinemaLover",
            avatar: "https://picsum.photos/id/107/200/200",
            content:
                "I loved the twist in the third act. Totally didn't see it coming!",
            timestamp: "3 hours ago",
        },
        {
            id: 3,
            user: "FilmStudent99",
            avatar: "https://picsum.photos/id/108/200/200",
            content: "Great use of color grading to reflect emotional arcs.",
            timestamp: "5 hours ago",
        },
    ]);

    const analyticsData = {
        totalThreads: 142,
        totalReplies: 876,
        activeUsers: 124,
        dailyActivity: [12, 18, 14, 22, 20, 25, 30],
        topContributors: [
            {name: "User123", posts: 42},
            {name: "CinemaLover", posts: 37},
            {name: "MovieBuff2023", posts: 35},
        ],
    };
    

    return (
        <div>
            <div className="min-h-screen bg-gray-900 text-white">
                <HeaderNav tab={"forumAnalytics"}/>

                {/* Content Area */}
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Analytics Dashboard */}
                    <>
                        <h1 className="text-3xl font-bold mb-8">Forum Analytics</h1>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-800 p-6 rounded-lg shadow">
                                <h2 className="text-sm uppercase text-gray-400 tracking-wide">
                                    Total Threads
                                </h2>
                                <p className="text-3xl font-semibold mt-1">
                                    {analyticsData.totalThreads}
                                </p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow">
                                <h2 className="text-sm uppercase text-gray-400 tracking-wide">
                                    Total Replies
                                </h2>
                                <p className="text-3xl font-semibold mt-1">
                                    {analyticsData.totalReplies}
                                </p>
                            </div>
                            <div className="bg-gray-800 p-6 rounded-lg shadow">
                                <h2 className="text-sm uppercase text-gray-400 tracking-wide">
                                    Active Users
                                </h2>
                                <p className="text-3xl font-semibold mt-1">
                                    {analyticsData.activeUsers}
                                </p>
                            </div>
                        </div>

                        {/* Daily Activity Chart */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow mb-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Daily Forum Activity
                            </h2>
                            <div className="h-40 relative">
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 350 150"
                                    className="absolute top-0 left-0"
                                >
                                    {analyticsData.dailyActivity.map((value, i) => (
                                        <rect
                                            key={i}
                                            x={i * 45}
                                            y={150 - value * 4}
                                            width="30"
                                            height={value * 4}
                                            fill="#3b82f6"
                                            rx="3"
                                            ry="3"
                                        />
                                    ))}
                                </svg>
                            </div>
                        </div>

                        {/* Top Contributors */}
                        <div className="bg-gray-800 p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">Top Contributors</h2>
                            <ul className="space-y-3">
                                {analyticsData.topContributors.map((contributor, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span className="font-medium">{contributor.name}</span>
                                        <span className="bg-green-500 px-3 py-1 rounded-full text-sm">
                      {contributor.posts} posts
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                </main>
            </div>
        </div>
    );
};

export default ForumAnalytics;
