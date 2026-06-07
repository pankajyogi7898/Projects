import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MacWindow from "./MacWindow"
import "./note.scss"

const Notes = ({ windowName, setWindowState }) => {
    const [markdown, setMarkdown] = useState(null)

    useEffect(() => {
        fetch("/note.txt")
            .then(res => res.text())
            .then(text => setMarkdown(text))
    }, [])
    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState}>
            <div className="note-window">
                {markdown ? <SyntaxHighlighter language="typescript" style={atelierDuneDark}>
                    {markdown}
                </SyntaxHighlighter> : <p>loading...</p>}
            </div>
        </MacWindow>
    )
}

export default Notes
