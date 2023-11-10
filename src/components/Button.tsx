import { Link } from "react-router-dom"

interface passingData {
  href: string,
  customButton?: string | null,
  nameButton: string,
}

export default function Button({href, customButton, nameButton}: passingData) {
  return (
    <Link to={href} className={`${customButton ? (customButton) : (`text-[0.8rem] md:text-[1.02rem] my-8 py-3 px-4 bg-blue text-white text-center rounded-md`)}`}>{nameButton}</Link>
  )
}
