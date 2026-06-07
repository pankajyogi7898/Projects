import React from 'react'
import githubData from "../../assets/github.json"
import MacWindow from './MacWindow'
import "./github.scss"

const GitCard = ({ data = { id: 1, image: "", title: "", description: "", tags: [], repolink: "", demolink: "" } }) => {
    return <div className="card">
        <img src={data.image} alt="" />
        <h1>{data.title}</h1>
        <p className='description'>{data.description}</p>

        <div className="tags">
            {
                data.tags.map(tag => <p className='tag'>{tag}</p>)
            }
        </div>

        <div className="urls">
            <a href={data.repolink}>Repository</a>
            <a href={data.demolink}>Demolink</a>
        </div>
    </div>
}

const Github = ({ windowName, setWindowState }) => {
    return (
        <MacWindow
            windowName={windowName}
            setWindowState={setWindowState}
        >
            <div className="cards">
                {githubData.map(project => (
                    <GitCard key={project.id} data={project} />
                ))}
            </div>
        </MacWindow>
    )
}

export default Github
