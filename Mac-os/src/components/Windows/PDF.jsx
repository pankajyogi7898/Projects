import React from 'react'
import MacWindow from './MacWindow'
import "./pdf.scss"

const PDF = ({ windowName, setWindowState }) => {
    return (
        <MacWindow width='20vw' windowName={windowName} setWindowState={setWindowState}>
            <div className="pdf-window">
                <iframe src="/pankaj yogi resume editable1234.pdf"></iframe>
            </div>
        </MacWindow>
    )
}

export default PDF
