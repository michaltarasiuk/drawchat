import {createGroq} from "@ai-sdk/groq";
import {convertToModelMessages, streamText, type UIMessage} from "ai";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const {messages}: {messages: UIMessage[]} = await req.json();
  const result = streamText({
    model: groq("openai/gpt-oss-120b"),
    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}

export const maxDuration = 30;
