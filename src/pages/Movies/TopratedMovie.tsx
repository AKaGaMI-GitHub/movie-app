import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { motion } from "framer-motion"
import CardMovie from '../../components/CardMovie'
import axios from 'axios'
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
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number
}

export default function TopratedMovie() {
  const [data, setData] = useState<Movie[]>([])
  const apiURL = import.meta.env.VITE_APP_URL
  const keyURL = import.meta.env.VITE_APP_KEY
  const imagePath = import.meta.env.VITE_IMG_PATH

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiURL}/movie/top_rated`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${keyURL}`
        }
      })
      if (response.status == 200) {
        setData(response.data.results)
      }
    } catch (error) {
      console.log(`Error : ${error}`)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData()
    }, 150)
    setData([])
  }, [])

  return (
    <>
      {data?.length > 0 ? (
        <>
          <Header />
          <motion.div initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1.2 } }} viewport={{once: true}} className="flex flex-col px-4 py-2 md:px-8" id="upcoming">
            <CardMovie Label={'Top Rated'} State={data} DetailRoute={`/detail-movie`} LargeImage={`${imagePath}/w400`} SmallImage={`${imagePath}/w500`} AltImage={`Poster Movies`}/>
          </motion.div>   
        </>
      ) : (
        <>
          <div className="absolute flex flex-col items-center justify-center w-full h-full left-50 right-50 top-50 bottom-50 dark:bg-bgDark">
            <RotateLoader color="#007AFF" size={12} margin={2}/>
          </div>
        </>
      )}
    </>
  )
}
