import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MovieService } from "../ApiService.js";
import SkeletonCatalog from "../components/SkeletonCatalog.jsx";
import HeaderNav from "../Header.jsx";
import MovieCard from "../components/MovieCard.jsx";

const MovieSearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
  });
  const [hasMore, setHasMore] = useState(true);

  const getSearchParams = () => {
    const params = new URLSearchParams(location.search);
    const searchParams = {};
    for (let [key, value] of params.entries()) {
      searchParams[key] = value;
    }
    return searchParams;
  };



  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      const params = getSearchParams();

      try {
        const data = await MovieService.searchMovies({
          ...params,
          page: pagination.page,
          size: pagination.size,
        });
        if (pagination.page === 0) {
          setSearchResults(data.ts);
        } else {
          setSearchResults((prevResults) => [...prevResults, ...data.ts]);
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

    fetchSearchResults();
  }, [location.search, pagination.page, pagination.size]);


  const handleLoadMore = () => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  };


  const currentSearchTerms = getSearchParams();
  const displaySearchTerms = Object.entries(currentSearchTerms)
    .map(([key, value]) => {
      if (key === "query") return `Search: "${value}"`;
      return `${key}: ${value}`;
    })
    .join(", ");

  return (
    <div>
      <HeaderNav />
      <div className="w-full px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Search Results</h2>
        {displaySearchTerms && (
          <p className="text-lg text-gray-400 mb-6">
            Searching for: {displaySearchTerms}
          </p>
        )}

        {loading ? (
          <SkeletonCatalog />
        ) : error ? (
          <div className="text-red-500 mb-6">{error}</div>
        ) : searchResults.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            No movies found for your search criteria.
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default MovieSearchPage;
