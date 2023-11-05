import { Link } from "react-router-dom";

interface CardMovieProps {
    Label: string;
    State: any[];
    DetailRoute: string;
    LargeImage: string;
    SmallImage: string;
    AltImage: string;
}

export default function CardMovie({Label, State, DetailRoute, LargeImage, SmallImage, AltImage}: CardMovieProps) {
    function stringDate(date:string) {
        const convertString = new Date(date)
        return convertString.toDateString()
    }
    return (
        <>
            <p className="my-2 font-bold text-dark text-[1.5rem] dark:text-white">{Label}</p>
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:flex-wrap md:justify-between item-center">
                {State?.map((index:any) => (
                <Link to={`${DetailRoute}/${index.id}`} key={index.id} className="w-[170px] md:w-[180px] flex flex-col my-2 mx-0 md:mx-0">
                    <img src={`${LargeImage}${index.poster_path}`} alt={AltImage} className="hidden rounded-md md:block"/>
                    <img src={`${SmallImage}${index.poster_path}`} alt={AltImage} className="block rounded-md md:hidden"/>
                    <div className="text-[18px] text-dark dark:text-textDark mx-0.5 my-1.5 font-[500]">{index.title}</div>
                    <div className="text-[14px] text-dark dark:text-textDark mx-0.5">Release Date : {stringDate(index.release_date)}</div>
                </Link>
                ))}
            </div>
        </>
    )
}
