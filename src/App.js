import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import Favorites from './components/Favorites';
import { searchMovies, getMovieDetails } from './services/api';
import { FaInfo } from 'react-icons/fa';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Function to handle search
  const handleSearch = async (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
    fetchMovies(query, 1);
  };

  // Function to fetch movies based on search term and page
  const fetchMovies = async (query, page) => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchMovies(query, page);
      
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setError(data.Error);
        setTotalResults(0);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(searchTerm, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to fetch movie details
  const fetchMovieDetails = async (imdbID) => {
    setLoading(true);
    
    try {
      const data = await getMovieDetails(imdbID);
      if (data.Response === 'True') {
        setMovieDetails(data);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movie details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle movie selection
  const handleSelectMovie = (imdbID) => {
    setSelectedMovie(imdbID);
    fetchMovieDetails(imdbID);
  };

  // Function to close movie details modal
  const handleCloseDetails = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  // Function to toggle favorites
  const handleToggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.imdbID === movie.imdbID);
      
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.imdbID !== movie.imdbID);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  // Check if a movie is in favorites
  const isMovieInFavorites = (imdbID) => {
    return favorites.some(fav => fav.imdbID === imdbID);
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">🎬 Movie Search Tool</span>
        </div>
      </nav>
      
      <div className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8 text-center">
            <h1 className="display-5 fw-bold text-primary mb-3">Movie Search Tool</h1>
            <p className="lead text-muted mb-4">Find information about your favorite movies and build your collection</p>
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>
        </div>

        {favorites.length > 0 && (
          <div className="mb-5">
            <Favorites 
              favorites={favorites} 
              onSelectMovie={handleSelectMovie} 
              onToggleFavorite={handleToggleFavorite} 
            />
          </div>
        )}
        
        {error && !loading && (
          <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
            <FaInfo className="me-2" />
            <div>
              <strong>Error: </strong>{error}
            </div>
          </div>
        )}

        {searchTerm && !loading && (
          <div className="mb-4 pb-2 border-bottom">
            <h2 className="h4 fw-bold">
              {totalResults > 0 
                ? <span>Found <span className="text-primary">{totalResults}</span> results for "<em>{searchTerm}</em>"</span>
                : <span>No results found for "<em>{searchTerm}</em>"</span>}
            </h2>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <>
            <MovieList 
              movies={movies} 
              onSelectMovie={handleSelectMovie}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
            
            {totalResults > 10 && (
              <div className="mt-4">
                <Pagination 
                  currentPage={currentPage}
                  totalResults={totalResults}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>

      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">© 2025 Movie Search Tool | Powered by OMDb API</p>
        </div>
      </footer>

      {selectedMovie && movieDetails && (
        <MovieDetail 
          movie={movieDetails} 
          onClose={handleCloseDetails} 
          isFavorite={isMovieInFavorites(selectedMovie)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}

export default App;