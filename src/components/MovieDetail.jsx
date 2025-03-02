import React from 'react';
import { FaStar, FaTimes, FaHeart, FaRegHeart, FaImdb, FaCalendarAlt, FaClock, FaFilm, FaUserFriends, FaPen, FaAward } from 'react-icons/fa';

const MovieDetail = ({ movie, onClose, isFavorite, onToggleFavorite }) => {
  if (!movie) return null;

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';

  // Function to format movie details that might have 'N/A'
  const formatDetail = (detail) => detail === 'N/A' ? 'Not available' : detail;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3 p-3" style={{backdropFilter: 'blur(5px)'}}>
      <div className="bg-white rounded-3 overflow-hidden w-100 mw-100" style={{maxWidth: '900px', maxHeight: '90vh'}}>
        <div className="position-relative">
          <button 
            onClick={onClose} 
            className="btn btn-dark btn-sm position-absolute end-0 top-0 m-3 rounded-circle z-3"
            style={{width: '36px', height: '36px'}}
          >
            <FaTimes />
          </button>

          <div className="row g-0">
            {/* Poster section */}
            <div className="col-md-4 d-flex align-items-center bg-dark">
              <img 
                src={posterUrl} 
                alt={movie.Title} 
                className="w-100 h-100 object-fit-cover"
                style={{maxHeight: '500px'}}
              />
            </div>

            {/* Content section */}
            <div className="col-md-8">
              <div className="p-4 overflow-auto" style={{maxHeight: '90vh'}}>
                
                {/* Header with title and favorite button */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h2 className="fw-bold mb-0">{movie.Title}</h2>
                  <button 
                    onClick={() => onToggleFavorite(movie)}
                    className="btn btn-outline-danger border-0 rounded-circle ms-2"
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
                
                {/* Year, rating, runtime badges */}
                <div className="d-flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-primary d-flex align-items-center">
                    <FaCalendarAlt className="me-1" /> {movie.Year}
                  </span>
                  {movie.Rated !== 'N/A' && (
                    <span className="badge bg-secondary">{movie.Rated}</span>
                  )}
                  {movie.Runtime !== 'N/A' && (
                    <span className="badge bg-dark d-flex align-items-center">
                      <FaClock className="me-1" /> {movie.Runtime}
                    </span>
                  )}
                </div>
                
                {/* IMDb rating */}
                {movie.imdbRating !== 'N/A' && (
                  <div className="d-flex align-items-center mb-4 bg-warning bg-opacity-10 p-2 rounded">
                    <FaImdb className="text-warning me-2 fs-4" />
                    <div>
                      <div className="fw-bold">IMDb Rating</div>
                      <div className="d-flex align-items-center">
                        <FaStar className="text-warning me-1" />
                        <span className="fw-bold">{movie.imdbRating}</span>
                        <span className="text-muted ms-1">/10</span>
                        <span className="text-muted ms-2">({movie.imdbVotes})</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Plot */}
                <div className="mb-4">
                  <h5 className="fw-bold">Plot</h5>
                  <p className="mb-0">{formatDetail(movie.Plot)}</p>
                </div>
                
                {/* Movie details in cards */}
                <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
                  <div className="col">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <FaUserFriends className="text-primary me-2" />
                          <h6 className="fw-bold mb-0">Director</h6>
                        </div>
                        <p className="card-text mb-0">{formatDetail(movie.Director)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <FaPen className="text-primary me-2" />
                          <h6 className="fw-bold mb-0">Writer</h6>
                        </div>
                        <p className="card-text mb-0">{formatDetail(movie.Writer)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <FaUserFriends className="text-primary me-2" />
                          <h6 className="fw-bold mb-0">Actors</h6>
                        </div>
                        <p className="card-text mb-0">{formatDetail(movie.Actors)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col">
                    <div className="card h-100 border-0 bg-light">
                      <div className="card-body">
                        <div className="d-flex align-items-center mb-2">
                          <FaFilm className="text-primary me-2" />
                          <h6 className="fw-bold mb-0">Genre</h6>
                        </div>
                        <p className="card-text mb-0">{formatDetail(movie.Genre)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Awards */}
                {movie.Awards !== 'N/A' && (
                  <div className="alert alert-success d-flex align-items-start">
                    <FaAward className="text-success me-2 mt-1 fs-5" />
                    <div>
                      <h6 className="fw-bold mb-1">Awards</h6>
                      <p className="mb-0">{movie.Awards}</p>
                    </div>
                  </div>
                )}
                
                {/* Additional metadata */}
                <div className="mt-4 pt-2 border-top">
                  <small className="text-muted d-block">Country: {formatDetail(movie.Country)}</small>
                  <small className="text-muted d-block">Language: {formatDetail(movie.Language)}</small>
                  <small className="text-muted d-block">Released: {formatDetail(movie.Released)}</small>
                  <small className="text-muted d-block mt-2">IMDb ID: {movie.imdbID}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;