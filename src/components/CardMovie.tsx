import { Link } from "react-router-dom";

interface CardMovieProps {
    Label: string;
    State: any[];
    DetailRoute: string;
    LargeImage: string;
    SmallImage: string;
    AltImage: string;
    Popular?: boolean;
}

export default function CardMovie({Label, State, DetailRoute, LargeImage, SmallImage, AltImage, Popular}: CardMovieProps) {
    function stringDate(date:string) {
        const convertString = new Date(date)
        return convertString.toDateString()
    }
    return (
        <>
            <p className="my-2 font-bold text-dark text-[1.5rem] dark:text-white">{Label}</p>
            <div className="flex flex-row flex-wrap justify-center gap-4 md:flex md:flex-row md:justify-between item-center">
                {State?.map((index:any) => (
                <Link to={`${DetailRoute}/${index.id}`} key={index.id} className="w-full md:w-[200px] flex flex-col my-2 mx-0">
                    <img src={`${LargeImage}${index.poster_path}`} alt={AltImage} className="hidden rounded-md md:block"/>
                    <div className="flex items-center justify-center h-[24rem] overflow-hidden rounded-md md:hidden">
                        <img src={`${SmallImage}${index.poster_path}`} alt={AltImage} className="w-full"/>
                    </div>
                    <div className="text-[18px] text-dark dark:text-textDark mx-0.5 my-1.5 font-[500]">{index.title}</div>
                    <div className="text-[14px] text-dark dark:text-textDark mx-0.5">Release Date : {stringDate(index.release_date)}</div>
                    {Popular ? (
                        <div className="text-[14px] text-dark/40 dark:text-textDark/40 mx-0.5">Popularity : {index.popularity}</div>
                    ) : (null)}
                </Link>
                ))}
            </div>
        </>
    )
}
