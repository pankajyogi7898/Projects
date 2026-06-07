import React from 'react'
import MacWindow from './MacWindow'
import TerminalImport from "react-console-emulator";
const Terminal = TerminalImport.default;


const Cli = ({ windowName, setWindowState }) => {
    const commands = {
        neofetch: {
            description: "System info",
            fn: () => `
                    .--.
                    |o_o |
                    |:_/ |
                    //   \\ \\
                    (|     | )
                /'\\_   _/\`\\
                \\___)=(___/

            OS: Portfolio OS 1.0
            Host: Pankajnath
            Shell: zsh
            Stack: MERN
            Editor: VS Code`
        },
        about: {
            description: 'Show a short portfolio introduction.',
            usage: 'about',
            fn: () => 'I am Pankajnath, a portfolio showcasing web projects, design, and coding experience.'
        },
        projects: {
            description: 'Show sample portfolio projects.',
            usage: 'projects',
            fn: () => 'Projects:\n- MacOS portfolio UI\n- React terminal demo\n- Responsive dashboard design'
        },
        skills: {
            description: 'Show key skills.',
            usage: 'skills',
            fn: () => 'Skills:\n- React / JSX\n- CSS / SCSS\n- UI design\n- Frontend development'
        },
        contact: {
            description: 'Show contact information.',
            usage: 'contact',
            fn: () => 'Contact:\nEmail: example@domain.com\nLinkedIn: linkedin.com/in/example'
        },
        github: {
            description: "Open GitHub",
            fn: () => {
                window.open("https://github.com/pankajyogi7898");
                return "Opening GitHub...";
            }
        },
        echo: {
            description: 'Echo a passed string.',
            usage: 'echo <string>',
            fn: (...args) => args.join(' ')
        },
    }

    const welcomeMessage = `
                            ╔══════════════════════════════╗
                            ║  Pankajnath Portfolio CLI    ║
                            ╚══════════════════════════════╝
                            \nAvailable commands:\n` + Object.keys(commands)
            .map((name) => `- ${name}`)
            .join('\n') + `\nType 'help' for descriptions.`

    return (
        <MacWindow windowName={windowName} setWindowState={setWindowState}>
            <div className="cli-window">
                <Terminal
                    commands={commands}
                    welcomeMessage={welcomeMessage}
                    promptLabel="pankajnath@ubuntu:~/portfolio$"
                    style={{
                        backgroundColor: "#0d1117",
                        borderRadius: "12px",
                        height: "400px",
                        minHeight: "0",
                        overflowY: "auto",
                    }}
                    promptLabelStyle={{
                        color: "#00ff00",
                    }}
                />
            </div>

        </MacWindow>
    )
}

export default Cli
