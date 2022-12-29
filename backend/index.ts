import express from 'express'
import body from 'body-parser'
import cors from 'cors'

const port = 3000
const app = express()

app.use(body.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('sup boi')
})

app.listen(port, () => {
    console.log(`Chat GPT Backend now available on ${port}`)
})