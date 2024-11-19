import { Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: "your-api-key",
  })
);

console.log("OpenAI imported successfully!");
