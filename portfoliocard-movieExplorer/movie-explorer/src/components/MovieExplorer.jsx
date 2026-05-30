import React from 'react'
import './MovieExplorer.css';
import ToogleTheme from './ToogleTheme';
import { movieData } from './movieData';
import { useState } from 'react';
import {Search,RefreshCcw,Heart,Star} from 'lucide-react';
import Button from './Button';
import MovieCard from './MovieCard';
import FavMovieCard from './FavMovieCard';
import MovieHeader from './MovieHeader';

function MovieExplorer() {
  const[movies,setMovies] =useState(movieData);
  const[searchTerm,setSearchTerm]= useState('');
  const[favoraiteMovies,setFavoraiteMovies]=useState([]);
  const handleReset=()=>{
    setSearchTerm('');
  }
  const setFavMovie=(id)=>{
    const isAlredyFav = favoraiteMovies.some(movie=>movie.id==id);
    if(isAlredyFav){
      const movieToRemove = favoraiteMovies.filter(movie=>movie.id !==id);
      setFavoraiteMovies(movieToRemove);
    }else{
      const movieToAdd = movies.find(movie=>movie.id == id);
      setFavoraiteMovies([...favoraiteMovies,movieToAdd]);
    }  
  }
  const filteredMovies = movies.filter(movie=>{
    const searchLower = searchTerm.toLowerCase();
    return movie.title.toLocaleLowerCase().includes(searchLower) ||
    movie.genre.toLowerCase().includes(searchLower)||
    movie.director.toLowerCase().includes(searchLower)||
    movie.year.toString().includes(searchTerm);
  })
  return (
    <div className='movie-explorer'>
        <ToogleTheme/>
        <div className='movie-explorer-content'>
          <MovieHeader/>
          <div className='search-section'>
            <Search size={14}/>
            <input type="text" placeholder='Search movies (e.g. "Interstellar","Star")' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='input-text'/>
            <Button className='reset-btn'onClick={handleReset}><RefreshCcw size={14}/>Reset</Button>
          </div>
          <div className='search-results'>
            <p>{searchTerm.length === 0 ? '' : <>{filteredMovies.length} results for <strong>{searchTerm}</strong></>}</p>
          </div>
          <div className='movie-section'>
            <div className='match-movie'>
              <h2>Matching Movies</h2>
              {filteredMovies.length===0 ? 
              (<div className='no-match-found'>
                <p>No movies found</p>
              </div>):(filteredMovies.map(movie=>(<MovieCard key={movie.id} movie={movie} setFavMovie={setFavMovie} favoraiteMovies={favoraiteMovies} />)))}
            </div>
            <div className='fav-movie'>
              <h2>Favoraite Movies</h2>
              {favoraiteMovies.length>0? (favoraiteMovies.map(movie=>(<FavMovieCard key={movie.id} movie={movie}/>))):(<div className='empty-fav'>
                <p>You haven't added any favoraite yet </p>
              </div>)}
            </div>
          </div>
        </div>
    </div>
  )
}

export default MovieExplorer