import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAFxbn2ZgZSRG7k3T2Bnze74eAVt3xN4RE";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function run(char) {
    const generationConfig = {
        stopSequences: ['red'],
        maxOutputTokens: 100,
        temperature: 0.9,
        topP:0.1,
        topK: 16,
    };
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }, generationConfig);
    console.log("running gemini")
    const prompt = `Create a one sentence action sentence for ${char} similar to an action on a pokemon card or dungeons and dragons. `
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text); // Output the generated text to the console
    return(text)
}

// Automatically execute the run() function when the script is loaded