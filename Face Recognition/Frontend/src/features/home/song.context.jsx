import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [song, setSong] = useState(
        {
            "url": "https://ik.imagekit.io/9qqpodpvh/cohort/modify/songs/20-20_-_PagalNew_Z95bbRe83.mp3",
            "posterUrl": "https://ik.imagekit.io/9qqpodpvh/cohort/modify/posters/20-20_-_PagalNew_UxuO79CTP.jpeg",
            "title": "20-20 - PagalNew",
            "mood": "happy",
        }
    )
    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{ loading, setLoading, song, setSong }}>
            {children}
        </SongContext.Provider>
    )

}