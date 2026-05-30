import React from 'react'
import Button from './Button'
import { Star, Heart } from 'lucide-react'

function MovieCard({ movie, setFavMovie, favoraiteMovies }) {
  const isFavorite = favoraiteMovies.some(fav => fav.id === movie.id);

  return (
    <div className='movie-card'>
      <div className='movie-deatils'>
        <div>
          <span className='movie-title'>{movie.title}</span>
          <span className='movie-year'>{movie.year}</span>
          <span className='movie-director'>{movie.director}</span>          
        </div>
        <div>
          <span className='movie-runtime'>{movie.runtime}</span>
          <span className='move-genre'>{movie.genre}</span>
          <span className='movie-rating'><Star size={17} />{movie.rating}</span>
        </div>
      </div>
      <div>
        
        <Button 
          className={`fav-btn ${isFavorite ? 'active' : ''}`} 
          onClick={() => setFavMovie(movie.id)}
        >
          <Heart size={15} fill={isFavorite ? "currentColor" : "none"}/>
          Favorite
        </Button>
      </div>
    </div>
  )
}

export default MovieCard;