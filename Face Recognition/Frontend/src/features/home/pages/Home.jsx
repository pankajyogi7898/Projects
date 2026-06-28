import FaceExpression from '../../Expression/pages/FaceExpression'
import Player from '../components/Player'
import { SongContextProvider } from '../song.context'
import { useSong } from '../hook/useSong'

const Home = () => {
    const { handleGetSong } = useSong()
    return (
        <div className="home-container">
            <FaceExpression
                onClick={(expression) => { handleGetSong({ mood: expression }) }}
            />
            <Player />
        </div>
    )
}

export default Home
