import Header from '../components/Header'
import NotFoundImage from '../assets/404.svg'
import { motion } from "framer-motion"
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  useNavigate()
  return (
    <>
      <Header customClass={`sticky bg-white dark:bg-bgDark text-[#0B0B0B] dark:text-textDark border-b-2 border-shadow-dark/20 dark:border-shadow-light/20`}/>
      <motion.div initial={{y: -25, opacity: 0}} whileInView={{ y: 0, opacity: 1, transition: { ease: [0.6, 0.01, 0.08, 0.85], duration: 1.5 } }} viewport={{once : true}} className='fixed top-0 flex flex-col items-center justify-center w-full h-full bg-white bottom-50 right-50 left-50 dark:bg-bgDark'>
          <img src={NotFoundImage} className='w-[320px] h-[320px] md:w-[420px] md:h-[420px]'/>
          <div className='font-bold text-[1.8rem] text-dark dark:text-textDark'>404 Page Not Found</div>
          <Button href={'/'} nameButton={'Back to Home'} />
      </motion.div>
    </>
  )
}
