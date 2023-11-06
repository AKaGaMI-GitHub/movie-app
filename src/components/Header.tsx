import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { header } from "../services/Header"
import { BiSearchAlt, BiArrowBack } from "react-icons/bi"
import { BsFillSunFill, BsFillMoonFill, BsJustify } from "react-icons/bs"
import { RiCloseFill } from "react-icons/ri"
import './Header.css'

interface CustomClassProps {
  customClass?: string | null,
  humbergerClass?: string | null,
  modeSearch?: boolean | null,
  textSearch?: string,
  onChangeHandler? : any,
}

export default function Header({customClass, humbergerClass, modeSearch, textSearch, onChangeHandler}:CustomClassProps) {

  const [sideBar, setSideBar] = useState<boolean>(true)

  const [darkTheme, setisDark] = useState<boolean>(false)

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
  }, [])

  return (
    <>
      <div style={{zIndex: 999}} className={`top-[-2px] flex flex-col w-full dark:text-textDark ${sideBar ? (``) : (`bg-white dark:bg-bgDark`)} ${customClass ? customClass : `sticky bg-white dark:bg-bgDark text-[#0B0B0B] dark:text-textDark border-b-2 border-shadow-dark/20 dark:border-shadow-light/20`}`}>
        {modeSearch ? (
        <>
          <div className="flex flex-row items-center justify-start items-center gap-3 p-4">
            <button onClick={() => navigate(-1)} className="p-3 text-center bg-white rounded-full shadow-md dark:bg-componentDark shadow-gray-400/60">
              <BiArrowBack className="text-[1rem] text-dark dark:text-textDark"/>
            </button> 
            <input type="text" defaultValue={textSearch} onChange={onChangeHandler} placeholder="Search" className="py-3 px-4 w-full md:w-full outline-none bg-white rounded-full shadow-md dark:bg-componentDark shadow-gray-400/60" />
            <Link to={'/search'} className="p-3 text-center bg-white rounded-full shadow-md dark:bg-componentDark shadow-gray-400/60">
              <BiSearchAlt className="text-[1rem] text-dark dark:text-textDark"/>
            </Link>
          </div>
        </>
        ) : (
        <>
          <div className="flex flex-row items-center justify-between p-4">
            <BsJustify onClick={() => hamberger()} className={`${humbergerClass ? (humbergerClass) : (`text-[#0B0B0B] dark:text-textDark`)} text-[1.5rem] ${sideBar ? (`block`) : (`hidden`)} md:hidden`} />
            <RiCloseFill onClick={() => hamberger()} className={`text-[#0B0B0B] dark:text-textDark ${sideBar ? (`hidden`) : (`block`)} md:hidden`} />
            <div className="flex flex-row hidden md:block">
              {header.map((data) => (
                <Link to={`${data.link}`} key={data.id} className="mx-1.5 hover:text-[#007AFF] font-semibold md:text-[1rem] text-[0.8rem]">
                  {data.nameModule}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex flex-row justify-between items-center p-1.5 md:p-2.5 rounded-full bg-white dark:bg-componentDark shadow-md shadow-gray-400/60">
                <input placeholder={`Search Movie`} className="mx-1.5 w-[11rem] text-[#0B0B0B] dark:text-textDark text-[0.8rem] md:text-[0.95rem] md:w-[20rem] mr-2 outline-none bg-white dark:bg-componentDark dark:text-textDark"/>
                <div className="flex items-center justify-center p-1 hover:bg-[#D4D4D4] dark:hover:bg-[#828282] rounded full">
                  <BiSearchAlt className="w-[20px] h-[20px] text-dark dark:text-textDark"/>
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
              {header.map((data) => (
                <Link to={`${data.link}`} key={data.id} className="mx-4 my-1.5 font-semibold text-[#0B0B0B] dark:text-textDark text-[1rem]">
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
