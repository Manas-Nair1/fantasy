import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAFxbn2ZgZSRG7k3T2Bnze74eAVt3xN4RE";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function run() {
    console.log("running gemini")
    const prompt = "say hello"
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text); // Output the generated text to the console
    return(text)
}

// Automatically execute the run() function when the script is loaded