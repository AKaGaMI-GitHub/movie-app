import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import Header from "../../components/Header"
import axios from 'axios'
import { RotateLoader } from "react-spinners"
import { AiFillStar } from "react-icons/ai"
import { motion } from 'framer-motion'
import CardMovie from '../../components/CardMovie'

interface Movie {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: {
    id: number,
    name: string,
    poster_path: string | null,
    backdrop_path: string | null,
  },
  budget: number,
  genres: [{
    id: number,
    name: string,
  }],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: [{
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
  }],
  production_countries: [{
    iso_3166_1: string,
    name: string
  }],
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: [{
    english_name: string,
    iso_639_1: string,
    name: string,
  }],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

interface PopularMovie {
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
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number
}

export default function DetailMovie() {
  const id = useParams();
  const [dataMovie, setData] = useState<Movie | null>()
  const [popularMovie, setPopular] = useState<PopularMovie[]>([])
  const apiURL = import.meta.env.VITE_APP_URL
  const keyURL = import.meta.env.VITE_APP_KEY
  const imagePath = import.meta.env.VITE_IMG_PATH

  useNavigate()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/movie/${id.id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${keyURL}`
        }
      })

      const responsePopular = await axios.get(`${apiURL}/movie/popular`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${keyURL}`
        }
      })

      if (response.status && responsePopular.status === 200)
      {
        setData(response.data)
        setPopular(responsePopular.data.results.slice(0,6))
      }
    } catch (e) {
      console.error(e)
    }    
  }

  function stringDate(date:string) {
    const convertString = new Date(date)
    return convertString.toDateString()
  }

  function numberFormat(number:number) {
    let newFormat = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return newFormat;
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 150)
    setData(null)
  }, [id])

  return (
    <>
      {dataMovie ? (
        <>
          <Header customClass={`sticky bg-white dark:bg-bgDark text-[#0B0B0B] dark:text-textDark border-b-2 border-shadow-dark/20 dark:border-shadow-light/20`} />
          <div className='flex flex-col px-0 pb-8 bg-white md:px-6 dark:bg-bgDark md:pb-0'>
            <div className='flex flex-col justify-center gap-4 my-0 md:gap-12 md:my-8 md:flex-row'>
              <motion.div initial={{y: -10, opacity: 0}} whileInView={{y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1 }}} viewport={{once: true}} className='hidden overflow-hidden md:block rounded-xl'>
                <img src={`${imagePath}/w780${dataMovie?.poster_path}`}/>
              </motion.div>
              <motion.div initial={{opacity: 0}} whileInView={{opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1 }}} viewport={{once: true}} className='block md:hidden'>
                <img src={`${imagePath}/w780${dataMovie?.poster_path}`}/>
              </motion.div>
              <motion.div initial={{y: 10, opacity: 0}} whileInView={{y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1 }}} viewport={{once: true}} className='flex flex-col px-4 text-black dark:text-textDark md:px-0'>
                <div className='font-bold text-[1.7em] md:text-[2em]'>{dataMovie?.title}</div>
                <div className='flex flex-row flex-wrap my-1 md:my-2 font-semibold text-white text-[0.85em] md:text-[0.9em]'>
                  {dataMovie?.genres.map((index) => (
                    <div key={index.id} className='px-4 py-1.5 my-1 mr-2 rounded-full bg-blue'>{index.name}</div>
                    ))}
                </div>
                <div className='text-justify text-[0.9em] md:text-[1em] my-1'><b>Original Title :</b> {dataMovie?.original_title}</div>
                <div className='text-justify text-[0.9em] md:text-[1em] my-1'><b>Tagline :</b> {dataMovie?.tagline}</div>
                <div className='text-justify text-[0.9em] md:text-[1em] my-1'><b>Release Date :</b> {stringDate(dataMovie?.release_date)}</div>
                <div className='text-justify text-[0.9em] md:text-[1em] my-1'><b>Popularity :</b> {numberFormat(dataMovie?.popularity)}</div>
                <div className='text-justify text-[0.9em] md:text-[1em] my-1 flex flex-row items-center gap-1'><b>Rate :</b> {Math.round(dataMovie?.vote_average)} <AiFillStar className="text-yellow text-[20px]" /></div>
                <div className='text-justify text-[0.9em] md:text-[1em] my-1'>{dataMovie?.overview}</div>
              </motion.div>
            </div>
            <motion.div initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1.2 } }} viewport={{once: true}} className="flex flex-col px-4 md:px-0" id="upcoming">
              <CardMovie Label={'For You'} State={popularMovie} DetailRoute={`/detail-movie`} LargeImage={`${imagePath}/w400`} SmallImage={`${imagePath}/w500`} AltImage={`Poster Movies`}/>
            </motion.div>   
          </div>
        </>
      ) : (
        <div className="absolute flex flex-col items-center justify-center w-full h-full left-50 right-50 top-50 bottom-50 dark:bg-bgDark">
          <RotateLoader color="#007AFF" size={12} margin={2}/>
        </div>
      )}
    </>
  )
}
