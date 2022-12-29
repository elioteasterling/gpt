import { Configuration, CreateAnswerRequest, OpenAIApi, CreateAnswerResponse, CreateCompletionResponseChoicesInner, CreateCompletionResponse } from 'openai'
import { Asker } from '../contracts/Asker'

export class OpenAi implements Asker {
    config:   Configuration
    question: CreateAnswerRequest

    constructor(question: CreateAnswerRequest = questionType, config: Configuration = conf) {
        this.config   = config
        this.question = question
    }

    async ask(q?: CreateAnswerRequest): Promise<CreateCompletionResponse> { return await askOpenAi(this.config, q || this.question) }
}

async function askOpenAi(c: Configuration = conf, q: CreateAnswerRequest = questionType): Promise<CreateCompletionResponse> {
    const  oai = new OpenAIApi(c)
    const  res = await oai.createCompletion(q)
    return res.data
}

const conf = new Configuration({
    organization: process.env.OPEN_AI_ID,
    apiKey:       process.env.OPEN_AI_API_KEY
})

const questionType = {
    model: 'text-davinci-003',
    prompt: '',
    max_tokens: 16,
    temperature: 0,     // [0, 1] ≡ [not creative or risky, converse of the former]
    question: '',
    examples: [],
    examples_context: ''
}

export interface Choice    extends CreateCompletionResponseChoicesInner { text: '\n\nThis is a possible answer', index: 0, logprobs: null, finish_reason: '' }
export type      Choices = Choice[]
