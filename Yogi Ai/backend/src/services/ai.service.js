import { ChatGoogleGenerativeAI } from '@langchain/google-genai';


const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    apiKey: process.env.GOOGLE_API_KEY
});

