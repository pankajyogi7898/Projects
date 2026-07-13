import "dotenv/config"
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage } from "@langchain/core/messages";
import promptSync from "prompt-sync";
import * as z from "zod"
import { tool, createAgent } from "langchain"
import { sendEmail } from "./mail.service.js"


const prompt = promptSync();
const sendEmailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "send a email to a user",
        schema: z.object({
            to: z.string().describe("the recipient email address"),
            subject: z.string().describe("the email subject"),
            html: z.string().describe("the email HTML content"),
            text: z.string().describe("the email text content")
        })
    }
)


const model = new ChatMistralAI({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-large-latest"
});


const agent = createAgent({
    model,
    tools: [sendEmailTool]
})

const messages = []

while (true) {
    const userInput = prompt("You : ")

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({ messages })

    messages.push(response.messages[response.messages.length - 1]);

    console.log(`AI : ${response.messages[response.messages.length - 1].content}`)
}

