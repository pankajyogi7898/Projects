import { useEffect, useState } from 'react'
import './app.scss'

import Dock from './components/Dock'
import Nav from './components/Nav'

import Cli from './components/Windows/Cli'
import Github from './components/Windows/Github'
import Notes from './components/Windows/Notes'
import PDF from './components/Windows/PDF'
import Spotify from './components/Windows/Spotify'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const [windowState, setWindowState] = useState({
    github: false,
    notes: false,
    pdf: false,
    spotify: false,
    cli: false
  })

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0
  })


  const handleContextMenu = (e) => {
    e.preventDefault()

    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    })
  }

  const closeContextMenu = () => {
    setContextMenu(prev => ({
      ...prev,
      visible: false
    }))
  }

  if (loading) {
    return (
      <div className="boot-screen">
        <div className="boot-content">
          <h1><img src="/my3.jpeg" alt="PankajYOGI" /></h1>
          <h2>PankajOS</h2>
          <p>Booting...</p>

          <div className="loader">
            <div className="progress"></div>
          </div>
        </div>
      </div>
    )
  }
  return (

    <main
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >

      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source
          src="./mac-os-video2.mp4"
          type="video/mp4"
        />
      </video>

      <Nav />

      <Dock
        windowState={windowState}
        setWindowState={setWindowState}
      />

      {/* Right Click Menu */}

      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{
            top: contextMenu.y,
            left: contextMenu.x
          }}
        >
          <div
            className="item"
            onClick={() => window.location.reload()}
          >
            🔄 Refresh
          </div>

          <div
            className="item"
            onClick={() =>
              setWindowState(prev => ({
                ...prev,
                notes: true
              }))
            }
          >
            👨 About Me
          </div>

          <div
            className="item"
            onClick={() =>
              setWindowState(prev => ({
                ...prev,
                github: true
              }))
            }
          >
            📂 Projects
          </div>

          <div
            className="item"
            onClick={() =>
              setWindowState(prev => ({
                ...prev,
                pdf: true
              }))
            }
          >
            📄 Resume
          </div>

          <div
            className="item"
            onClick={() =>
              setWindowState(prev => ({
                ...prev,
                cli: true
              }))
            }
          >
            💻 Terminal
          </div>

        </div>
      )}

      {/* Windows */}

      {windowState.github && (
        <Github
          windowName="github"
          windowState={windowState}
          setWindowState={setWindowState}
        />
      )}

      {windowState.notes && (
        <Notes
          windowName="notes"
          setWindowState={setWindowState}
        />
      )}

      {windowState.pdf && (
        <PDF
          windowName="pdf"
          setWindowState={setWindowState}
        />
      )}

      {windowState.spotify && (
        <Spotify
          windowName="spotify"
          setWindowState={setWindowState}
        />
      )}

      {windowState.cli && (
        <Cli
          windowName="cli"
          setWindowState={setWindowState}
        />
      )}

    </main>
  )
}

export default App