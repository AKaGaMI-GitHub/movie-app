import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { AiFillStar } from "react-icons/ai"
import { RotateLoader } from 'react-spinners'

interface Movie {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}


export default function SearchMovie() {

  const [searchText, setSearch] = useState<string>("")
  const [dataMovie, setDataMovie] = useState<Movie[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const apiURL = import.meta.env.VITE_APP_URL
  const keyURL = import.meta.env.VITE_APP_KEY
  const imagePath = import.meta.env.VITE_IMG_PATH

  const location = useLocation()
  const inputSearch:string | null = location.state?.searchData
  
  useEffect(() => {
    let timeOut:any
    if(inputSearch)
    {
      setSearch(inputSearch)
    }
    const fetchData = async () => {
      setIsSearching(true)
      try {
        const response =  await axios.get(`${apiURL}/search/movie?query=${searchText}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${keyURL}`
          }
        })
        setDataMovie(response.data.results)
      } catch (error) {
        console.error(error)
      } finally {
        setIsSearching(false)
      }
    }

    if(searchText?.length >= 3){
      if(timeOut) {
        clearTimeout(timeOut)
      }
      setDataMovie([])
      timeOut = setTimeout(fetchData, 1500)
    } else {
      setDataMovie([])
    }

    return () => {
      if (timeOut) {
        clearTimeout(timeOut)
      }
    }
  }, [searchText])

  const handleSearchChange = (inputText: any) => {
    console.log(inputSearch)
    setSearch(inputText.target.value)
  }

  return (
    <>
      <Header modeSearch={true} textSearch={searchText} onChangeHandler={handleSearchChange}/>
      {isSearching ? ( 
        <div className="absolute flex flex-col items-center justify-center w-full h-full gap-8 p-8 top-50 left-50 right-50 dark:bg-bgDark">
          <RotateLoader color="#007AFF" size={12} margin={2}/>
          <div className="text-center text-semibold">Wait Searching Data!</div>
        </div>
      ) :
      dataMovie?.length == 0 ? (
        <motion.div className='fixed flex flex-col items-center justify-center w-full h-full text-dark top-50 bottom-50 left-50 right-50 dark:text-textDark'>
          <div className='font-bold text-[1.5rem]'>No Data Found</div>
          <div>Try to search another movie</div>
        </motion.div>
      ) : (
        <div className='flex flex-row flex-wrap justify-center gap-4 m-4 text-dark dark:text-textDark'>
          {dataMovie?.map((index) => (
            <motion.div key={index.id} className='w-full md:w-[240px] h-auto overflow-hidden bg-white shadow-lg dark:bg-bgDark rounded-xl' initial={{y: 15, opacity: 0}} whileInView={{y: 0, opacity: 1, transition: {ease: [0.6, 0.01, 0.05, 0.95], duration: 1.2}}} viewport={{once: true}}>
              <Link to={`/detail-movie/${index.id}`} className='flex flex-col'>
                <div className="flex h-[18rem] overflow-hidden md:h-full items-center justify-center md:justify-normal ">
                  <img src={`${imagePath}/original${index.poster_path}`} className='w-full md:w-64'/>
                </div>
                <div className='flex flex-col gap-1.5 p-4'>
                  <div className='font-bold text-[1rem] md:text-[1.2rem]'>{index.title}</div>
                  <div className='text-[0.8rem] md:text-[0.9rem] text-dark/60 flex flex-col gap-1'>{index.original_title}</div>
                  <div className='text-[0.8rem] md:text-[0.9rem] flex flex-row items-center gap-1'>Rating : <AiFillStar className="text-yellow text-[1.2rem]" /> {Math.round(index.vote_average)}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}
