import React,{useState, useEffect } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Card from './Card'
import apiData from "./api.json"
function App() {

  const [movies , setMovies] = useState([])
// console.log(apiData)
  // console.log(JSON.parse(apiData) )
  useEffect(()=>{
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'f9cfa79e0fmsh8dd788ab27668c8p13655ajsnc142bee1819e',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };
    setMovies(apiData)
    // fetch({apiData}, options)
    //   .then(response => response.json())
    //   .then(response => setMovies(apiData))
    //   .catch(err => console.error(err));
  },[])

  const movieList = movies.map(movie=>{
    return(
      <Card
      Title={movie.title}
      Year={movie.year}
      Thumb={movie.image}
      Rank={movie.rank}
      Description={movie.description}
      Imdbid={movie.imdbid}
      key={movie.imdbid}
      HandleClick={()=>getMovie(movie.imdbid)}
      />
    )
  })


  const[movie,setMovie] = useState()


  function getMovie(id){
   console.log("sss")
          const options = {
              method: 'GET',
              headers: {
                  'X-RapidAPI-Key': 'f9cfa79e0fmsh8dd788ab27668c8p13655ajsnc142bee1819e',
                  'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
              }
          };
          
          fetch(`https://mdblist.p.rapidapi.com/?i=${id}`, options)
              .then(response => response.json())
              .then(response => setMovie(response))
              .catch(err => console.error(err));
              document.documentElement.scrollTop = 0;
      

  }

  const Styles ={
    
}

  return (
    // <BrowserRouter>
    // <Routes>
    <div className="App bg-black text-blue-50 
     ">

      {movie?<div className='mx-auto w-full pt-10 p-5 max-w-8xl ' >
        <div className=' backdrop_image relative rounded-md overflow-hidden'>
          {screen.width>650?<img src={movie.backdrop} className="
        w-full"/>:<img src={movie.poster}/>}
         <div className='flex flex-col top-0 absolute p-5 justify-between h-full'>
          <section>
          <h1 className=' uppercase text-4xl lg:text-6xl font-bold text-gray-200
          '>{movie.title}</h1>
          {/* Ratings  */}
          <div className='flex items-center mt-2 pl-1'>
          <h3 className='rating text-blue-100 text-xs opacity-75  ' >
            IMDB {movie.ratings[0].value}</h3>
            <div className='text-xs opacity-60 flex items-center ml-4 font-semibold'>
              <p>{movie.runtime} min </p>
              <p className='ml-1'>| {movie.year}</p>
            </div>
            </div>
            {/* Description */}
            <div className='mt-4 lg:mt-6 pl-1 text-xs text-blue-50 opacity-60 max-w-md lg:max-w-xl lg:text-sm leading-relaxed'>
              <p>
                {movie.description}
              </p>
            </div>
           </section>
            {/* Bottom Section */}
            <div>
              <div className='trailer_btn  w-fit  text-gray-800 text-sm lg:text-base font-semibold rounded-sm px-3 p-2 cursor-pointer'>
                
               <a href={movie.trailer} target="_blank" >Watch Trailer</a> 
              </div>
            </div>


          </div>
        </div>

      </div>:""}


      {/*MOVIES LIST BELOW  */}
      

      <h1 className='text-3xl lg:text-5xl  font-bold w-full mx-auto text-center pt-10 '>MOVIE-CASE</h1>
      <p className='font-semibold w-full mx-auto text-center pt-8 pb-10 opacity-60'>A List Of Cinematic Masterpieces Ever Created</p>
      <div className='flex flex-wrap mx-auto p-2 w-full max-w-6xl'>  {movieList}</div>
      {/* <Route path="moviepage" element={<moviepage/>}/> */}
    </div>
    // </Routes>
    // </BrowserRouter>
  )
}

export default App
