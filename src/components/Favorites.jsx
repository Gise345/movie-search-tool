import React from 'react';
import MovieCard from './MovieCard';
import { FaHeart } from 'react-icons/fa';

const Favorites = ({ favorites, onSelectMovie, onToggleFavorite }) => {
  if (!favorites.length) {
    return (
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <FaHeart className="text-danger me-2" />
            <h3 className="h4 mb-0 fw-bold">My Favorites</h3>
          </div>
          <p className="text-muted mb-0">You haven't added any favorites yet. Click the heart icon on movies to add them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-white py-3">
        <div className="d-flex align-items-center">
          <FaHeart className="text-danger me-2" />
          <h3 className="h4 mb-0 fw-bold">My Favorites</h3>
          <span className="badge bg-danger rounded-pill ms-2">{favorites.length}</span>
        </div>
      </div>
      <div className="card-body">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {favorites.map((movie) => (
            <div className="col" key={movie.imdbID}>
              <MovieCard 
                movie={movie} 
                onClick={onSelectMovie}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;