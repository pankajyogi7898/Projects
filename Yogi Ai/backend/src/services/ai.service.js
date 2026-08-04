import { ChatMistralAI, MistralAI } from '@langchain/mistralai';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";
import { tool, createAgent } from "langchain"
import { getIO } from "../sockets/server.socket.js";
import { searchInternet } from './internet.service.js';
import * as z from "zod"

const aiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
});

const titleModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
});

const searchInternetTool = tool(
    searchInternet,
    {
        name: "search_internet",
        description: "use this tool to get the latest information from the internet",
        schema: z.object({
            query: z.string().describe("the search query to look up on the internet")
        })
    }
)

const agent = createAgent({
    model: aiModel,
    tools: [searchInternetTool]
})

export async function responseGenerateStream({
    messages,
    socketId
}) {
    const io = getIO();
    const stream = await agent.stream(
        {
            messages: [
                new SystemMessage(`
You are Yogi AI.
Always answer in beautiful markdown.
Rules:
//- Use H1/H2/H3 headings.
//- Use bullet points.
//- Use numbered lists whenever appropriate.
//- Use tables for comparisons.
//- Use **bold** for important concepts.
//- Use emojis where they improve readability.
//- Use fenced code blocks with language names.
//- Leave blank lines between sections.
//- Never reply in one long paragraph.
//- Make answers visually attractive like ChatGPT or Claude.
//- If explaining programming, always include examples and code.
                `),
                ...messages.map(msg =>
                    msg.role === "user"
                        ? new HumanMessage(msg.content)
                        : new AIMessage(msg.content)
                )
            ]
        },
        {
            streamMode: "messages"
        }
    );
    let finalAnswer = "";
    for await (const chunk of stream) {
        const messageChunk = chunk[0];
        const text = messageChunk?.content;
        if (!text) continue;
        finalAnswer += text;
        io.to(socketId).emit("ai-stream", {
            chunk: text
        });
    }
    io.to(socketId).emit("ai-end");
    return finalAnswer;
}

// export async function responseGenerate(messages) {
//     const response = await agent.invoke({
//         messages: [
//             new SystemMessage(`
//                                 You are Yogi AI, a professional AI assistant.

//                                 Always respond in beautiful GitHub Markdown.

//                             Rules:
//                                 - Use H1/H2/H3 headings.
//                                 - Use bullet points.
//                                 - Use numbered lists whenever appropriate.
//                                 - Use tables for comparisons.
//                                 - Use **bold** for important concepts.
//                                 - Use emojis where they improve readability.
//                                 - Use fenced code blocks with language names.
//                                 - Leave blank lines between sections.
//                                 - Never reply in one long paragraph.
//                                 - Make answers visually attractive like ChatGPT or Claude.
//                                 - If explaining programming, always include examples and code.`),
//             ...messages.map(msg => {
//                 if (msg.role === "user") {
//                     return new HumanMessage(msg.content);
//                 } else {
//                     return new AIMessage(msg.content);
//                 }
//             })
//         ]
//     })

//     return response.messages[response.messages.length - 1].text
// }

export async function generateChatTitle(message) {
    const response = await titleModel.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.
        `),
        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}"
            `)
    ])
    return response.text;
}

