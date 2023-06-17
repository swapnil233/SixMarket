import { IChatCompletion, IOpenAIApi, ITranscription, ITranscriptionRequest } from "@/utils/openAI";
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
        const openai: IOpenAIApi = new OpenAIApi(configuration);

        try {
            // Prepare the transcription request
            const transcriptionRequest: ITranscriptionRequest = {
                file: createReadStream("audio-3.mp3"),
                model: "whisper-1",
                language: 'en'
            };

            // Transcribe
            const transcription: ITranscription = await openai.createTranscription(transcriptionRequest.file, transcriptionRequest.model);

            // Summarize
            const summary: IChatCompletion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "Summarize the given text. Create bullet points where appropriate."
                    },
                    {
                        role: "user",
                        content: transcription.data.text
                    }
                ],
                temperature: 0.3,
            });

            const transcriptionAndSummary = {
                transcription: transcription.data.text,
                summary: summary.data.choices[0].message.content
            }

            return res.status(200).send(transcriptionAndSummary);
        } catch (error) {
            console.log(error)
            res.status(500).send("Something went wrong.")
        }
    }
}