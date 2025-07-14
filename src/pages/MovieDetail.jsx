import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {MovieService} from "../ApiService.js";
import HeaderNav from "../Header.jsx";
import moviePoster from '../assets/poster.webp';


const MovieDetail = () => {
    const {id} = useParams();
    const location = useLocation(); // Get passed state
    const [movie, setMovie] = useState(location.state?.movie || null);
    const [loading, setLoading] = useState(!movie);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('ratings');
    const [newDiscussion, setNewDiscussion] = useState('');
    const [newtitle, setNewTitle] = useState('');
    const [discussions, setDiscussions] = useState([]);
    const [isLoadingDiscussions, setIsLoadingDiscussions] = useState(false);
    const [discussionsError, setDiscussionsError] = useState(null);
    const [dPagination, setDPagination] = useState({
        page: 0, size: 10, totalPages: 0,
    });
    const [hasMore, setHasMore] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [newRating, setNewRating] = useState(0);
    const [rated, setRated] = useState(false);


    // Fetch movie details if not passed through state
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const data = await MovieService.getMovieDetail(id);
                if (data.status === true) {
                    setMovie(data.ob);
                    setRatings(data.ob.recentRatings);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (!movie && id) {
            fetchMovieDetails(id);
        }
    }, [id, movie]);


    const handleRatingSubmit = async (e) => {
        e.preventDefault();
        if (!newRating) return;

        const ratingEntry = {
            userId: "You", rating: newRating, username: "jacksontami", movieId: movie.movieId,
        };

        try {
            const data = await MovieService.postRating(ratingEntry);
            if (data.status === true) {
                setRatings((prevResults) => [data.ob, ...prevResults]);
                setRated(true);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setDiscussionsError(error.message);
            console.error('Error submitting:', error);
        }
    };

    const fetchDiscussions = async () => {
        setIsLoadingDiscussions(true);
        setDiscussionsError(null);

        try {
            const data = await MovieService.getMovieDiscussions(id, dPagination.page, dPagination.size);
            if (data.status === true) {
                if (dPagination.page === 0) {
                    setDiscussions(data.ts);
                } else {
                    setDiscussions((prevResults) => [...prevResults, ...data.ts]);
                }
                setDPagination((prev) => ({
                    ...prev, totalPages: data.pages,
                }));
                setHasMore(dPagination.page < data.pages - 1);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setDiscussionsError(error.message);
            console.error('Error fetching discussions:', error);
        } finally {
            setIsLoadingDiscussions(false);
        }
    };

    const handlePostDiscussion = async (e) => {
        e.preventDefault();
        const discussion = {
            title: newtitle,
            content: newDiscussion,
            movieId: movie.movieId,
            createdBy: "jacksontami"
        }

        try {
            const data = await MovieService.postDiscussion(discussion);
            if (data.status === true) {
                setDiscussions((prevResults) => [data.ob, ...prevResults]);

                setDPagination((prev) => ({
                    ...prev, totalPages: data.pages,
                }));
                setHasMore(dPagination.page < data.pages - 1);

            } else {
                setError(data.message);
            }
        } catch (error) {
            setDiscussionsError(error.message);
            console.error('Error fetching discussions:', error);
        } finally {
            setIsLoadingDiscussions(false);
        }
        setNewDiscussion('');
        setNewTitle('');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'discussions') {
            fetchDiscussions();
        }
    };

    const StarRating = ({rating}) => {
        return (<div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (<span
                key={star}
                className={`text-xl ${star <= rating ? "text-yellow-400" : "text-gray-600"}`}
            >
            ★
          </span>))}
        </div>);
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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };


    const handleLoadMore = () => {
        setDPagination((prev) => ({...prev, page: prev.page + 1}));
    };

    // Loading state
    if (loading) {
        return (<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>);
    }

    // Error state
    if (error) {
        return (<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Error</h2>
                <p className="text-gray-400">{error}</p>
            </div>
        </div>);
    }

    // No movie found
    if (!movie) {
        return (<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
                <p className="text-gray-400">The requested movie could not be found.</p>
            </div>
        </div>);
    }

    return (<div className="min-h-screen bg-gray-900 text-white">

        <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
            <HeaderNav/>
            {/* Top Section */}
            <section className="relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Poster */}
                        <div className="md:w-1/2 lg:w-2/4 aspect-[2/3] min-w-[400px]">
                            <img
                                src={moviePoster}
                                alt={`${movie.title} poster`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Movie Info */}
                        <div className="md:w-2/2 lg:w-3/4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                {movie.title}
                            </h1>

                            {/* Overview */}
                            {movie.overview && (<p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                {movie.overview}
                            </p>)}

                            {/* Movie Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <p className="text-sm text-gray-400">Budget</p>
                                    <p className="text-xl font-semibold">
                                        {movie.budget ? formatCurrency(movie.budget) : 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <p className="text-sm text-gray-400">Revenue</p>
                                    <p className="text-xl font-semibold">
                                        {movie.revenue ? formatCurrency(movie.revenue) : 'N/A'}
                                    </p>
                                </div>
                                <div className="bg-gray-800 p-4 rounded-lg">
                                    <p className="text-sm text-gray-400">Runtime</p>
                                    <p className="text-xl font-semibold">
                                        {movie.runtime ? formatRuntime(movie.runtime) : 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {movie.releaseDate && (<div>
                                    <p className="text-sm text-gray-400">Release Date</p>
                                    <p className="text-lg font-semibold">
                                        {new Date(movie.releaseDate).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </p>
                                </div>)}
                                {movie.genres && movie.genres.length > 0 && (<div>
                                    <p className="text-sm text-gray-400">Genres</p>
                                    <p className="text-lg font-semibold">
                                        {Array.isArray(movie.genres) ? movie.genres.map(g => g.name || g).join(', ') : movie.genres}
                                    </p>
                                </div>)}
                            </div>

                            {/* Cast Carousel */}
                            {movie.credits.cast && movie.credits.cast.length > 0 && (<div className="mb-8">
                                <h2 className="text-xl font-semibold mb-3">Cast & Crew</h2>
                                <div className="overflow-x-auto pb-2 scrollbar-hide">
                                    <div className="flex space-x-4">
                                        {movie.credits.cast.map((person, index) => (
                                            <div key={person.id || index} className="min-w-[140px]">
                                                <img
                                                    src={moviePoster}
                                                    alt={person.name}
                                                    className="w-full h-48 object-cover rounded-lg mb-2"
                                                />
                                                <h3 className="font-medium">{person.name}</h3>
                                                <p className="text-sm text-gray-400">{person.role || person.character}</p>
                                            </div>))}
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* Rating Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="border-b border-gray-700 mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => handleTabChange('ratings')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'ratings' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'}`}
                        >
                            Ratings
                        </button>
                        <button
                            onClick={() => handleTabChange('discussions')}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'discussions' ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300'}`}
                        >
                            Discussions
                        </button>
                    </nav>
                </div>

                {activeTab === 'ratings' ? (<>
                    <h2 className="text-2xl font-bold mb-4">Rate This Movie</h2>
                    <form onSubmit={handleRatingSubmit} className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            {[1.0, 2.0, 3.0, 4.0, 5.0].map((star) => (<button
                                key={star}
                                type="button"
                                onClick={() => setNewRating(star)}
                                className={`text-3xl focus:outline-none transition-colors ${star <= newRating ? "text-yellow-400" : "text-gray-600"} hover:text-yellow-300`}
                            >
                                ★
                            </button>))}
                        </div>
                        <button
                            type="submit"
                            disabled={!newRating && rated}
                            className={`px-6 py-2 rounded-lg transition-colors ${newRating ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
                        >
                            Submit Rating
                        </button>
                    </form>

                    {/* Latest Ratings */}
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3">Latest Ratings</h3>
                        {ratings.length === 0 ? (
                            <p className="text-gray-400">No ratings yet. Be the first!</p>) : (
                            <ul className="space-y-3">
                                {ratings.map((rate, index) => (
                                    <li key={index} className="bg-gray-800 p-3 rounded-lg">
                                        <div className="flex justify-between items-center">
                  <span className="font-semibold text-blue-400">
                    {rate.username}
                  </span>
                                            <span className="text-xs text-gray-400">
                    {formatDate(rate.timestamp)}
                  </span>
                                        </div>
                                        <StarRating rating={rate.rating}/>
                                    </li>))}
                            </ul>)}
                    </div>
                </>) : (<div className="discussions-tab">
                    <h2 className="text-2xl font-bold mb-4">Movie Discussions</h2>

                    {/* Discussion form */}
                    <form onSubmit={handlePostDiscussion} className="mb-8">
                        <p className="text-sm text-white">Title</p>
                        <textarea
                            value={newtitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full bg-gray-800 rounded-lg p-4 text-white mb-4"
                            placeholder="Title..."
                            rows={1}
                        />
                        <p className="text-sm text-white">Content</p>
                        <textarea
                            value={newDiscussion}
                            onChange={(e) => setNewDiscussion(e.target.value)}
                            className="w-full bg-gray-800 rounded-lg p-4 text-white mb-4"
                            placeholder="Share your thoughts about the movie..."
                            rows={4}
                        />
                        <button
                            type="submit"
                            disabled={!newDiscussion.trim()}
                            className={`px-6 py-2 rounded-lg transition-colors ${newDiscussion.trim() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-700 text-gray-500 cursor-not-allowed"}`}
                        >
                            Post Discussion
                        </button>
                    </form>

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-3">Recent Discussions</h3>

                        {isLoadingDiscussions ? (<div className="flex justify-center py-8">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>) : discussionsError ? (<p className="text-red-400">Error loading
                            discussions: {discussionsError}</p>) : discussions.length === 0 ? (
                            <p className="text-gray-400">No discussions yet. Start the conversation!</p>) : (
                            <ul className="space-y-4">
                                {discussions.map((discussion, index) => (
                                    <li key={index} className="bg-gray-800 p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-blue-400">
                {discussion.createdBy}
              </span>
                                            <span className="text-xs text-gray-400">
                {formatDate(discussion.timestamp)}
              </span>
                                        </div>
                                        <p className="text-red-500 text-xs font-bold uppercase tracking-wide mb-1">
                                            {discussion.title}
                                        </p>

                                        <p className="text-gray-300 text-m leading-snug mb-2 line-clamp-3">
                                            {discussion.content}
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
                </div>)}
            </section>
        </div>
    </div>);
};

export default MovieDetail;