import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { header } from "../services/Header"
import { BiSearchAlt, BiArrowBack } from "react-icons/bi"
import { BsFillSunFill, BsFillMoonFill, BsJustify } from "react-icons/bs"
import { RiCloseFill } from "react-icons/ri"
import './Header.css'
import axios from "axios"
import { RotateLoader } from "react-spinners"
import { AiFillStar } from "react-icons/ai"
import { motion } from 'framer-motion'

interface CustomClassProps {
  customClass?: string | null,
  humbergerClass?: string | null,
  modeSearch?: boolean | null,
  textSearch?: string,
  onChangeHandler? : any,
}

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

export default function Header({customClass, humbergerClass, modeSearch, textSearch, onChangeHandler}:CustomClassProps) {

  const [sideBar, setSideBar] = useState<boolean>(true)
  const [darkTheme, setisDark] = useState<boolean>(false)
  const [inputSearch, setInput] = useState<string>("")
  const [dataSearch, setDataSearch] = useState<Movie[]>([])
  const [showSearch, setShowSeatch] = useState<boolean>(false)
  const [searchingData, setSearchingData] = useState<boolean>()
  const apiURL = import.meta.env.VITE_APP_URL
  const keyURL = import.meta.env.VITE_APP_KEY
  const imagePath = import.meta.env.VITE_IMG_PATH

  const navigate = useNavigate()
  
  function darkMode(condition:boolean)
  {
    document.documentElement.classList.toggle("dark")
    if (condition) {
      setisDark(condition)
      localStorage.setItem('class', 'dark')
    } else {
      setisDark(condition)
      localStorage.removeItem('class')
    }
    
  }

  const hamberger = () => {
    {sideBar ? (
      setSideBar(false)
      ) : (
      setSideBar(true)
    )}
  }

  useEffect(() => {
    const checkTheme = localStorage.getItem('class')
    checkTheme ? setisDark(true) : setisDark(false)
    
    let timeOut:any
    const fetchData = async () => {
      try {
        const response =  await axios.get(`${apiURL}/search/movie?query=${inputSearch}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${keyURL}`
          }
        })
        setDataSearch(response.data.results.slice(0,4))
        setSearchingData(false)
      } catch (error) {
        console.error(error)
      } 
    }

    if (inputSearch?.length >= 3){
      if(timeOut) {
        clearTimeout(timeOut)
      }
      setDataSearch([])
      setShowSeatch(true)
      setSearchingData(true)
      timeOut = setTimeout(fetchData, 1500)
    } else {
      setShowSeatch(false)
      setSearchingData(false)
      setDataSearch([])
    }
    
    return () => {
      if (timeOut) {
        setShowSeatch(false)
        clearTimeout(timeOut)
      }
    }
  }, [inputSearch])

  const inputText = (event: any) => {
    setInput(event.target.value) 
  }

  function clearText()
  {
    setInput("")
  }

  const redirectToSearch = () => {
    navigate('/search', {state:{searchData: inputSearch}})
  }

  return (
    <>
      <div style={{zIndex: 999}} className={`top-[-2px] flex flex-col w-full dark:text-textDark ${sideBar ? (``) : (`bg-white dark:bg-bgDark`)} ${customClass ? customClass : `sticky bg-white dark:bg-bgDark text-[#0B0B0B] dark:text-textDark border-b-2 border-shadow-dark/20 dark:border-shadow-light/20`}`}>
        {modeSearch ? (
        <>
          <div className="flex flex-row items-center justify-start gap-3 p-4">
            <button onClick={() => navigate(-1)} className="p-3 text-center bg-white rounded-full shadow-md dark:bg-componentDark shadow-gray-400/60">
              <BiArrowBack className="text-[1rem] text-dark dark:text-textDark"/>
            </button> 
            <input type="text" defaultValue={textSearch} onChange={onChangeHandler} placeholder="Search" className="w-full px-4 py-3 bg-white rounded-full shadow-md outline-none md:w-full dark:bg-componentDark shadow-gray-400/60" />
            <Link to={'/search'} className="p-3 text-center bg-white rounded-full shadow-md dark:bg-componentDark shadow-gray-400/60">
              <BiSearchAlt className="text-[1rem] text-dark dark:text-textDark"/>
            </Link>
          </div>
        </>
        ) : (
        <>
          <div className={`flex flex-row items-center justify-between p-4`}>
            <BsJustify onClick={() => hamberger()} className={`${humbergerClass ? (humbergerClass) : (`text-[#0B0B0B] dark:text-textDark`)} text-[1.5rem] ${sideBar ? (`block`) : (`hidden`)} md:hidden`} />
            <RiCloseFill onClick={() => hamberger()} className={`text-[#0B0B0B] dark:text-textDark ${sideBar ? (`hidden`) : (`block`)} text-[1.5rem] md:hidden`} />
            <div className="flex-row hidden md:flex">
              {header.map((data) => (
                <Link to={`${data.link}`} key={data.id} className="mx-1.5 hover:text-[#007AFF] font-semibold md:text-[1rem] text-[0.8rem]">
                  {data.nameModule}
                </Link>
              ))}
            </div>
            <div className="flex-col hidden md:flex">
              <div className="hidden md:flex flex-row justify-between items-center p-1.5 md:p-2.5 rounded-full bg-white dark:bg-componentDark shadow-md shadow-gray-400/60">
                  <input onChange={inputText} value={inputSearch} placeholder={`Search Movie`} className="mx-1.5 w-[11rem] text-[#0B0B0B] text-[0.8rem] md:text-[0.95rem] md:w-[20rem] mr-2 outline-none bg-white dark:bg-componentDark dark:text-textDark"/>
                  <div onClick={clearText} className="flex items-center justify-center p-1 hover:bg-[#D4D4D4] dark:hover:bg-[#828282] rounded full">
                    {inputSearch.length > 0 ? (
                      <RiCloseFill className="w-[20px] h-[20px] text-dark dark:text-textDark"/>      
                      ) : (
                      <BiSearchAlt className="w-[20px] h-[20px] text-dark dark:text-textDark"/>
                    )}
                  </div>
              </div>
              <div style={{zIndex: 999}} className={`${showSearch ? (`fixed`) : (`hidden`)} top-[84px] w-auto h-auto p-4 bg-white dark:bg-bgDark text-dark dark:text-textDark rounded-xl shadow-md shadow-shadow-dark/40 dark:shadow-shadow-light/40`}>
                {searchingData ? (
                  <div className="flex flex-col justify-center gap-8 items-center w-[345px] p-8 dark:bg-bgDark">
                    <RotateLoader color="#007AFF" size={12} margin={0}/>
                    <div className="text-semibold">Wait Searching Data!</div>
                  </div>
                ) : dataSearch?.length > 0 ? (
                  <motion.div initial={{opacity: 0}} whileInView={{opacity: 1, transition: { ease: [0.6, 0.01, 0.05, 0.95], duration: 1.2 } }} viewport={{once: true}} className="flex flex-col gap-4 w-[345px]">
                    {dataSearch?.map((index:any) => (
                      <Link to={`/detail-movie/${index.id}`} className="flex flex-row gap-4" key={index.id}>
                        <img src={`${imagePath}/original${index.poster_path}`} className="w-20 rounded-xl"/>
                        <div className="flex flex-col gap-1.5 py-2 text-dark dark:text-textDark">
                          <div className="font-bold text-[1.2rem]">{index.title}</div>
                          <div className="text-dark/40 dark:text-textDark/40 text-[0.9rem]">{index.original_title}</div>
                          <div className="text-dark/40 dark:text-textDark/40 text-[0.9rem] flex flex-row items-center gap-1"><b>Rate :</b> <AiFillStar className="text-yellow text-[1rem]" /> {Math.round(index?.vote_average)}</div>
                        </div>
                      </Link>
                    ))}
                    {dataSearch?.length == 4 ? (
                      <div className="flex items-center justify-center text-dark dark:text-textDark hover:text-blue dark:hover:text-blue">
                        <div onClick={() => redirectToSearch()}>More Data</div>
                      </div>
                    ) : (``)}
                  </motion.div>
                ) 
                : (
                  <div className="flex flex-col items-center w-[345px] justify-center gap-8 h-[120px] dark:bg-bgDark">
                    <div className="text-semibold">No Data Found!</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              {darkTheme ? (
                <button onClick={() => darkMode(false)} className="p-3 mx-2 text-center rounded-full shadow-md bg-componentDark shadow-gray-400/60">
                  <BsFillMoonFill className="text-[#F4F2B6] text-[1rem] md:text-[1.2rem]" />
                </button>
              ) : ( 
                <button onClick={() => darkMode(true)} className="p-3 mx-2 text-center bg-white rounded-full shadow-md shadow-gray-400/60">
                  <BsFillSunFill className="text-yellow text-[1rem] md:text-[1.2rem]" />
                </button>
              )}
              <Link to={'/search'} className="block p-3 text-center bg-white rounded-full shadow-md md:hidden dark:bg-componentDark shadow-gray-400/60">
                <BiSearchAlt className="text-[1rem] text-dark dark:text-textDark"/>
              </Link>
            </div>
          </div> 
          <div style={{zIndex: 999}} className={`absolute ${sideBar ? (`hidden`) : (`block`)} bg-white dark:bg-bgDark w-full h-[1000px] md:hidden top-[3.75rem] sidebar`}>
            <div className="flex flex-col mt-4">
              {header?.map((data) => (
                <Link to={`${data.link}`} key={data.id} className="mx-4 my-1.5 font-semibold text-[#0B0B0B] dark:text-textDark text-[1.5rem]">
                    {data.nameModule}
                </Link>
              ))}
            </div>
          </div>
        </>
        )}
      </div>
    </>
  )
}
