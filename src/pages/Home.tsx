import { useState, useEffect, CSSProperties } from "react"
import Header from '../components/Header'
import axios from 'axios'
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { RotateLoader } from "react-spinners"
import CardMovie from "../components/CardMovie"
import { motion } from "framer-motion"
import 'swiper/css'
import 'swiper/css/pagination'
import './Slider.css'

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
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number
}

interface CustomCSS extends CSSProperties {
  '--background-url' : string,
}

export default function Home() {

  const [dataMovie, setData] = useState<Movie[] | null>()
  const [popularMovie, setPopular] = useState<Movie[] | null>([])
  const [upcomingMovie, setUpcoming] = useState<Movie[] | null>([])
  const [isScrolled, setScrolled] = useState<Boolean>(false)
  const apiURL = import.meta.env.VITE_APP_URL
  const keyURL = import.meta.env.VITE_APP_KEY
  const imagePath = import.meta.env.VITE_IMG_PATH
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/movie/now_playing`, {
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
      const responseUpcoming = await axios.get(`${apiURL}/movie/upcoming`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${keyURL}`
        }
      })
      if (response.status == 200 && responsePopular.status == 200) {
        setData(response.data.results.slice(0,5))
        setPopular(responsePopular.data.results.slice(0,6))
        setUpcoming(responseUpcoming.data.results.slice(0,6))
      }
    } catch (error) {
      alert(`Error : ${error}`)
    }
  }
  
  useEffect(() => {
    setTimeout(() => {
      fetchData()
      const handleScroll = () => {
        const upcomingPoster:any = document.getElementById('upcoming')
        const scrollPosition = window.scrollY;
        if (scrollPosition > upcomingPoster?.offsetTop - 110) {
          setScrolled(true);
        } else if (scrollPosition < upcomingPoster?.offsetTop) {
          setScrolled(false);
        }
      }
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, 150)
    setData(null)
  }, [])

  function stringDate(date:string) {
    const convertString = new Date(date)
    return convertString.toDateString()
  }
  return (
    <>
      {dataMovie && popularMovie && upcomingMovie ? (
        <>
          <Header customClass={`fixed ${isScrolled ? 'bg-white dark:bg-bgDark border-b-2 border-shadow-dark/20 dark:border-shadow-light/20 text-dark dark:text-textDark' : 'bg-transparent dark:bg-transparent text-white'}`} humbergerClass={`${isScrolled ? `text-[#0B0B0B] dark:text-textDark` : `bg-transparent text-white`}`}/>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { ease: [0.5, 0.4, 0.3, 0.2], duration: 0.2 } }} viewport={{once: true}}  className="mb-8 bg-white dark:bg-bgDark md:mb-0">
            <Swiper
              slidesPerView={1}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {dataMovie?.map((index) => (
                <SwiperSlide key={index.id}>
                  <Link to={`/detail-movie/${index.id}`}>
                    <div
                      style={{
                        '--background-url': `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${imagePath}/original${index.backdrop_path})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundImage: 'var(--background-url)',
                        backgroundPosition: 'center',
                      } as CustomCSS}
                      className="bg-[image:var(--background-url)] h-[400px] md:h-[580px] text-yellow mb-6 md:mb-8"
                    >
                      <div className="absolute w-full px-4 overflow-visible md:px-8 bottom-10 md:bottom-16">
                        <div className="text-[7em] md:text-[12em] font-bold">{index.title}</div>
                        <div className="text-[3.5em] md:text-[5em] font-semibold">Release Date : {stringDate(index.release_date)}</div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <motion.div initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1.2 } }} viewport={{once: true}} className="flex flex-col px-4 md:px-8" id="upcoming">
              <CardMovie Label={'Popular Movies'} State={popularMovie} DetailRoute={`/detail-movie`} LargeImage={`${imagePath}/w400`} SmallImage={`${imagePath}/w200`} AltImage={`Poster Movies`}/>
            </motion.div>
            <motion.div initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1.2 } }} viewport={{once: true}} className="flex flex-col p-4 md:p-8" id="upcoming">
              <CardMovie Label={'Upcoming Movies'} State={upcomingMovie} DetailRoute={`/detail-movie`} LargeImage={`${imagePath}/w400`} SmallImage={`${imagePath}/w200`} AltImage={`Poster Movies`}/>
            </motion.div>
          </motion.div>
        </>
      ) : (
        <div className="absolute flex flex-col items-center justify-center w-full h-full left-50 right-50 top-50 bottom-50 dark:bg-bgDark">
          <RotateLoader color="#007AFF" size={12} margin={2}/>
        </div>
      )}
    </>
  )
}
