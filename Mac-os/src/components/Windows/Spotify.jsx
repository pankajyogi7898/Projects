import React from 'react'
import MacWindow from './MacWindow'
import "./spotify.scss"

const Spotify = ({windowName, setWindowState}) => {
    return (
        <MacWindow width='20vw' height='10vh' windowName={windowName} setWindowState={setWindowState}>
            <div className="spotify-window">
                <iframe data-testid="embed-iframe" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX14CbVHtvHRB?utm_source=generator&theme=0" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" loading="lazy"></iframe>
            </div>
        </MacWindow>
    )
}

export default Spotify
