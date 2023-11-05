import { useState } from "react"
import { Link } from "react-router-dom"
import { header } from "../services/Header"
import { BiSearchAlt } from "react-icons/bi"
import { BsFillSunFill, BsFillMoonFill, BsJustify } from "react-icons/bs"
import { RiCloseFill } from "react-icons/ri"
import './Header.css'

interface CustomClassProps {
  customClass?: string | null,
  humbergerClass?: string | null,
}

export default function Header({customClass, humbergerClass}:CustomClassProps) {

  const [searchText, setSearch] = useState<String>("")
  const [sideBar, setSideBar] = useState<Boolean>(true)

  const hamberger = () => {
    {sideBar ? (
      setSideBar(false)
      ) : (
      setSideBar(true)
    )}
  }


  return (
    <div style={{zIndex: 999}} id="navbar" className={`top-[-2px] flex flex-col w-full dark:text-textDark ${sideBar ? (``) : (`bg-white dark:bg-bgDark`)} ${customClass}`}>
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
            <input placeholder={`Search Movie`} className="mx-1.5 w-[11rem] text-[#0B0B0B] dark:text-textDark text-[0.8rem] md:text-[0.95rem] md:w-[20rem] mr-2 outline-none bg-white dark:bg-componentDark dark:text-textDark" onChange={(searchText) => setSearch(searchText.target.value)}/>
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
          <Link to={'/'} className="block p-3 text-center bg-white rounded-full shadow-md md:hidden dark:bg-componentDark shadow-gray-400/60">
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
    </div>
  )
}
