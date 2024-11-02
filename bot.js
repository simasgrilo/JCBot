//Iniciando o modelo
import { GoogleGenerativeAI } from "@google/generative-ai";
//import 'dotenv/config.js';
//const GoogleGenerativeAI = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function chat(message) {
  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });
  let result = await chat.sendMessage(
    message
  );
  let botAnswer = result.response.text();
  return botAnswer;
  // [END chat]
}

export async function run(message) {
  return chat(message);
}

//console.log(run("quando foi lançada total eclipse of the heart"));