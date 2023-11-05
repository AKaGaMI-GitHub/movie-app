import Header from '../components/Header'
import NotFoundImage from '../assets/404.svg'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

export default function NotFoundPage() {
  return (
    <>
      <Header customClass={`sticky bg-white dark:bg-bgDark text-[#0B0B0B] dark:text-textDark border-b-2 border-shadow-dark/20 dark:border-shadow-light/20`}/>
      <motion.div initial={{y: -25, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.08, 0.85], duration: 1.5 } }} viewport={{once : true}} className='flex flex-col items-center justify-center'>
          <img src={NotFoundImage} className='w-[320px] h-[320px] md:w-[420px] md:h-[420px]'/>
          <div className='font-bold text-[1.8rem]'>404 Page Not Found</div>
          <Link to={'/'} className='text-[0.8rem] md:text-[1.02rem] my-8 py-4 px-4 bg-blue-600 text-white text-center rounded-md'>Back to home</Link>
      </motion.div>
    </>
  )
}
