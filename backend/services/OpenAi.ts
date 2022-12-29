import { Configuration, CreateAnswerRequest, OpenAIApi, CreateAnswerResponse, CreateCompletionResponseChoicesInner, CreateCompletionResponse } from 'openai'
import { Asker } from '../contracts/Asker'

const init = {
    ['configuration']:Configuration,
    basePath: '',
    axios: undefined
}

export class OpenAi implements Asker {

    config: Configuration
    constructor(config: Configuration = openAiCredentials) { this.config = config }

    async ask(question: string, examples?: string[], configOverride?: Configuration): Promise<CreateCompletionResponse> { return await askOpenAi(question, examples, configOverride) }
}

async function askOpenAi(question: string, examples?: string[], config?: Configuration): Promise<CreateCompletionResponse> {
    if (!config) config = openAiCredentials
    const  oai = new OpenAIApi(config, init.basePath, init.axios)
    const  res = await oai.createCompletion(completeQuestion(question, examples))
    return res.data
}

const openAiCredentials = new Configuration({
    organization: process.env.OPEN_AI_ID,
    apiKey:       process.env.OPEN_AI_API_KEY
})

function completeQuestion(q: string, examples: string[] = []) {
    const questionFormat: CreateAnswerRequest = {
        model: 'text-davinci-003',
        max_tokens: 128,
        temperature: 0,     // [0, 1] ≡ [not creative or risky, converse of the former]
        question: `${q}`,
        examples,
        examples_context: ''
    }
    return questionFormat
}

export interface Choice    extends CreateCompletionResponseChoicesInner { text: '\n\nThis is a possible answer', index: 0, logprobs: null, finish_reason: '' }
export type      Choices = Choice[]
