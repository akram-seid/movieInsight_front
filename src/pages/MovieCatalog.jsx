import SkeletonCatalog from "../components/SkeletonCatalog.jsx";
import {MovieService} from "../ApiService.js";
import React, {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import HeaderNav from "../Header";

const MovieCatalog = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        genre: "",
        year: "",
        language: "",
        query: "",
    });

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState({
        trending: true,
        filtered: false,
        more: false,
    });
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 6,
        totalPages: 0,
    });
    const [hasMore, setHasMore] = useState(true);
    const [isFiltering, setIsFiltering] = useState(false);

    const genres = useMemo(
        () => [
            "Action",
            "Drama",
            "Comedy",
            "Science Fiction",
            "Thriller",
            "Horror",
            "Romance",
            "Mystery",
            "Adventure"
        ],
        []
    );

    const languages = useMemo(
        () => ["English", "Spanish", "French", "German", "Japanese", "Chinese"],
        []
    );

    const years = useMemo(
        () => Array.from({length: 20}, (_, i) => new Date().getFullYear() - i),
        []
    );

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading((prev) => ({...prev, trending: true}));
                const data = await MovieService.getPopularMovies(
                    pagination.page,
                    pagination.size
                );

                if (movies.length === 0) {
                    setMovies(data.ts);
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...data.ts]);
                }
                setPagination((prev) => ({
                    ...prev,
                    totalPages: data.pages,
                }));
                setHasMore(pagination.page < data.pages - 1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading((prev) => ({...prev, trending: false}));
            }
        };

        if (!isFiltering) {
            fetchMovies();
        }
    }, [pagination.page, pagination.size, isFiltering]);

    const handleTitleClick = (id) => {
        navigate(`/movies/${id}`);
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams();
        if (searchQuery) {
            queryParams.append("query", searchQuery);
        }
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                queryParams.append(key, value);
            }
        });
        navigate(`/search?${queryParams.toString()}`);
    };

    const handlePageChange = (newPage) => {
        setPagination((prev) => ({...prev, page: newPage}));
    };

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters((prev) => ({...prev, [name]: value}));
    };

    const clearFilters = () => {
        setFilters({
            genre: "",
            year: "",
            language: "",
            query: ""
        });
        setSearchQuery("");
        setIsFiltering(false);
        setPagination((prev) => ({...prev, page: 0}));
        setMovies([]);
        setHasMore(true);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    const activeFilters = Object.entries(filters).filter(([, value]) => value);

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">

                <HeaderNav tab="catalog"/>

                {loading.trending && !isFiltering ? <SkeletonCatalog/> : null}

                {loading.filtered && isFiltering ? (
                    <div
                        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : null}

                <div>
                    <h1 className="text-3xl font-bold mb-6">Movie Catalog</h1>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <select
                            name="genre"
                            value={filters.genre}
                            onChange={handleFilterChange}
                            className="bg-gray-800 border border-gray-700 rounded p-3"
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                        <select
                            name="year"
                            value={filters.year}
                            onChange={handleFilterChange}
                            className="bg-gray-800 border border-gray-700 rounded p-3"
                        >
                            <option value="">All Years</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <select
                            name="language"
                            value={filters.language}
                            onChange={handleFilterChange}
                            className="bg-gray-800 border border-gray-700 rounded p-3"
                        >
                            <option value="">All Languages</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>
                                    {lang}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 flex gap-2">
                        <input
                            type="text"
                            placeholder="Search by title, Actor/Actress, Crew, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 p-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Search
                        </button>
                    </div>

                    {/* Active Filters */}
                    {(isFiltering || activeFilters.length > 0) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {activeFilters.map(([key, value]) => (
                                <div
                                    key={key}
                                    className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                                >
                <span className="capitalize">
                  {key}: {value}
                </span>
                                    <button
                                        onClick={() => setFilters((prev) => ({...prev, [key]: ""}))}
                                        className="ml-2 text-gray-400 hover:text-white"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={clearFilters}
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    <h4 className="text-3xl font-bold mb-6">Trending...</h4>

                    {error ? (
                        <div className="text-red-500 mb-6">{error}</div>
                    ) : movies.length === 0 && isFiltering ? (
                        <div className="text-gray-400 text-center py-12">
                            No movies found matching your criteria
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {movies.map((movie) => (
                                    <div
                                        key={`${movie.title}-${movie.releaseDate}`}
                                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
                                    >
                                        <div className="w-full aspect-video"
                                             onClick={() => handleTitleClick(movie.movieId)}> {/* aspect-video gives 16:9 ratio */}
                                            <img
                                                src='src/assets/poster.webp'
                                                alt={`${movie.title} poster`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3
                                                className="font-bold text-lg"

                                            >
                                                {movie.title}
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {formatDate(movie.releaseDate)} • {movie.genres[0].name}
                                            </p>
                                            <div className="mt-2 flex items-center">
                      <span
                          className="bg-green-500 rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold mr-1">
                        {movie.voteAverage.toFixed(1)}
                      </span>
                                                <span className="text-sm text-gray-400">IMDB</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {hasMore && (
                                <div className="mt-8 text-center">
                                    <button
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={loading.more || loading.trending}
                                        className={`px-6 py-3 rounded-lg transition-colors ${
                                            loading.more || loading.trending
                                                ? "bg-gray-600 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                        }`}
                                    >
                                        {loading.more || loading.trending
                                            ? "Loading..."
                                            : "Load More"}
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieCatalog;