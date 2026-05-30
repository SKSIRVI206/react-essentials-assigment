import React from 'react'
import { Star} from 'lucide-react'
function FavMovieCard({movie}) {
  return (
    <div key={movie.id} className='movie-card'>
        <div className='movie-deatils'>
          <div>
            <span className='movie-title'>{movie.title}</span>
            <span className='movie-year'>{movie.year}</span>
            <span className='movie-director'>{movie.director}</span>          
          </div>
          <div>
            <span className='movie-runtime'>{movie.runtime}</span>
            <span className='move-genre'>{movie.genre}</span>
            <span className='movie-rating'><Star size={17}/>{movie.rating}</span>
          </div>
        </div>
    </div>
  )
}

export default FavMovieCard