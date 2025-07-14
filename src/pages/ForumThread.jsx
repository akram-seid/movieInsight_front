import React, {useEffect, useRef, useState} from "react";
import {MovieService} from "../ApiService.js";
import {useParams} from "react-router-dom";
import HeaderNav from "../Header.jsx";

const ForumThread = () => {
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");
    const [error, setError] = useState(false);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const [showAlert, setShowAlert] = useState(false);


    const wsRef = useRef(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                setLoading(true);
                const data = await MovieService.getPostDetail(id);
                if (data.status === true) {
                    setPost(data.ob);
                    setReplies(data.ob.replies);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails(id);

    }, [id]);

    // Simulate WebSocket connection
    useEffect(() => {
        const mockWebSocket = {
            onMessage: (cb) => {
                setTimeout(() => {
                    cb(
                        JSON.stringify({
                            id: Math.floor(Math.random() * 1000),
                            user: "GuestUser",
                            avatar: "https://picsum.photos/id/109/200/200",
                            content:
                                "Great point! Also loved the soundtrack during that scene.",
                            timestamp: "Just now",
                        })
                    );
                }, 3000);
            },
            send: (message) => {
                console.log("Sent message:", message);
            },
        };

        wsRef.current = mockWebSocket;

        wsRef.current.onMessage((event) => {
            try {
                const newReply = JSON.parse(event.data);
                setReplies((prev) => [newReply, ...prev]);
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
            } catch (e) {
                console.error("Error parsing message", e);
            }
        });

        return () => {
            // Cleanup if needed
        };
    }, []);

    const handleReplySubmit = (e) => {
        e.preventDefault();
        if (!newReply.trim()) return;

        const reply = {
            id: Date.now(),
            user: "You",
            avatar: "https://picsum.photos/id/110/200/200",
            content: newReply,
            timestamp: "Just now",
        };

        // Send via WebSocket
        wsRef.current.send(JSON.stringify(reply));

        // Optimistically update UI
        setReplies([reply, ...replies]);
        setNewReply("");
    };

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
                <HeaderNav/>
                {/* Notification Alert */}
                {showAlert && (
                    <div
                        className="fixed top-4 right-4 bg-blue-600 px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out">
                        New reply!
                    </div>
                )}

                {/* Thread View */}
                <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-3xl font-bold mb-8">Forum Thread</h1>

                    {/* Original Post */}
                    <div className="bg-gray-800 p-6 rounded-lg mb-6">
                        <div className="flex items-start gap-4">
                        <span className="font-semibold text-blue-400">
                Original poster: {post.createdBy}
              </span>
                            <span className="text-xs text-gray-400">
                {formatDate(post.timestamp)}
              </span>
                        </div>
                        <p className="text-white text-xs font-bold uppercase tracking-wide mb-1">
                            [{post.movieTitle}] <span className="text-green-400">{post.title}</span>
                        </p>

                        <p className="text-gray-300 text-m leading-snug mb-2 line-clamp-3">
                            {post.content}
                        </p>
                    </div>

                    {/* Replies Section */}
                    <div className="ml-16 space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Replies</h2>

                        {replies.length === 0 ? (
                            <p className="text-gray-500">
                                No replies yet. Be the first to respond!
                            </p>
                        ) : (
                            replies.map((reply) => (
                                <div key={reply.id} className="bg-gray-800 p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-400">
                        {reply.userId}
                      </span>
                                                <span className="text-xs text-gray-400">
                        {formatDate(reply.timestamp)}
                      </span>
                                            </div>
                                            <p className="mt-1 text-gray-200 whitespace-pre-wrap">
                                                {reply.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Reply Form */}
                    <form onSubmit={handleReplySubmit} className="mt-8 ml-16">
          <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Write a reply..."
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              rows="3"
          ></textarea>
                        <button
                            type="submit"
                            className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Reply
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default ForumThread;
