import React, {useState} from "react";
import HeaderNav from "../Header.jsx";

const ForumAdmin = () => {
    const [activeTab, setActiveTab] = useState("analytics"); // analytics or thread
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

    const handleDeleteReply = (id) => {
        setReplies(replies.filter((reply) => reply.id !== id));
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-900 text-white">
                <HeaderNav/>

                <>
                    <h1 className="text-3xl font-bold mb-6">Discussion Thread</h1>

                    {/* Original Post */}
                    <div className="bg-gray-800 p-6 rounded-lg mb-6 max-w-3xl mx-auto">
                        <div className="flex items-start gap-4">
                            <img
                                src="https://picsum.photos/id/100/200/200"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full border-2 border-blue-500"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-400">
                      MovieBuff2023
                    </span>
                                    <span className="text-xs text-gray-400">2 hours ago</span>
                                </div>
                                <p className="mt-2 text-gray-200">
                                    I just finished watching this movie and I'm still processing
                                    everything! The third act twist was insane. What did
                                    everyone else think?
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Replies Section */}
                    <div className="space-y-4 mb-6 max-w-3xl mx-auto">
                        <h2 className="text-xl font-semibold mb-3">Replies</h2>

                        {replies.length === 0 ? (
                            <p className="text-gray-500">No replies yet.</p>
                        ) : (
                            replies.map((reply) => (
                                <div key={reply.id} className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <img
                                            src={reply.avatar}
                                            alt={`${reply.user}'s avatar`}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                          <span className="font-medium text-blue-400">
                            {reply.user}
                          </span>
                                                <span className="text-xs text-gray-400">
                            {reply.timestamp}
                          </span>
                                            </div>
                                            <p className="mt-1 text-gray-200">{reply.content}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteReply(reply.id)}
                                            className="text-red-400 hover:text-red-300 focus:outline-none ml-2"
                                            title="Delete Reply"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            </div>
        </div>
    );
};

export default ForumAdmin;
