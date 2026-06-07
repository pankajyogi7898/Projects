import React from 'react'
import { Rnd } from 'react-rnd'
import './window.scss'

const MacWindow = ({ children, width = "40vw", height = "40vh", windowName, setWindowState }) => {
    return (
        <Rnd
            default={{
                width: width,
                height: height,
                x: 100,
                y: 100
            }}
            minWidth={680}
            minHeight={400}
        >
            <div className="window"
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                <div className="nav">
                    <div className="dots">
                        <div

                            onClick={console.log(setWindowState), () => setWindowState(state => ({ ...state, [windowName]: false }))} className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                    </div>
                    <div className="title"><p>pankajnath—— -zsh</p></div>
                </div>

                <div className="main-content">
                    {children}
                </div>
            </div>
        </Rnd >
    )
}

export default MacWindow
