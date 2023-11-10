type Header = {
    id: number,
    nameModule: string,
    link: string,  
}

export const header:Header[] = [
    {
        id: 1,
        nameModule: "Home",
        link: "/"
    },
    {
        id: 2,
        nameModule: "Popular",
        link: "/popular"
    },
    {
        id: 3,
        nameModule: "Top Rated",
        link: "/top-rated"
    },
    {
        id: 4,
        nameModule: "Up Coming",
        link: "/upcoming"
    },
]