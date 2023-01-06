import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const conf = new Configuration({ apiKey: process.env.OPENAI_API_KEY })

const openai = new OpenAIApi(conf)

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/ask', async (req: Request, res: Response) => {
    try {
        const answer = await openai.createCompletion({
            model: 'text-davinci-003',  // model to use for predictions (limited to only 4000 tokens per request / question)
            max_tokens: 32,             // gpt text output - only 32 tokens per request, hard, developer-enforced limit
            prompt: req.body.question,  // gpt text input
            echo: false,                // return the prompt along with the prediction
            temperature: 0.666,         // max amount of risk the model can use
            // top_p: 1,                   alternative to temperature sampling - DON'T USE BOTH apparently
            frequency_penalty: 0,       // [-2, 2] interval | higher values => reduce redundancy
            presence_penalty: 0,        // [-2, 2] interval | higher values => make it more likely to talk about new topics
            // stop: ['---E-O-F---'],      pattern to end prompt 
            user: 'if i had multiple users i could assign them an unique id so that openai can monitor them and make sure they\'re not fucking around (so this gigantic string would be my id, iff i make no changes to it)'
        })
        res.status(200).send({ prediction: answer.data, error: ''})
    } catch (error) {
        const env = process.env.ENV
        if (env === 'dev') res.status(500).send({ error })
        else {             res.status(500).end()
                           console.error("/api/ask", error)
        }
    }
    
})
