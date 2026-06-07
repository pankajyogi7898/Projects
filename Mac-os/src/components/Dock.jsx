import "./Dock.scss"
const Dock = ({ windowState, setWindowState }) => {
    return (
        <footer id="dock">
            <div
                onClick={() => setWindowState(state => ({ ...state, github: true }))}
                className="icon github">
                <img src="/doc-icons/github.svg" alt="" />
            </div>

            <div
                onClick={() => setWindowState(state => ({ ...state, pdf: true }))}
                className="icon pdf">
                <img src="/doc-icons/pdf.svg" alt="" />
            </div>

            <div
                onClick={() => setWindowState(state => ({ ...state, spotify: true }))}
                className="icon spotify">
                <img src="/doc-icons/spotify.svg" alt="" />
            </div>

            <div
                onClick={() => setWindowState(state => ({ ...state, note: true }))}
                className="icon note">
                <img src="/doc-icons/note.svg" alt="" />
            </div>

            <div
                onClick={() => window.open("mailto:pyogi8461@gmail.com")}
                className="icon mail">
                <img src="/doc-icons/mail.svg" alt="" />
            </div>

            <div
                onClick={() => { window.open("https://www.linkedin.com/in/pankaj-nath07/", "_blank") }}
                className="icon link">
                <img src="/doc-icons/link.svg" alt="" />
            </div>

            <div
                onClick={() => window.open("https://calendar.google.com/", "_blank")}
                className="icon calender">
                <img src="/doc-icons/calender.svg" alt="" />
            </div>

            <div
                onClick={() => setWindowState(state => ({ ...state, cli: true }))}
                className="icon cli">
                <img src="/doc-icons/cli.svg" alt="" />
            </div>
        </footer>
    )
}

export default Dock
