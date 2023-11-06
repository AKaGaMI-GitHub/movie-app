import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { time } from 'console'

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

export default function SearchMovie() {

  const [searchText, setSearch] = useState<string>("")
  const [dataMovie, setDataMovie] = useState<Movie[] | null>()
  const apiURL = import.meta.env.VITE_APP_URL
  const keyURL = import.meta.env.VITE_APP_KEY
  const imagePath = import.meta.env.VITE_IMG_PATH 

  useEffect(() => {
    let timeOut:any
    const fetchData = async () => {
      try {
        const response =  await axios.get(`${apiURL}/search/movie?query=${searchText}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${keyURL}`
          }
        })
        setDataMovie(response.data.data.results)
      } catch (error) {
        console.error(error)
      } 
    }

    if(searchText.length >= 3){
      if(timeOut) {
        clearTimeout(timeOut)
      }
      setDataMovie(null)
      timeOut = setTimeout(fetchData, 2000)
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
    setSearch(inputText.target.value)
  }

  return (
    <>
      <Header modeSearch={true} textSearch={searchText} onChangeHandler={handleSearchChange}/>
      <div className='text-dark dark:text-textDark'>
        
      </div>
    </>
  )
}
