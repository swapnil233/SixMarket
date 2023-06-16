import { createReadStream } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");

export default async function Handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // GET '/api/transcribe/'
    if (req.method === "GET") {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        try {
            // Transcribe
            const audio = createReadStream("audio-2.mp3");
            const transcription = await openai.createTranscription(audio, "whisper-1");
            console.log("Transcription complete.")

            // // Summarize
            const completion = await openai.createChatCompletion({
                model: "gpt-4",
                messages: [{ "role": "system", "content": "Summarize the following text, and give a list of action items (things the reader can do)" }, { role: "user", content: transcription.data.text }],
                temperature: 0.3,
                n: 1,
                max_tokens: 8192,
            });

            const transcriptionAndSummary = {
                transcription: transcription.data.text,
                // transcription: sampleTranscription,
                summary: completion.data.choices[0].message.content
            }

            return res.status(200).send(transcriptionAndSummary);
        } catch (error) {
            console.log(error)
            res.status(500).send("Something went wrong.")
        }
    }
}
