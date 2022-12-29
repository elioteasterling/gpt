import express from 'express'
import body from 'body-parser'
import cors from 'cors'
import { OpenAi } from './services/OpenAi'

const port = 3000
const app = express()

app.use(body.json())
app.use(cors())

app.get('/', async (req, res) => {
    try {
        const q = req.body.question || req.query.question
        if (q) {
            const openAi = new OpenAi(q)
            var answer = await openAi.ask()
            return res.status(200).json(answer)
        }
    } catch (e) {
        return res.status(500).json({error: `the call to open ai has failed due to:\n${JSON.stringify(e)}`})
    }
    return res.status(500).json({error: "failure: answer request failed"})
})

app.listen(port, () => {
    console.log(`Chat GPT Backend now available on ${port}`)
})
