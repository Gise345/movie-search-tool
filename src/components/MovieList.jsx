import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onSelectMovie, favorites, onToggleFavorite }) => {
  if (!movies.length) {
    return (
      <div className="text-center py-5">
        <p className="text-muted fs-5">Bummer! No movies found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {movies.map((movie) => (
        <div className="col" key={movie.imdbID}>
          <MovieCard 
            movie={movie} 
            onClick={onSelectMovie}
            isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
};

export default MovieList;