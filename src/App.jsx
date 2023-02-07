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
        'X-RapidAPI-Key': 'YOURKEY',
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
                  'X-RapidAPI-Key': 'YOUR KEY',
                  'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
              }
          };
          
          fetch(`https://mdblist.p.rapidapi.com/?i=${id}`, options)
              .then(response => response.json())
              .then(response => setMovie(response))
              .catch(err => console.error(err));
              document.documentElement.scrollTop = 0;
      

  }
  const[searchMovies,setSearchMovies]=useState([])
    let searchTerm = ""

    let searchlist = searchMovies.map(movie=>{
      return(
        movie.qid=="movie"&&
        <Card
        Title={movie.l}
        Year={movie.y}
        Thumb={movie.i.imageUrl}
        Rank=""
        Description={movie.s}
        Imdbid={movie.id}
        key={movie.id}
        HandleClick={()=>getMovie(movie.id)}
        />
      )
    })
  function handleChange(event){
      searchTerm = event.target.value
  }

  function searchMovie(name){
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'YOUR KEY',
        'X-RapidAPI-Host': 'imdb-movies-web-series-etc-search.p.rapidapi.com'
      }
    };
    
    fetch(`https://imdb-movies-web-series-etc-search.p.rapidapi.com/${name}.json`, options)
      .then(response => response.json())
      .then(response => setSearchMovies(response.d))
      .catch(err => console.error(err));
      searchTerm=""
  }

  return (
    // <BrowserRouter>
    // <Routes>
    <div className="App  text-blue-50 
     ">
      {/* movie detailed showcase */}
      {movie?<div className='mx-auto w-full pt-10 p-5 max-w-8xl mb-10' >
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


        {/* Headings Section */}

      <h1 className='text-3xl lg:text-5xl text-gray-200  font-bold w-full mx-auto text-center pt-10 '>MOVIE-CASE</h1>
      <p className='font-semibold w-full mx-auto text-center pt-8 pb-10 opacity-60'>A List Of Cinematic Masterpieces Ever Created</p>



      {/* Search Section */}
                <div className='form w-full max-w-5xl flex justify-center mx-auto pt-2 items-center mb-5'>
                 <input 
                    type="text"
                    placeholder="Search Movie"
                    className="forminput bg-transparent border-zinc-800 focus:border-none px-5 rounded-md py-2 border-2 mr-4"
                    onChange={handleChange}
                />
                <div className='searchbtn border-2 p-2 rounded font-semibold border-zinc-800
                text-sm cursor-pointer' onClick={()=>searchMovie(searchTerm)}>Search</div>
                </div>

                
    

      {/* Search Movie List */}
      {searchMovies && <div className='flex flex-wrap mx-auto p-2 w-full  justify-center max-w-6xl'>  {searchlist}</div>}


      {/*MOVIES LIST BELOW  */}
      

    
      <div className='flex flex-wrap mx-auto p-2 w-full max-w-6xl'>  {movieList}</div>
      {/* <Route path="moviepage" element={<moviepage/>}/> */}
    </div>
    // </Routes>
    // </BrowserRouter>
  )
}

export default App
