export interface Asker {
    ask: (question: string, examples: string[], configOverride?: any) => Promise<any>
}
