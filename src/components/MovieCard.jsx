import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/movies/${movie.movieId}`, { state: { movie } });
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
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRating = (rating) => {
    return Number(rating).toFixed(1);
  };

  return (
      <div className="flex bg-gray-900 rounded-lg overflow-hidden">
        {/* Poster (Left) - Exact 3:4 ratio */}
        <div className="w-[120px] h-[180px] flex-shrink-0">
          <img
              src='src/assets/poster.webp'
              alt={`${movie.title} poster`}
              className="w-full h-full object-cover"
          />
        </div>

        {/* Details (Right) - Tight spacing like screenshot */}
        <div className="flex-1 p-3 flex flex-col">
          {/* Title + Rating (exact layout from screenshot) */}
          <div className="flex justify-between items-start mb-1">
            <h2
                className="text-lg font-bold text-white leading-tight cursor-pointer hover:text-blue-400 transition-colors"
                onClick={handleTitleClick}
            >
              {movie.title}
            </h2>
            <div className="flex items-center bg-gray-800 rounded px-1.5 py-0.5">
              <StarIcon className="w-3 h-3 text-yellow-400 mr-0.5" />
              <span className="text-xs font-medium text-white">
              {formatRating(movie.avgRating)}
            </span>
            </div>
          </div>

          <p className="text-red-500 text-xs font-bold uppercase tracking-wide mb-1">
            {movie.tagline}
          </p>

          <p className="text-gray-300 text-m leading-snug mb-2 line-clamp-3">
            {movie.overview}
          </p>

          {/* Metadata line (smaller text) */}
          <div className="text-[15px] text-gray-400 mt-auto space-x-2">
            <span>{formatDate(movie.releaseDate)}</span>
            <span>•</span>
            <span>{movie.genres[0].name}</span>
            <span>•</span>
            <span>{movie.runtime} min</span>
          </div>
        </div>
      </div>
  );
};

export default MovieCard;