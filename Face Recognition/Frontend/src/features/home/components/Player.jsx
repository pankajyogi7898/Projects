import { useRef, useState } from "react";
import "../styles/Player.scss";
import { useSong } from "../hook/useSong";

const Player = () => {
    const { song } = useSong();

    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [speed, setSpeed] = useState(1);

    if (!song) return null;

    const playPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const skipForward = () => {
        audioRef.current.currentTime += 5;
    };

    const skipBackward = () => {
        audioRef.current.currentTime -= 5;
    };

    const handleProgress = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    const handleVolume = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    };
    const handleSpeedChange = (newSpeed) => {
        setSpeed(newSpeed);

        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    const formatTime = (time) => {
        if (!time) return "0:00";

        const m = Math.floor(time / 60);
        const s = Math.floor(time % 60);

        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="player">

            <audio
                ref={audioRef}
                src={song.url}
                onLoadedMetadata={() =>
                    setDuration(audioRef.current.duration)
                }
                onTimeUpdate={() =>
                    setCurrentTime(audioRef.current.currentTime)
                }
                onEnded={() => setIsPlaying(false)}
            />

            {/* LEFT */}

            <div className="left">

                <img src={song.posterUrl} alt="" />

                <div>

                    <h3>{song.title}</h3>

                    <p>{song.mood}</p>

                </div>

            </div>

            {/* CENTER */}

            <div className="center">

                <div className="controls">

                    <button onClick={skipBackward}>
                        ⏮
                    </button>

                    <button
                        className="play"
                        onClick={playPause}
                    >
                        {isPlaying ? "⏸" : "▶"}
                    </button>

                    <button onClick={skipForward}>
                        ⏭
                    </button>

                </div>

                <div className="progress">

                    <span>
                        {formatTime(currentTime)}
                    </span>

                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleProgress}
                    />

                    <span>
                        {formatTime(duration)}
                    </span>

                </div>

            </div>

            {/* RIGHT */}

            <div className="right">

                <select
                    value={speed}
                    onChange={(e) =>
                        handleSpeedChange(parseFloat(e.target.value))
                    }
                    className="speed-select"
                >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                </select>

                <span>🔊</span>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolume}
                    className="volume-slider"
                />

            </div>
        </div>
    );
};

export default Player;