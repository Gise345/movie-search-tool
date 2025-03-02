import React from 'react';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';

const MovieCard = ({ movie, onClick, isFavorite, onToggleFavorite }) => {
  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div 
      className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(movie.imdbID)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={posterUrl} 
          alt={movie.Title} 
          className="w-full h-full object-cover"
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{movie.Title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-700">{movie.Year}</span>
          <span className="text-gray-600 text-sm">{movie.Type}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;