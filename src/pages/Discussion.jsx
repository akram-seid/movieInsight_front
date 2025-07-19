import HeaderNav from "../Header.jsx";
import React, {useEffect, useState} from "react";
import {MovieService} from "../ApiService.js";
import {useNavigate} from "react-router-dom";

const Discussion = () => {
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalPages: 0,
    });
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState({
        trending: true,
        filtered: false,
        more: false,
    });
    const [user, setUser] = useState("");
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading((prev) => ({...prev, trending: true}));
                const data = await MovieService.getPosts(
                    pagination.page,
                    pagination.size
                );

                if (posts.length === 0) {
                    setPosts(data.ts);
                } else {
                    setPosts((prevPosts) => [...prevPosts, ...data.ts]);
                }
                setPagination((prev) => ({
                    ...prev,
                    totalPages: data.pages,
                }));
                setHasMore(pagination.page < data.pages - 1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

    }, [pagination.page, pagination.size]);

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

    const handleLoadMore = () => {
        setPagination((prev) => ({...prev, page: prev.page + 1}));
    };

    const handleDeleteReply = (id) => {
        setPosts(posts.filter((reply) => reply.id !== id));
    };


    useEffect(() => {
        const getAuthToken = () => {
            const data = sessionStorage.getItem("auth");
            const userData = JSON.parse(data);
            setUser(userData);
        };
        getAuthToken();
    }, []);

    const handleDiscussionDetail = (id) => {
        navigate(`/forum/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
                <HeaderNav tab="discussion"/>
                <h2 className="text-3xl font-bold mb-8">Recent Discussions</h2>
                <p className="text-gray-400 mb-6">
                    Select a discussion to view its thread.
                </p>

                {loading ? (<div className="flex justify-center py-8">
                    <div
                        className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>) : error ? (<p className="text-red-400">Error loading
                    discussions: {error}</p>) : posts.length === 0 ? (
                    <p className="text-gray-400">No discussions yet. Start the conversation!</p>) : (
                    <ul className="space-y-4">
                        {posts.map((post, index) => (
                            <li key={index} className="bg-gray-800 p-4 rounded-lg"
                                onClick={() => handleDiscussionDetail(post.postId)}>
                                <div className="flex justify-between items-end mb-2">
              <span className="font-semibold text-blue-400">
                a post by: {post.createdBy}
              </span>
                                    <div className="flex justify-between items-center">


                                    <span className="text-xs text-gray-400">
                {formatDate(post.timestamp)}
              </span>
                                        {user.role == "ADMIN" && (
                                            <button
                                                onClick={() => handleDeleteReply(post.id)}
                                                className="text-red-400 hover:text-red-300 focus:outline-none ml-4"
                                                title="Delete Reply"
                                            >
                                                &times;
                                            </button>
                                        )
                                        }
                                    </div>
                                </div>
                                <p className="text-white text-xs font-bold uppercase tracking-wide mb-1">
                                    [{post.movieTitle}] <span className="text-green-300">{post.title}</span>
                                </p>

                                <p className="text-gray-300 text-m leading-snug mb-2 line-clamp-3">
                                    {post.content}
                                </p>

                            </li>))}
                    </ul>)}
                {hasMore && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={loading}
                            className={`px-6 py-3 rounded-lg ${
                                loading
                                    ? "bg-gray-600 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Loading More..." : "Load More"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discussion;
